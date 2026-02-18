import { useMemo, useState } from 'react';
import { mockProfile } from '../data/mockRoadmaps';
import { ProfileInput } from '../types';

export function ProfilePage() {
  const [form, setForm] = useState<ProfileInput>(mockProfile);

  const completion = useMemo(() => {
    const fields = [form.name, form.goal_type, form.target_role_topic, String(form.weekly_hours), form.energy_type];
    return Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }, [form]);

  return (
    <main className="mx-auto max-w-3xl space-y-5">
      <div>
        <h1 className="text-3xl font-semibold">Your Learning Profile</h1>
        <p className="mt-1 text-sm text-slate-400">Frontend-only mock mode enabled. You can iterate here without backend calls.</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-5">
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="text-slate-400">Profile completeness</span>
          <span className="font-medium text-cyan-300">{completion}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10">
          <div className="h-2 rounded-full bg-cyan-400" style={{ width: `${completion}%` }} />
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <input className="rounded-xl border border-white/10 bg-white/5 p-3" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
          <input className="rounded-xl border border-white/10 bg-white/5 p-3" value={form.target_role_topic} onChange={(e) => setForm({ ...form, target_role_topic: e.target.value })} placeholder="Target role / topic" />
          <select className="rounded-xl border border-white/10 bg-white/5 p-3" value={form.goal_type} onChange={(e) => setForm({ ...form, goal_type: e.target.value as ProfileInput['goal_type'] })}>
            <option>Career</option>
            <option>Concept</option>
          </select>
          <input type="number" min={1} className="rounded-xl border border-white/10 bg-white/5 p-3" value={form.weekly_hours} onChange={(e) => setForm({ ...form, weekly_hours: Number(e.target.value) })} />
          <select className="rounded-xl border border-white/10 bg-white/5 p-3 md:col-span-2" value={form.energy_type} onChange={(e) => setForm({ ...form, energy_type: e.target.value as ProfileInput['energy_type'] })}>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Night</option>
            <option>Flexible</option>
          </select>
        </div>
      </div>
    </main>
  );
}
