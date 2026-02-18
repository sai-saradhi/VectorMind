import { RoadmapNode } from '../types';

interface Props {
  node: RoadmapNode | null;
  onUpdate: (nodeId: string, deep: number, drill: number) => void;
}

export function NodeDetailPanel({ node, onUpdate }: Props) {
  if (!node) {
    return <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-sm text-slate-400">Select a node to inspect details and resources.</div>;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
      <h3 className="text-lg font-semibold text-white">{node.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{node.description}</p>
      <p className="mt-3 text-xs uppercase tracking-wide text-cyan-300">{node.difficulty}</p>

      <div className="mt-4 grid gap-2 text-sm">
        <div className="rounded-xl bg-white/5 p-2">
          <div className="flex items-center justify-between">
            <span>Deep Blocks</span>
            <button
              className="rounded-lg bg-cyan-500 px-2 py-1 text-xs font-medium text-slate-950"
              onClick={() => onUpdate(node.id, Math.min(node.completed_deep + 1, node.deep_blocks_required), node.completed_drill)}
            >
              +1
            </button>
          </div>
          <p className="mt-1 text-slate-300">{node.completed_deep}/{node.deep_blocks_required}</p>
        </div>
        <div className="rounded-xl bg-white/5 p-2">
          <div className="flex items-center justify-between">
            <span>Drill Blocks</span>
            <button
              className="rounded-lg bg-cyan-500 px-2 py-1 text-xs font-medium text-slate-950"
              onClick={() => onUpdate(node.id, node.completed_deep, Math.min(node.completed_drill + 1, node.drill_blocks_required))}
            >
              +1
            </button>
          </div>
          <p className="mt-1 text-slate-300">{node.completed_drill}/{node.drill_blocks_required}</p>
        </div>
      </div>

      <h4 className="mt-4 text-sm font-semibold text-cyan-200">Resources</h4>
      <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-slate-300">
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
