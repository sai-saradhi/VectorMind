import { ProfileInput } from '../types';

interface Props {
  profile: ProfileInput;
}

export function ProfileSummary({ profile }: Props) {
  return (
    <aside className="rounded-xl bg-slate-900/80 p-4 shadow-glow">
      <h2 className="mb-2 text-lg font-semibold text-cyan-300">Profile</h2>
      <ul className="space-y-2 text-sm text-slate-300">
        <li><strong>Name:</strong> {profile.name}</li>
        <li><strong>Goal Type:</strong> {profile.goal_type}</li>
        <li><strong>Target:</strong> {profile.target_role_topic}</li>
        <li><strong>Weekly Hours:</strong> {profile.weekly_hours}</li>
        <li><strong>Energy:</strong> {profile.energy_type}</li>
      </ul>
    </aside>
  );
}
