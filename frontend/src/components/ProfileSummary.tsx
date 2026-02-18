import { ProfileInput } from '../types';

interface Props {
  profile: ProfileInput;
}

export function ProfileSummary({ profile }: Props) {
  return (
    <aside className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-300">Profile</h2>
      <ul className="space-y-2 text-sm text-slate-300">
        <li><span className="text-slate-500">Name:</span> {profile.name}</li>
        <li><span className="text-slate-500">Goal Type:</span> {profile.goal_type}</li>
        <li><span className="text-slate-500">Target:</span> {profile.target_role_topic}</li>
        <li><span className="text-slate-500">Weekly Hours:</span> {profile.weekly_hours}</li>
        <li><span className="text-slate-500">Energy:</span> {profile.energy_type}</li>
      </ul>
    </aside>
  );
}
