import Link from 'next/link';

export default function ArchivePage() {
  return (
    <main className="space-y-10">
      <header className="border-b border-neutral-200 pb-6">
        <Link href="/" className="text-xs font-mono text-neutral-400 hover:text-neutral-700">
          ← Back Home
        </Link>
        <h1 className="text-4xl font-serif mt-6">Archive</h1>
        <p className="text-neutral-600 mt-2">Reverse-chronological index of Z-Factors analysis.</p>
      </header>

      <section className="space-y-4">
        <Link href="/analysis/TA-001" className="block border-b border-neutral-200 pb-4 hover:text-neutral-600">
          <div className="text-xs font-mono text-neutral-500">TA-001 • June 5, 2026 • Confidence: 92%</div>
          <h2 className="text-2xl font-serif mt-2">California Insurance Crisis: The Collapse of the Safety Net</h2>
        </Link>
      </section>
    </main>
  );
}
