import Link from 'next/link';

export const metadata = {
  title: 'War on the Brink: Iran and Israel Exchange Direct Blows, Shattering Fragile Peace | Z-Factors',
  description: 'Missile attacks and retaliatory strikes ignite fears of a larger regional conflict, but a deeper inspection reveals a precarious dance of deterrence.',
};

export default function TA012() {
  return (
    <main className="max-w-3xl mx-auto px-8 py-12 space-y-10">

      <header className="border-b border-neutral-200 pb-8">
        <Link href="/" className="text-xs font-mono text-neutral-400 hover:text-neutral-700">
          ← Back Home
        </Link>
        <div className="flex items-center gap-3 mt-6 mb-3">
          <span className="text-xs font-mono text-neutral-400">TA-012 · 2026-06-12</span>
          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded" style={{background:'#E1F5EE',color:'#085041'}}>Signal 7/10</span>
          <span className="text-xs font-mono px-2 py-0.5 rounded" style={{background:'#E1F5EE',color:'#085041'}}>Big City</span>
        </div>
        <h1 className="text-4xl font-serif font-normal mt-2 leading-tight">
          War on the Brink: Iran and Israel Exchange Direct Blows, Shattering Fragile Peace
        </h1>
        <p className="text-xl text-neutral-600 mt-4 leading-relaxed">
          Missile attacks and retaliatory strikes ignite fears of a larger regional conflict, but a deeper inspection reveals a precarious dance of deterrence.
        </p>
        <div className="text-xs text-neutral-400 mt-3">
          Source: <a href="https://www.youtube.com/watch?v=thOp7BerrM4" target="_blank" rel="noopener noreferrer" className="underline">Global News</a>
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
          <p>A direct and unprecedented military exchange has rocked the Middle East, with Iran launching missile attacks on Israel in response to Israeli airstrikes in Beirut. This was swiftly followed by devastating Israeli retaliatory strikes deep within Iran, targeting major cities including Tehran, Tabriz, and Isfahan. The tit-for-tat attacks have obliterated any semblance of a fragile truce, plunging the region into heightened alert and sparking urgent global calls for de-escalation amidst fears of a full-blown war.</p>
          <p>For the millions living across the Middle East, this isn&apos;t just a headline  it&apos;s a terrifying, life-altering reality. Lebanese civilians, already reeling, face renewed casualties and displacement. Israelis brace for constant missile threats, enduring psychological stress and the disruption of daily life. Now, Iranians are experiencing the direct impact of conflict in their own cities. Beyond the direct combat zones, the wider region grapples with airspace closures, disrupted travel, and a suffocating cloud of uncertainty. The emotional toll is global, with rampant fear, anxiety, and trauma permeating communities as the specter of widespread conflict looms large.</p>
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
          <p>The ripple effects of this escalation extend far beyond the immediate conflict zone. International bodies and nations are scrambling to mediate, while global citizens are witnessing significant disruptions to energy markets and supply chains, potentially leading to increased costs for everyday goods. Diaspora communities living far from the Middle East, such as those in the Bay Area, are experiencing profound emotional distress, leading to local vigils, heightened security concerns for cultural centers, and an urgent demand for mental health support within those communities. The shared trauma and uncertainty are palpable, creating a collective anxiety that transcends borders and political divides, while aid organizations prepare for a potential humanitarian crisis.</p>
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
          <p>While the visible reality is one of imminent, all-out war, the Z-Factor interpretation suggests a more nuanced and potentially counter-intuitive truth. This overt conflict, though devastating, may serve as a controlled &apos;venting&apos; of pressure by both sides. Both Iran and Israel have profound incentives to avoid a catastrophic, full-scale war given the immense domestic and regional consequences. Therefore, these initial, severe strikes could be interpreted as a violent negotiation tactica public display of capability and resolve designed to establish new &apos;red lines&apos; and re-establish deterrence, rather than an uncontrollable plunge into annihilation. Its a perilous, high-stakes game of chicken, played with real lives and real destruction, where the objective might be to prevent, rather than prosecute, an all-consuming conflict.</p>
        </div>
        <div className="border-l-4 pl-5 py-2" style={{borderColor:'#BA7517'}}>
          <p className="text-base leading-relaxed text-neutral-700 italic font-serif">
            The direct military exchange between Iran and Israel, while devastating, might be a strategic show of force aimed at de-escalation through deterrence, rather than an unbridled plunge into full-scale war. Nevertheless, the human cost is immediate and profound.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 rounded-lg p-5 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-500">Signal Score</span>
          <span className="text-sm font-bold" style={{color:'#1D9E75'}}>7/10</span>
        </div>
        <p className="text-sm text-neutral-600">Stay informed from diverse, credible sources. Support humanitarian efforts in affected regions. Engage in civil discourse and advocate for diplomatic solutions to prevent further escalation.</p>
        <p className="text-xs text-neutral-400 pt-1">Key entities: Iran, Israel, Beirut, Tehran, Tabriz, Isfahan, Lebanese civilians, Israeli civilians, Iranian civilians, Bay Area diaspora</p>
      </section>

      <footer className="border-t pt-6 flex justify-between text-sm text-neutral-500">
        <span className="font-mono text-xs">TA-012 · Z-Factors · Track A</span>
        <Link href="/archive" className="hover:text-neutral-700 text-xs">
          View Archive →
        </Link>
      </footer>

    </main>
  );
}
