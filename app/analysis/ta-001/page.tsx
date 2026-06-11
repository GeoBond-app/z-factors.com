import Link from 'next/link';

export const metadata = {
  title: 'California Insurance Crisis: The Collapse of the Safety Net | Z-Factors',
  description: 'Major insurers are exiting California, leaving homeowners without affordable options.',
};

export default function TA001() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-12 space-y-10">

      <header className="border-b border-neutral-200 pb-8">
        <Link href="/" className="text-xs font-mono text-neutral-400 hover:text-neutral-700">
          Back Home
        </Link>
        <div className="flex items-center gap-3 mt-6 mb-3">
          <span className="text-xs font-mono text-neutral-400">TA-001 · June 5, 2026</span>
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded" style={{background:"#E1F5EE",color:"#085041"}}>Signal 9/10</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{background:"#E1F5EE",color:"#085041"}}>Big City</span>
        </div>
        <h1 className="text-4xl font-serif font-normal mt-2 leading-tight">
          California Insurance Crisis: The Collapse of the Safety Net
        </h1>
        <p className="text-xl text-neutral-600 mt-4 leading-relaxed">
          Major insurers are exiting California. For millions of homeowners, the safety net is disappearing.
        </p>
      </header>

      <section className="space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:"#1D9E75"}}></div>
          <div>
            <div className="text-sm font-semibold">The real story.</div>
            <div className="text-xs text-neutral-400 italic">What really happened.</div>
          </div>
        </div>
        <div className="space-y-4 text-neutral-800 leading-relaxed">
          <p>State Farm, Allstate, and several other major insurance carriers have announced they will no longer issue new homeowner policies in California. The stated reason is wildfire risk and the inability to price policies profitably under California&apos;s rate regulations. The result is a shrinking market where remaining options are either unaffordable or inadequate.</p>
          <p>California&apos;s FAIR Plan — the insurer of last resort — has seen enrollment surge by over 60% in two years. It was designed for high-risk properties that cannot get private coverage. It was never designed to be the primary insurer for entire neighborhoods.</p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:"#7F77DD"}}></div>
          <div>
            <div className="text-sm font-semibold">The real feeling.</div>
            <div className="text-xs text-neutral-400 italic">How it really lands on people.</div>
          </div>
        </div>
        <div className="space-y-4 text-neutral-800 leading-relaxed">
          <p>Homeowners in fire-adjacent communities are facing annual premium increases of 30 to 50 percent — when they can find coverage at all. For many, particularly older residents on fixed incomes, the choice is between insurance and other necessities. Some are going uninsured entirely, one wildfire away from financial ruin.</p>
          <p>The burden falls unevenly. Wealthier homeowners can absorb higher premiums or self-insure. Working families and retirees cannot. Communities that were already economically stressed are now facing an additional structural pressure that compounds every other challenge.</p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:"#BA7517"}}></div>
          <div>
            <div className="text-sm font-semibold">The real response.</div>
            <div className="text-xs text-neutral-400 italic">What we can do together.</div>
          </div>
        </div>
        <div className="border-l-4 pl-5 py-2" style={{borderColor:"#BA7517"}}>
          <p className="text-base leading-relaxed text-neutral-700 italic font-serif">
            The insurance crisis is not only about wildfire risk. It exposes the gap between individual responsibility and institutional risk models. When private markets exit, the public absorbs the cost — but the public infrastructure was never built for this load. The real question is not why insurers are leaving. It is who was supposed to catch people when they did.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 rounded-lg p-5 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Signal Score</span>
          <span className="text-sm font-bold" style={{color:"#1D9E75"}}>9/10</span>
        </div>
        <p className="text-sm text-neutral-600">High community intelligence value. Affects housing stability, economic security, and long-term community resilience across California.</p>
      </section>

      <footer className="border-t pt-6 flex justify-between text-sm text-neutral-500">
        <span className="font-mono text-xs">TA-001 · Z-Factors · Track A</span>
        <Link href="/archive" className="hover:text-neutral-700 text-xs">View Archive</Link>
      </footer>

    </main>
  );
}
