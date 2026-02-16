import ReactFlow, { Background, Controls, Edge, Node } from 'react-flow-renderer';
import { RoadmapNode } from '../types';

interface Props {
  nodesData: RoadmapNode[];
  onNodeSelect: (node: RoadmapNode) => void;
}

export function RoadmapFlow({ nodesData, onNodeSelect }: Props) {
  const nodes: Node[] = nodesData.map((node, index) => ({
    id: node.id,
    position: { x: 120 + (index % 2) * 260, y: 60 + index * 120 },
    data: { label: `${node.title} (${node.status})` },
    style: {
      borderRadius: 8,
      border: node.status === 'completed' ? '1px solid #22d3ee' : '1px solid #334155',
      padding: 8,
      background: '#0f172a',
      color: '#e2e8f0',
      width: 220,
      cursor: 'pointer',
      opacity: node.status === 'locked' ? 0.65 : 1,
    },
  }));

  const edges: Edge[] = nodesData.flatMap((node) =>
    node.prerequisites.map((prereq) => ({
      id: `${prereq}-${node.id}`,
      source: prereq,
      target: node.id,
      animated: true,
      style: { stroke: '#22d3ee' },
    }))
  );

  return (
    <div className="h-[70vh] rounded-xl bg-slate-900/80 shadow-glow">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={(_, node) => {
          const found = nodesData.find((n) => n.id === node.id);
          if (found) onNodeSelect(found);
        }}
        fitView
      >
        <Background color="#334155" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
