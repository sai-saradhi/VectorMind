from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.db.database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    goal_type = Column(String(40), nullable=False)
    goal = Column(String(255), nullable=False)
    weekly_hours = Column(Integer, nullable=False)
    energy_type = Column(String(40), nullable=False)

    roadmaps = relationship('Roadmap', back_populates='user', cascade='all, delete-orphan')


class Roadmap(Base):
    __tablename__ = 'roadmaps'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False, index=True)
    roadmap_json = Column(Text, nullable=False)

    user = relationship('User', back_populates='roadmaps')
    progress_items = relationship('NodeProgress', back_populates='roadmap', cascade='all, delete-orphan')


class NodeProgress(Base):
    __tablename__ = 'node_progress'

    id = Column(Integer, primary_key=True, index=True)
    roadmap_id = Column(Integer, ForeignKey('roadmaps.id'), nullable=False, index=True)
    node_id = Column(String(120), nullable=False)
    completed_deep = Column(Integer, default=0, nullable=False)
    completed_drill = Column(Integer, default=0, nullable=False)

    roadmap = relationship('Roadmap', back_populates='progress_items')
