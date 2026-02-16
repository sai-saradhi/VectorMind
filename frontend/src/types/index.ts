export type EnergyType = 'Morning' | 'Afternoon' | 'Night' | 'Flexible';

export interface ProfileInput {
  name: string;
  goal_type: 'Career' | 'Concept';
  target_role_topic: string;
  weekly_hours: number;
  energy_type: EnergyType;
}

export interface ResourceLink {
  label: string;
  url: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  deep_blocks_required: number;
  drill_blocks_required: number;
  completed_deep: number;
  completed_drill: number;
  status: 'locked' | 'unlocked' | 'completed';
  prerequisites: string[];
  resources: ResourceLink[];
}

export interface RoadmapPayload {
  title: string;
  summary: string;
  nodes: RoadmapNode[];
}
