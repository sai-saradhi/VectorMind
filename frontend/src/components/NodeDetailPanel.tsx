import { RoadmapNode } from '../types';

interface Props {
  node: RoadmapNode | null;
  onUpdate: (nodeId: string, deep: number, drill: number) => void;
}

export function NodeDetailPanel({ node, onUpdate }: Props) {
  if (!node) {
    return <div className="rounded-xl bg-slate-900/70 p-4 text-sm text-slate-400">Select a node to inspect details.</div>;
  }

  return (
    <div className="rounded-xl bg-slate-900/70 p-4 shadow-glow">
      <h3 className="text-lg font-semibold text-cyan-300">{node.title}</h3>
      <p className="mt-2 text-sm text-slate-300">{node.description}</p>
      <p className="mt-2 text-xs text-slate-400">Difficulty: {node.difficulty}</p>

      <div className="mt-3 space-y-2 text-sm">
        <div>
          Deep Blocks: {node.completed_deep}/{node.deep_blocks_required}
          <button
            className="ml-2 rounded bg-cyan-600 px-2 py-1 text-xs"
            onClick={() => onUpdate(node.id, Math.min(node.completed_deep + 1, node.deep_blocks_required), node.completed_drill)}
          >
            +1
          </button>
        </div>
        <div>
          Drill Blocks: {node.completed_drill}/{node.drill_blocks_required}
          <button
            className="ml-2 rounded bg-cyan-600 px-2 py-1 text-xs"
            onClick={() => onUpdate(node.id, node.completed_deep, Math.min(node.completed_drill + 1, node.drill_blocks_required))}
          >
            +1
          </button>
        </div>
      </div>

      <h4 className="mt-4 text-sm font-semibold text-cyan-200">Resources</h4>
      <ul className="mt-1 list-inside list-disc text-sm text-slate-300">
        {node.resources.map((r) => (
          <li key={r.url}>
            <a href={r.url} className="text-cyan-300 hover:underline" target="_blank" rel="noreferrer">
              {r.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
