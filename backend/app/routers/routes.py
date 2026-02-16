import json

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.models import NodeProgress, Roadmap, User
from app.schemas.schemas import ChatRequest, NodeUpdate, ProfileInput, RoadmapResponse
from app.services.llm_service import chat_with_context, generate_roadmap

router = APIRouter()


@router.post('/generate-roadmap', response_model=RoadmapResponse)
def create_roadmap(payload: ProfileInput, db: Session = Depends(get_db)):
    user = User(
        name=payload.name,
        goal_type=payload.goal_type,
        goal=payload.goal,
        weekly_hours=payload.weekly_hours,
        energy_type=payload.energy_type,
    )
    db.add(user)
    db.flush()

    roadmap_json = generate_roadmap(
        {
            'name': payload.name,
            'goal_type': payload.goal_type,
            'goal': payload.goal,
            'weekly_hours': payload.weekly_hours,
            'energy_type': payload.energy_type,
        }
    )

    roadmap = Roadmap(user_id=user.id, roadmap_json=json.dumps(roadmap_json))
    db.add(roadmap)
    db.flush()

    for node in roadmap_json.get('nodes', []):
        db.add(
            NodeProgress(
                roadmap_id=roadmap.id,
                node_id=node['id'],
                completed_deep=node.get('completed_deep', 0),
                completed_drill=node.get('completed_drill', 0),
            )
        )

    db.commit()
    return {'user_id': user.id, 'roadmap_id': roadmap.id, 'roadmap': roadmap_json}


@router.get('/roadmap/{user_id}', response_model=RoadmapResponse)
def get_roadmap(user_id: int, db: Session = Depends(get_db)):
    roadmap = db.query(Roadmap).filter(Roadmap.user_id == user_id).order_by(Roadmap.id.desc()).first()
    if not roadmap:
        raise HTTPException(status_code=404, detail='Roadmap not found')

    roadmap_json = json.loads(roadmap.roadmap_json)
    progress_map = {
        p.node_id: p
        for p in db.query(NodeProgress).filter(NodeProgress.roadmap_id == roadmap.id).all()
    }

    for node in roadmap_json.get('nodes', []):
        progress = progress_map.get(node['id'])
        if progress:
            node['completed_deep'] = progress.completed_deep
            node['completed_drill'] = progress.completed_drill

            deep_ok = progress.completed_deep >= node.get('deep_blocks_required', 0)
            drill_ok = progress.completed_drill >= node.get('drill_blocks_required', 0)
            node['status'] = 'completed' if deep_ok and drill_ok else node.get('status', 'locked')

    _unlock_nodes(roadmap_json)
    return {'user_id': user_id, 'roadmap_id': roadmap.id, 'roadmap': roadmap_json}


@router.post('/update-progress')
def update_progress(payload: NodeUpdate, db: Session = Depends(get_db)):
    progress = (
        db.query(NodeProgress)
        .filter(
            NodeProgress.roadmap_id == payload.roadmap_id,
            NodeProgress.node_id == payload.node_id,
        )
        .first()
    )
    if not progress:
        raise HTTPException(status_code=404, detail='Progress record not found')

    progress.completed_deep = payload.completed_deep
    progress.completed_drill = payload.completed_drill
    db.commit()
    return {'status': 'ok'}


@router.post('/chat')
def chat(payload: ChatRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == payload.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail='User not found')

    roadmap = db.query(Roadmap).filter(Roadmap.user_id == payload.user_id).order_by(Roadmap.id.desc()).first()
    context = payload.context or {}
    context['profile'] = {
        'name': user.name,
        'goal': user.goal,
        'goal_type': user.goal_type,
        'weekly_hours': user.weekly_hours,
        'energy_type': user.energy_type,
    }
    if roadmap:
        context['roadmap'] = json.loads(roadmap.roadmap_json)

    response = chat_with_context(payload.message, context)
    return {'response': response}


def _unlock_nodes(roadmap: dict):
    # Unlock nodes whose prerequisites are all completed.
    completed_ids = {n['id'] for n in roadmap.get('nodes', []) if n.get('status') == 'completed'}
    for node in roadmap.get('nodes', []):
        prereqs = node.get('prerequisites', [])
        if node.get('status') == 'completed':
            continue
        if all(prereq in completed_ids for prereq in prereqs):
            node['status'] = 'unlocked'
        else:
            node['status'] = 'locked'
