import Link from 'next/link';

export default function EditorArchivePage() {
  const P = '#534AB7';
  const series = [
    { slug: 'bank-dismantling', title: 'The Bank Dismantling Series', zRange: '9.7–10.0', parts: 6 },
    { slug: 'earthquake', title: 'Earthquake Series', zRange: '9.2–9.5', parts: 2 },
  ];
  const standalone = [
    { slug: 'type3-t1-settlement-rule', q: 'Banks just got access to your money two days sooner. Why did it take until now?', z: 8.6, tag: 'suppressed' },
    { slug: 'type3-milk-industry', q: 'If the science was always more complicated than milk builds strong bones — who decided you did not need to know that?', z: 9.1, tag: 'suppressed' },
    { slug: 'type3-seed-oil', q: 'The oil in almost every processed food was classified as industrial lubricant before it became a staple. At what point did someone decide that was fine?', z: 9.2, tag: 'suppressed' },
    { slug: 'type3-cbdc', q: 'If the government can see every transaction and program money to expire — who controls the economy, and who controls you?', z: 9.4, tag: 'suppressed' },
    { slug: 'type3-trust-infrastructure', q: 'In every high-stakes market, the real transaction is not the deal — it is the decision to trust the person offering it.', z: 7.8, tag: 'pattern' },
    { slug: 'type3-california-insurance', q: 'If no one will insure the home you already own, what exactly do you own?', z: 9.0, tag: 'suppressed' },
  ];

  return (
    <main style={{ background: '#0B0B0C', color: '#F2F2F0', minHeight: '100vh', fontFamily: 'system-ui,sans-serif', padding: '32px 20px 80px', maxWidth: '760px', margin: '0 auto' }}>
      <Link href="/" style={{ fontSize: '13px', color: 'rgba(242,242,240,.4)', textDecoration: 'none' }}>← Z-Factors</Link>
      <div style={{ marginTop: '20px', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 500, margin: 0 }}>Editor's Signal</h1>
        <p style={{ fontSize: '13px', color: 'rgba(242,242,240,.55)', margin: '6px 0 0', lineHeight: 1.6 }}>Stories the pipeline did not find. Not in any top 10. Not trending anywhere. Here because they matter.</p>
      </div>

      <div style={{ fontSize: '10px', letterSpacing: '.12em', color: 'rgba(242,242,240,.35)', textTransform: 'uppercase', marginBottom: '14px' }}>Investigative series</div>
      {series.map(s => (
        <Link key={s.slug} href={`/editor/${s.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ border: `0.5px solid rgba(83,74,183,.3)`, borderLeft: `3px solid ${P}`, borderRadius: '10px', background: 'rgba(83,74,183,.04)', padding: '14px 16px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{s.title}</div>
              <div style={{ fontSize: '11px', color: 'rgba(242,242,240,.4)' }}>{s.parts} parts · complete · Z {s.zRange}</div>
            </div>
            <span style={{ fontSize: '11px', color: P }}>read series →</span>
          </div>
        </Link>
      ))}

      <div style={{ fontSize: '10px', letterSpacing: '.12em', color: 'rgba(242,242,240,.35)', textTransform: 'uppercase', margin: '24px 0 14px' }}>Standalone signals</div>
      {standalone.map(a => (
        <div key={a.slug} style={{ border: '0.5px solid rgba(242,242,240,.1)', borderRadius: '10px', padding: '14px 16px', marginBottom: '10px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 50px', gap: '12px', alignItems: 'start' }}>
          <div>
            <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '999px', background: 'rgba(83,74,183,.12)', color: P, border: `0.5px solid rgba(83,74,183,.3)`, marginBottom: '8px', display: 'inline-block' }}>{a.tag}</span>
            <div style={{ fontFamily: 'Georgia,serif', fontSize: '15px', lineHeight: 1.4 }}>{a.q}</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '12px', fontWeight: 600, color: P }}>Z {a.z}</div>
        </div>
      ))}
    </main>
  );
}
