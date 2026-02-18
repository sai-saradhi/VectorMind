import ReactFlow, { Background, Controls, Edge, Node } from 'react-flow-renderer';
import { RoadmapNode } from '../types';

interface Props {
  nodesData: RoadmapNode[];
  onNodeSelect: (node: RoadmapNode) => void;
}

const statusStyles: Record<RoadmapNode['status'], { border: string; bg: string; opacity: number }> = {
  completed: { border: '#22d3ee', bg: '#0b1b2d', opacity: 1 },
  unlocked: { border: '#38bdf8', bg: '#0f172a', opacity: 1 },
  locked: { border: '#334155', bg: '#0f172a', opacity: 0.58 },
};

function computeLevel(nodeId: string, allNodes: RoadmapNode[], memo: Record<string, number>): number {
  if (memo[nodeId] !== undefined) return memo[nodeId];
  const node = allNodes.find((n) => n.id === nodeId);
  if (!node || node.prerequisites.length === 0) {
    memo[nodeId] = 0;
    return 0;
  }
  const level = Math.max(...node.prerequisites.map((p) => computeLevel(p, allNodes, memo))) + 1;
  memo[nodeId] = level;
  return level;
}

export function RoadmapFlow({ nodesData, onNodeSelect }: Props) {
  const levelMemo: Record<string, number> = {};
  nodesData.forEach((n) => computeLevel(n.id, nodesData, levelMemo));

  const groupedByLevel = Object.entries(
    nodesData.reduce<Record<number, RoadmapNode[]>>((acc, node) => {
      const level = levelMemo[node.id] ?? 0;
      acc[level] = acc[level] ? [...acc[level], node] : [node];
      return acc;
    }, {})
  ).sort(([a], [b]) => Number(a) - Number(b));

  const verticalGap = 190;
  const horizontalGap = 350;
  const nodeWidth = 280;

  const nodes: Node[] = groupedByLevel.flatMap(([level, levelNodes]) => {
    const totalHeight = (levelNodes.length - 1) * verticalGap;

    return levelNodes.map((node, row) => ({
      id: node.id,
      position: {
        x: Number(level) * horizontalGap + 80,
        y: 120 + row * verticalGap - totalHeight / 2,
      },
      data: {
        label: (
          <div>
            <p className="text-sm font-semibold">{node.title}</p>
            <p className="mt-1 text-xs text-slate-300">{node.difficulty} · {node.status}</p>
            <p className="mt-1 text-xs text-slate-400">{node.learning_time_hours}h estimated</p>
          </div>
        ),
      },
      style: {
        borderRadius: 14,
        border: `1px solid ${statusStyles[node.status].border}`,
        background: statusStyles[node.status].bg,
        width: nodeWidth,
        padding: 12,
        color: '#e2e8f0',
        boxShadow: '0 10px 30px rgba(2, 6, 23, 0.35)',
        opacity: statusStyles[node.status].opacity,
      },
    }));
  });

  const edges: Edge[] = nodesData.flatMap((node) =>
    node.prerequisites.map((prereq) => ({
      id: `${prereq}-${node.id}`,
      source: prereq,
      target: node.id,
      animated: node.status !== 'completed',
      style: { stroke: '#38bdf8', strokeWidth: 1.5 },
      type: 'smoothstep',
    }))
  );

  return (
    <div className="h-[72vh] overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{ padding: 0.25 }}
        minZoom={0.4}
        maxZoom={1.3}
        onNodeClick={(_, node) => {
          const found = nodesData.find((n) => n.id === node.id);
          if (found) onNodeSelect(found);
        }}
      >
        <Background color="#1e293b" gap={18} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
