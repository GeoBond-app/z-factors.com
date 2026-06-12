import Link from 'next/link';

export const metadata = {
  title: 'Iran and Israel Exchange Direct Strikes, Regional War Fears Mount | Z-Factors',
  description: 'Amidst missile fire and retaliatory actions, the Middle East teeters on the brink, affecting millions.',
};

export default function TANaN() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-12 space-y-10">

      <header className="border-b border-neutral-200 pb-8">
        <Link href="/" className="text-xs font-mono text-neutral-400 hover:text-neutral-700">
          ← Back Home
        </Link>
        <div className="flex items-center gap-3 mt-6 mb-3">
          <span className="text-xs font-mono text-neutral-400">TA-NaN · 2026-06-12</span>
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded" style={{background:'#E1F5EE',color:'#085041'}}>Signal 7/10</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{background:'#E1F5EE',color:'#085041'}}>Big City</span>
        </div>
        <h1 className="text-4xl font-serif font-normal mt-2 leading-tight">
          Iran and Israel Exchange Direct Strikes, Regional War Fears Mount
        </h1>
        <p className="text-xl text-neutral-600 mt-4 leading-relaxed">
          Amidst missile fire and retaliatory actions, the Middle East teeters on the brink, affecting millions.
        </p>
        <div className="text-xs text-neutral-400 mt-3">
          Source: <a href="https://www.bbc.com" target="_blank" rel="noopener noreferrer" className="underline">BBC / Reuters composite</a>
        </div>
      </header>

      <section className="space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:'#1D9E75'}}></div>
          <div>
            <div className="text-sm font-semibold">The real story.</div>
            <div className="text-xs text-neutral-400 italic">What really happened.</div>
          </div>
        </div>
        <div className="space-y-4 text-neutral-800 leading-relaxed">
          <p>In a significant escalation, Iran directly launched ballistic missiles at Israel. This action came in retaliation for an Israeli strike on Hezbollah command centers in Beirut, which tragically resulted in two deaths and eleven injuries. The direct exchange marks a worrying departure from the region&apos;s long-standing proxy conflicts, raising the explicit specter of a broader regional war. While Israeli defense systems reportedly intercepted all inbound Iranian missiles, with no direct damage or casualties confirmed in Israel, the event has shattered previous boundaries of engagement.</p>
          <p>For the civilians caught in this escalating conflict, the reality is one of pervasive fear and disruption. Residents of Beiruts southern suburbs face immediate threats of casualties, infrastructure damage, and displacement, while citizens in northern and central Israel endure missile alerts, school closures, and profound psychological stress. Daily life is upended, communities are fragmented, and the search for safe havens becomes a desperate, often futile, endeavor. The emotional toll is immense, with constant anxiety breeding trauma, exacerbating societal divisions, and leaving many feeling utterly vulnerable and dehumanized amidst the geopolitical maneuvering.</p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:'#7F77DD'}}></div>
          <div>
            <div className="text-sm font-semibold">The real feeling.</div>
            <div className="text-xs text-neutral-400 italic">How it really lands on people.</div>
          </div>
        </div>
        <div className="space-y-4 text-neutral-800 leading-relaxed">
          <p>The ripple effects of this conflict extend far beyond the direct combatants. Communities in both Israel and Lebanon are gripped by fear of imminent, full-scale war, leading to increased social fragmentation and polarization as individuals and groups seek protection and solace. Misinformation spreads rapidly, fueling panic and distrust. Even geographically distant diasporas are deeply affected, with heightened anxiety for loved ones, increased political activism, and potential for amplified tensions or, conversely, solidarity within local groups. Economically, the region faces infrastructure destruction, loss of investor confidence, and the potential for severe disruptions in global supply chains and energy costs, impacting everyone.</p>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex items-center gap-3 pb-2 border-b border-neutral-100">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{background:'#BA7517'}}></div>
          <div>
            <div className="text-sm font-semibold">The real response.</div>
            <div className="text-xs text-neutral-400 italic">What we can do together.</div>
          </div>
        </div>
        <div className="space-y-4 text-neutral-800 leading-relaxed">
          <p>The counter-intuitive truth often overlooked in the media&apos;s immediate focus on war preparation is that these direct, yet seemingly contained, military exchanges between Iran and Israel might paradoxically be viewed by both sides as a strategic way to *manage* escalation, rather than trigger an all-out war. Each action serves as a limited, symbolic show of force  a calculated move designed to re-establish deterrence and maintain credibility without crossing a threshold that neither truly desires. Its a dangerous tightrope walk, where miscalculation or external pressures could still push the region into an uncontrolled spiral, but for now, it operates within a high-stakes, violent form of constrained communication.</p>
        </div>
        <div className="border-l-4 pl-5 py-2" style={{borderColor:'#BA7517'}}>
          <p className="text-base leading-relaxed text-neutral-700 italic font-serif">
            The direct exchange of missile fire between Iran and Israel, while terrifying, may represent a dangerous, calculated strategy by both sides to manage escalation and re-establish deterrence, rather than an immediate prelude to full-scale war.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 rounded-lg p-5 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Signal Score</span>
          <span className="text-sm font-bold" style={{color:'#1D9E75'}}>7/10</span>
        </div>
        <p className="text-sm text-neutral-600">Seek diverse, credible news sources to understand the complexities of the situation, support humanitarian aid organizations in affected regions, and advocate for diplomatic solutions to de-escalate tensions.</p>
        <p className="text-xs text-neutral-400 pt-1">Key entities: Iran, Israel, Hezbollah, Beirut, United States</p>
      </section>

      <footer className="border-t pt-6 flex justify-between text-sm text-neutral-500">
        <span className="font-mono text-xs">TA-NaN · Z-Factors · Track A</span>
        <Link href="/archive" className="hover:text-neutral-700 text-xs">
          View Archive →
        </Link>
      </footer>

    </main>
  );
}
