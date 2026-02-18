import { Link } from 'react-router-dom';
import { mockRoadmaps } from '../data/mockRoadmaps';

export function RoadmapsPage() {
  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Mock Roadmap Library</h1>
        <p className="mt-1 text-sm text-slate-400">7 clean mock roadmaps for design and UX iteration.</p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockRoadmaps.map((item) => (
          <article key={item.id} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${item.color} p-5`}>
            <p className="text-xs uppercase tracking-wide text-slate-300">{item.category}</p>
            <h2 className="mt-2 text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-200">{item.tagline}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
              <span>{item.durationWeeks} weeks</span>
              <span>•</span>
              <span>{item.level}</span>
              <span>•</span>
              <span>{item.roadmap.nodes.length} nodes</span>
            </div>
            <Link to={`/roadmap/${item.id}`} className="mt-5 inline-flex rounded-xl bg-white/90 px-4 py-2 text-sm font-medium text-slate-900">
              Open Roadmap
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
