import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-bold text-cyan-300">VectorMind</h1>
      <p className="mt-4 max-w-xl text-slate-300">
        AI-powered personalized learning roadmaps with adaptive progress and coaching.
      </p>
      <Link to="/profile" className="mt-8 rounded-lg bg-cyan-600 px-6 py-3 font-semibold shadow-glow">
        Build My Roadmap
      </Link>
    </main>
  );
}
