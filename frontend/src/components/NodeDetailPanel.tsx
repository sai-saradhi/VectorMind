import { RoadmapNode, ResourceType } from '../types';

interface Props {
  node: RoadmapNode | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (nodeId: string, deep: number, drill: number) => void;
}

const typeColors: Record<ResourceType, string> = {
  Docs: 'bg-blue-500/15 text-blue-200',
  YouTube: 'bg-rose-500/15 text-rose-200',
  Course: 'bg-emerald-500/15 text-emerald-200',
  Article: 'bg-amber-500/15 text-amber-200',
  Practice: 'bg-violet-500/15 text-violet-200',
};

export function NodeDetailPanel({ node, isOpen, onClose, onUpdate }: Props) {
  return (
    <aside
      className={`fixed right-0 top-0 z-40 h-screen w-full max-w-md border-l border-white/10 bg-slate-950/95 p-5 shadow-2xl backdrop-blur transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-cyan-300">Node Details</h3>
        <button className="rounded-lg border border-white/20 px-2 py-1 text-xs text-slate-300" onClick={onClose}>
          Close
        </button>
      </div>

      {!node ? (
        <p className="text-sm text-slate-400">Select any roadmap node to view its description, learning time, and resources.</p>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-semibold text-white">{node.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{node.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl bg-white/5 p-2">
              <p className="text-slate-400">Difficulty</p>
              <p className="mt-1 font-medium text-slate-100">{node.difficulty}</p>
            </div>
            <div className="rounded-xl bg-white/5 p-2">
              <p className="text-slate-400">Learning Time</p>
              <p className="mt-1 font-medium text-slate-100">~{node.learning_time_hours} hours</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="rounded-xl bg-white/5 p-3">
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

            <div className="rounded-xl bg-white/5 p-3">
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

          <div>
            <h5 className="mb-2 text-sm font-semibold text-cyan-200">Learning Resources</h5>
            <ul className="space-y-2">
              {node.resources.map((resource) => (
                <li key={resource.url} className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-sm text-slate-100">{resource.label}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] ${typeColors[resource.type]}`}>{resource.type}</span>
                  </div>
                  <a href={resource.url} target="_blank" rel="noreferrer" className="text-xs text-cyan-300 hover:underline">
                    {resource.url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </aside>
  );
}
