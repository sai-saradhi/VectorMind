import { FormEvent, useState } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  contextHint: string;
}

const coachReplies = [
  'Great start. Focus on one deep block and one drill block today.',
  'Try a 45-minute focused session, then summarize what you learned in 5 bullet points.',
  'If this feels heavy, split the node into two smaller sessions and track them separately.',
  'Use active recall: close the notes and explain the concept in your own words.',
];

export function ChatPanel({ contextHint }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: `Mock AI Coach active. Current hint: ${contextHint}` },
  ]);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(true);

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => {
      const userMessage: ChatMessage = { role: 'user', content: input };
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: coachReplies[(prev.length + input.length) % coachReplies.length],
      };
      return [...prev, userMessage, aiMessage];
    });
    setInput('');
  };

  if (!open) {
    return (
      <button className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200" onClick={() => setOpen(true)}>
        Open Coach
      </button>
    );
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-950/50 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-cyan-300">AI Coach (Mock)</h3>
        <button className="text-xs text-slate-400" onClick={() => setOpen(false)}>Collapse</button>
      </div>
      <div className="mb-3 flex-1 space-y-2 overflow-y-auto rounded-xl bg-white/5 p-3 text-sm">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-cyan-200' : 'text-slate-200'}>{m.content}</div>
        ))}
      </div>
      <form onSubmit={send} className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your coach..."
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-slate-500 focus:border-cyan-400/60"
        />
        <button className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950">Send</button>
      </form>
    </div>
  );
}
