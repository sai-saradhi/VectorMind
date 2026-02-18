export function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-slate-950/50 p-6">
      <h1 className="text-2xl font-semibold">About this build</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">
        This version is intentionally frontend-first and mock-driven so you can polish UX quickly. Roadmaps, resources, descriptions,
        chat coaching, and profile are all mocked for now. Once design is finalized, the UI can reconnect to backend endpoints.
      </p>
      <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-slate-300">
        <li>Modern minimalistic style with deep navy surfaces and cyan accents.</li>
        <li>Roadmap graph spacing logic avoids node overlaps via level-based layout.</li>
        <li>Includes 7 mock roadmaps with 6 nodes each and realistic external resources.</li>
      </ul>
    </main>
  );
}
