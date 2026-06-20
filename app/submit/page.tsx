'use client';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
const G = '#1D9E75';

export default function SubmitPage() {
  const [raw, setRaw]     = useState('');
  const [tag, setTag]     = useState('suppressed');
  const [series, setSeries] = useState('');
  const [part, setPart]   = useState('');
  const [status, setStatus] = useState<'idle'|'submitting'|'done'|'error'>('idle');
  const [msg, setMsg]     = useState('');

  async function submit() {
    if (!raw.trim()) return;
    setStatus('submitting');
    const ko = (raw.match(/[\uAC00-\uD7AF]/g) ?? []).length > 20;
    const { error } = await sb.from('editor_submissions').insert({
      raw_text: raw.trim(), language: ko ? 'ko' : 'en',
      sub_tag: tag, series_slug: series || null,
      series_part: part ? parseInt(part) : null, status: 'pending',
    });
    if (error) { setStatus('error'); setMsg(error.message); }
    else { setStatus('done'); setMsg('Signal submitted. Pipeline processes within 5 minutes.'); setRaw(''); }
  }

  return (
    <main style={{ background: '#0B0B0C', color: '#F2F2F0', minHeight: '100vh', fontFamily: 'system-ui,sans-serif', padding: '32px 20px 80px', maxWidth: '680px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: G, display: 'inline-block' }}/>
        <span style={{ fontSize: '13px', color: G }}>Editor's Signal · Submit</span>
      </div>
      <h1 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '6px' }}>New TYPE3 Submission</h1>
      <p style={{ fontSize: '13px', color: 'rgba(242,242,240,.55)', marginBottom: '28px', lineHeight: 1.6 }}>Paste raw Korean or English text. Pipeline translates, Z-scores, and publishes as Editor's Signal.</p>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '10px', letterSpacing: '.12em', color: 'rgba(242,242,240,.35)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Raw text</label>
        <textarea value={raw} onChange={e => setRaw(e.target.value)} placeholder="Paste Korean or English signal text..." style={{ width: '100%', height: '180px', background: 'rgba(242,242,240,.05)', border: '0.5px solid rgba(242,242,240,.15)', borderRadius: '8px', color: '#F2F2F0', fontFamily: 'system-ui', fontSize: '13px', padding: '10px 12px', resize: 'vertical' }}/>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '10px', letterSpacing: '.12em', color: 'rgba(242,242,240,.35)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Signal type</label>
        <select value={tag} onChange={e => setTag(e.target.value)} style={{ width: '100%', background: 'rgba(242,242,240,.05)', border: '0.5px solid rgba(242,242,240,.15)', borderRadius: '8px', color: '#F2F2F0', fontFamily: 'system-ui', fontSize: '13px', padding: '10px 12px' }}>
          <option value="suppressed">Suppressed Signal — gap between known and told is large</option>
          <option value="pattern">Pattern Worth Naming — insight under-framed publicly</option>
          <option value="human">Human Story — person reveals something structural</option>
          <option value="classified">Classified — no source attribution, reader decides</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '28px' }}>
        <div>
          <label style={{ fontSize: '10px', letterSpacing: '.12em', color: 'rgba(242,242,240,.35)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Series (optional)</label>
          <input value={series} onChange={e => setSeries(e.target.value)} placeholder="e.g. bank-dismantling" style={{ width: '100%', background: 'rgba(242,242,240,.05)', border: '0.5px solid rgba(242,242,240,.15)', borderRadius: '8px', color: '#F2F2F0', fontFamily: 'system-ui', fontSize: '13px', padding: '10px 12px' }}/>
        </div>
        <div>
          <label style={{ fontSize: '10px', letterSpacing: '.12em', color: 'rgba(242,242,240,.35)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>Part number</label>
          <input value={part} onChange={e => setPart(e.target.value)} placeholder="e.g. 7" type="number" style={{ width: '100%', background: 'rgba(242,242,240,.05)', border: '0.5px solid rgba(242,242,240,.15)', borderRadius: '8px', color: '#F2F2F0', fontFamily: 'system-ui', fontSize: '13px', padding: '10px 12px' }}/>
        </div>
      </div>

      <button onClick={submit} disabled={status === 'submitting' || !raw.trim()} style={{ width: '100%', padding: '12px', background: status === 'done' ? G : '#534AB7', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', opacity: status === 'submitting' || !raw.trim() ? 0.6 : 1 }}>
        {status === 'submitting' ? 'Submitting...' : status === 'done' ? '✓ Submitted' : 'Submit Signal →'}
      </button>

      {msg && <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '8px', background: status === 'error' ? 'rgba(192,57,43,.1)' : 'rgba(29,158,117,.1)', fontSize: '13px', color: status === 'error' ? '#C0392B' : G }}>{msg}</div>}
    </main>
  );
}
