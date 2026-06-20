import Link from 'next/link';

const PARTS = [
  { num: 1, z: 9.8, title: 'The two armies', q: 'The financial system charged you a toll at every step. Someone built a road with no tolls. Who controls the road?' },
  { num: 2, z: 9.7, title: 'The mechanism', q: 'Your payment cleared in seconds. Your money will not arrive for three days. Someone is earning interest on that gap. It is not you.' },
  { num: 3, z: 9.9, title: 'The hegemony', q: 'The US chose not to build a government digital dollar so no one could accuse it of building one — while private companies built it for them.' },
  { num: 4, z: 9.9, title: 'The architecture', q: 'The US cannot sustain dollar dominance through debt issuance alone. So it is replacing the debt model with an asset model.' },
  { num: 5, z: 10.0, title: 'The weapon', q: 'China and Russia spent a decade buying gold to escape the dollar. The US spent that same decade building the system that makes gold only worth something if America says it is.' },
  { num: 6, z: 10.0, title: 'The blueprint', q: 'Trust the government stopped working. So America built a machine that says trust the gold, trust the Bitcoin — and engineered it so trusting those assets means trusting the dollar again.' },
];

const P = '#534AB7';

export default function BankDismantlingPage() {
  return (
    <main style={{ background: '#0B0B0C', color: '#F2F2F0', minHeight: '100vh', fontFamily: 'system-ui,sans-serif', padding: '32px 20px 80px', maxWidth: '760px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'rgba(242,242,240,.4)', marginBottom: '28px', flexWrap: 'wrap' }}>
        <Link href="/" style={{ color: 'rgba(242,242,240,.4)' }}>Z-Factors</Link>
        <span>·</span>
        <Link href="/editor" style={{ color: 'rgba(242,242,240,.4)' }}>Editor's Signal</Link>
        <span>·</span>
        <span style={{ color: '#F2F2F0' }}>Bank Dismantling Series</span>
      </div>

      <div style={{ borderLeft: `3px solid ${P}`, paddingLeft: '20px', marginBottom: '32px' }}>
        <span style={{ fontSize: '11px', color: P, background: 'rgba(83,74,183,.12)', padding: '3px 9px', borderRadius: '999px', border: `0.5px solid rgba(83,74,183,.3)` }}>Editor's Signal · 6 parts complete · Z 9.7–10.0</span>
        <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '26px', lineHeight: 1.3, fontWeight: 400, margin: '14px 0 0' }}>The future of finance will not be decided by which app wins. It will be decided by who controls the infrastructure that money moves through.</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(130px,1fr))', gap: '10px', marginBottom: '32px' }}>
        {[['5','toll layers between your payment and merchant'],['3 days','delay that was always a choice'],['$2T','stablecoin market absorbing US debt'],['Z 10.0','first perfect score — Parts 5+6']].map(([n,l]) => (
          <div key={n} style={{ background: 'rgba(83,74,183,.06)', border: `0.5px solid rgba(83,74,183,.3)`, borderRadius: '8px', padding: '12px' }}>
            <div style={{ fontSize: '18px', fontWeight: 600, color: P, marginBottom: '3px' }}>{n}</div>
            <div style={{ fontSize: '11px', color: 'rgba(242,242,240,.35)', lineHeight: 1.4 }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: '10px', letterSpacing: '.12em', color: 'rgba(242,242,240,.35)', textTransform: 'uppercase', marginBottom: '14px' }}>Read in order · each part builds on the last</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {PARTS.map(p => (
          <div key={p.num} style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) 58px', gap: '14px', alignItems: 'start', padding: '16px 12px', border: `0.5px solid rgba(83,74,183,.3)`, borderRadius: '10px', background: 'rgba(83,74,183,.04)' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(83,74,183,.15)', color: P, fontSize: '15px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.num}</div>
            <div>
              <div style={{ fontSize: '11px', color: P, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '.06em' }}>Part {p.num} · {p.title}</div>
              <div style={{ fontFamily: 'Georgia,serif', fontSize: '15px', lineHeight: 1.4 }}>{p.q}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, padding: '3px 9px', borderRadius: '6px', background: p.z >= 10 ? 'rgba(83,74,183,.3)' : 'rgba(83,74,183,.15)', color: P }}>Z {p.z}</span>
            </div>
          </div>
        ))}
      </div>

      <blockquote style={{ fontFamily: 'Georgia,serif', fontSize: '20px', lineHeight: 1.35, borderLeft: `2px solid ${P}`, paddingLeft: '18px', margin: '40px 0' }}>
        "The infrastructure of money is being rebuilt from the ground up. The only question that matters is: rebuilt for whom?"
      </blockquote>

      <Link href="/editor" style={{ fontSize: '13px', color: P }}>← All Editor's Signals</Link>
    </main>
  );
}
