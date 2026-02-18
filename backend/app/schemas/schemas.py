from typing import Any, Literal

from pydantic import BaseModel, Field


class ProfileInput(BaseModel):
    name: str
    goal_type: Literal['Career', 'Concept']
    goal: str = Field(alias='target_role_topic')
    weekly_hours: int
    energy_type: Literal['Morning', 'Afternoon', 'Night', 'Flexible']


class NodeUpdate(BaseModel):
    roadmap_id: int
    node_id: str
    completed_deep: int
    completed_drill: int


class ChatRequest(BaseModel):
    user_id: int
    message: str
    context: dict[str, Any] | None = None


class RoadmapResponse(BaseModel):
    user_id: int
    roadmap_id: int
    roadmap: dict[str, Any]
