import { Link, NavLink } from 'react-router-dom';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm transition ${isActive ? 'bg-white/15 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`;

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070b16] via-[#0a1224] to-[#0d162b] text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-xl font-semibold tracking-tight text-cyan-300">VectorMind</Link>
          <nav className="flex items-center gap-2">
            <NavLink to="/roadmaps" className={navClass}>Roadmaps</NavLink>
            <NavLink to="/profile" className={navClass}>Profile</NavLink>
            <NavLink to="/about" className={navClass}>About</NavLink>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
    </div>
  );
}
