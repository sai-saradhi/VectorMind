import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { ProfileInput } from '../types';

export function ProfilePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<ProfileInput>({
    name: '',
    goal_type: 'Career',
    target_role_topic: '',
    weekly_hours: 8,
    energy_type: 'Flexible',
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await api.post('/generate-roadmap', form);
    navigate('/roadmap', { state: { profile: form, ...res.data } });
  };

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold text-cyan-300">Create Your Learning Profile</h1>
      <form onSubmit={submit} className="space-y-4 rounded-xl bg-slate-900/80 p-6 shadow-glow">
        <input className="w-full rounded bg-slate-800 p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <select className="w-full rounded bg-slate-800 p-2" value={form.goal_type} onChange={(e) => setForm({ ...form, goal_type: e.target.value as ProfileInput['goal_type'] })}>
          <option>Career</option><option>Concept</option>
        </select>
        <input className="w-full rounded bg-slate-800 p-2" placeholder="Target role/topic" value={form.target_role_topic} onChange={(e) => setForm({ ...form, target_role_topic: e.target.value })} required />
        <input type="number" className="w-full rounded bg-slate-800 p-2" min={1} value={form.weekly_hours} onChange={(e) => setForm({ ...form, weekly_hours: Number(e.target.value) })} />
        <select className="w-full rounded bg-slate-800 p-2" value={form.energy_type} onChange={(e) => setForm({ ...form, energy_type: e.target.value as ProfileInput['energy_type'] })}>
          <option>Morning</option><option>Afternoon</option><option>Night</option><option>Flexible</option>
        </select>
        <button className="w-full rounded bg-cyan-600 p-2 font-semibold">Generate Roadmap</button>
      </form>
    </main>
  );
}
