import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChatPanel } from '../components/ChatPanel';
import { NodeDetailPanel } from '../components/NodeDetailPanel';
import { ProfileSummary } from '../components/ProfileSummary';
import { RoadmapFlow } from '../components/RoadmapFlow';
import { mockProfile, mockRoadmaps } from '../data/mockRoadmaps';
import { RoadmapNode } from '../types';

export function RoadmapPage() {
  const { roadmapId } = useParams();
  const selectedMap = mockRoadmaps.find((r) => r.id === roadmapId) ?? mockRoadmaps[0];

  const [nodes, setNodes] = useState<RoadmapNode[]>(selectedMap.roadmap.nodes);
  const [selected, setSelected] = useState<RoadmapNode | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const adaptiveHint = useMemo(() => {
    const total = nodes.reduce((acc, n) => acc + n.completed_deep + n.completed_drill, 0);
    return total < 4 ? 'Pace is intentionally light. Keep sessions short and frequent.' : 'Momentum looks strong. Increase challenge in the next node.';
  }, [nodes]);

  const handleUpdate = (nodeId: string, deep: number, drill: number) => {
    setNodes((prev) => {
      const next: RoadmapNode[] = prev.map((n) => {
        if (n.id !== nodeId) return n;
        const deepDone = deep >= n.deep_blocks_required;
        const drillDone = drill >= n.drill_blocks_required;
        const nextStatus: RoadmapNode['status'] = deepDone && drillDone ? 'completed' : 'unlocked';
        return { ...n, completed_deep: deep, completed_drill: drill, status: nextStatus };
      });

      const completed = new Set(next.filter((n) => n.status === 'completed').map((n) => n.id));
      const unlockedNext: RoadmapNode[] = next.map((n) => {
        if (n.status === 'completed') return n;
        const shouldUnlock = n.prerequisites.every((p) => completed.has(p));
        const status: RoadmapNode['status'] = shouldUnlock ? 'unlocked' : 'locked';
        return { ...n, status };
      });

      setSelected(unlockedNext.find((n) => n.id === nodeId) ?? null);
      return unlockedNext;
    });
  };

  const handleSelectNode = (node: RoadmapNode) => {
    setSelected(node);
    setIsPanelOpen(true);
  };

  return (
    <main className="grid min-h-[80vh] grid-cols-12 gap-4">
      <section className="col-span-12 space-y-3 xl:col-span-2">
        <ProfileSummary profile={mockProfile} />
        <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3 text-xs text-slate-300">{adaptiveHint}</div>
      </section>

      <section className="col-span-12 space-y-4 xl:col-span-7">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">{selectedMap.roadmap.title}</h1>
            <p className="mt-1 text-sm text-slate-400">{selectedMap.roadmap.summary}</p>
          </div>
          <button
            className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-slate-300"
            onClick={() => setIsPanelOpen(true)}
          >
            {selected ? 'Open selected node' : 'Open side panel'}
          </button>
        </div>

        <RoadmapFlow nodesData={nodes} onNodeSelect={handleSelectNode} />
      </section>

      <section className="col-span-12 xl:col-span-3">
        <ChatPanel contextHint={adaptiveHint} />
      </section>

      <NodeDetailPanel node={selected} isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} onUpdate={handleUpdate} />
    </main>
  );
}
