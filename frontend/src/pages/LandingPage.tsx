import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <main className="grid min-h-[78vh] place-items-center">
      <section className="w-full rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-10 text-center shadow-2xl shadow-black/30">
        <p className="mb-3 inline-flex rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-wide text-cyan-200">
          Personalized Learning OS
        </p>
        <h1 className="text-5xl font-semibold tracking-tight text-white">VectorMind</h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          A clean and focused dashboard to plan learning paths, track progress blocks, and iterate with an AI-style coach.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/roadmaps" className="rounded-xl bg-cyan-400 px-5 py-3 font-medium text-slate-950">Explore Mock Roadmaps</Link>
          <Link to="/profile" className="rounded-xl border border-white/20 px-5 py-3 font-medium text-slate-100">Edit Profile</Link>
        </div>
      </section>
    </main>
  );
}
