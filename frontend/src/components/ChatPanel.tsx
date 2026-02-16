import { FormEvent, useState } from 'react';
import { api } from '../api/client';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  userId: number;
  context: Record<string, unknown>;
}

export function ChatPanel({ userId, context }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(true);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const next = [...messages, { role: 'user' as const, content: input }];
    setMessages(next);
    const current = input;
    setInput('');

    const res = await api.post('/chat', { user_id: userId, message: current, context });
    setMessages((prev) => [...prev, { role: 'assistant', content: res.data.response }]);
  };

  if (!open) {
    return (
      <button className="rounded bg-cyan-700 px-3 py-2 text-sm" onClick={() => setOpen(true)}>
        Open Chat
      </button>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-xl bg-slate-900/80 p-3 shadow-glow">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-cyan-300">AI Coach</h3>
        <button className="text-xs text-slate-400" onClick={() => setOpen(false)}>Collapse</button>
      </div>
      <div className="mb-2 flex-1 space-y-2 overflow-y-auto rounded bg-slate-950/50 p-2 text-sm">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-cyan-200' : 'text-slate-200'}>{m.content}</div>
        ))}
      </div>
      <form onSubmit={send} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for guidance..."
          className="flex-1 rounded bg-slate-800 px-2 py-1 text-sm"
        />
        <button className="rounded bg-cyan-600 px-3 py-1 text-sm">Send</button>
      </form>
    </div>
  );
}
