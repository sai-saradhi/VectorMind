import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '../api/client';
import { ChatPanel } from '../components/ChatPanel';
import { NodeDetailPanel } from '../components/NodeDetailPanel';
import { ProfileSummary } from '../components/ProfileSummary';
import { RoadmapFlow } from '../components/RoadmapFlow';
import { ProfileInput, RoadmapNode, RoadmapPayload } from '../types';

interface LocationState {
  profile: ProfileInput;
  user_id: number;
  roadmap_id: number;
  roadmap: RoadmapPayload;
}

export function RoadmapPage() {
  const { state } = useLocation();
  const data = state as LocationState;
  const [nodes, setNodes] = useState<RoadmapNode[]>(data?.roadmap?.nodes ?? []);
  const [selected, setSelected] = useState<RoadmapNode | null>(null);

  const adaptiveHint = useMemo(() => {
    // Placeholder adaptive check: when very low progress, suggest slower pace.
    const total = nodes.reduce((acc, n) => acc + n.completed_deep + n.completed_drill, 0);
    return total < 2 ? 'Progress is early—start with smaller 30-45 min sessions.' : 'Good momentum. Keep building consistency.';
  }, [nodes]);

  if (!data) return <main className="p-8">Missing roadmap state.</main>;

  const handleUpdate = async (nodeId: string, deep: number, drill: number) => {
    await api.post('/update-progress', {
      roadmap_id: data.roadmap_id,
      node_id: nodeId,
      completed_deep: deep,
      completed_drill: drill,
    });

    const refreshed = await api.get(`/roadmap/${data.user_id}`);
    setNodes(refreshed.data.roadmap.nodes);
    const updatedNode = refreshed.data.roadmap.nodes.find((n: RoadmapNode) => n.id === nodeId) ?? null;
    setSelected(updatedNode);
  };

  return (
    <main className="grid min-h-screen grid-cols-12 gap-4 p-4">
      <section className="col-span-2 space-y-4">
        <ProfileSummary profile={data.profile} />
        <div className="rounded-xl bg-slate-900/70 p-3 text-xs text-slate-300">{adaptiveHint}</div>
      </section>
      <section className="col-span-7 space-y-4">
        <RoadmapFlow nodesData={nodes} onNodeSelect={setSelected} />
        <NodeDetailPanel node={selected} onUpdate={handleUpdate} />
      </section>
      <section className="col-span-3">
        <ChatPanel userId={data.user_id} context={{ roadmap: { nodes } }} />
      </section>
    </main>
  );
}
