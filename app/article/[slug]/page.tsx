'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL ? createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
) : null;

const T = '#1D9E75';
const A = '#BA7517';
const R = '#E24B4A';
const P = '#7F77DD';
const BD = 'rgba(128,128,128,0.15)';

function slugify(str: string) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').slice(0, 80).replace(/-$/, '');
}

function ZBadge({ score }: { score: number }) {
  const bg = score >= 9.5 ? R : score >= 9 ? T : score >= 8 ? A : P;
  return (
    <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '3px', fontWeight: 600, color: '#fff', background: bg }}>
      Z {score}
    </span>
  );
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<any>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [archive, setArchive] = useState<any[]>([]);
  const [tab, setTab] = useState<'signal' | 'sources' | 'related' | 'archive'>('signal');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('publish_date', { ascending: false })
        .limit(100);
      const all = data || [];
      const match = all.find((a: any) => slugify(a.headline) === slug);
      setArticle(match || null);
      if (match) {
        setRelated(all.filter((a: any) =>
          a.id !== match.id && (
            (match.series && a.series === match.series) ||
            Math.abs(a.z_factor_score - match.z_factor_score) <= 1
          )
        ).slice(0, 5));
        setArchive(all.filter((a: any) =>
          a.id !== match.id && match.series && a.series === match.series
        ).slice(0, 10));
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '20px', fontFamily: 'var(--font-geist-sans, system-ui, sans-serif)' }}>
      <div style={{ opacity: 0.4, fontSize: '13px' }}>Loading signal...</div>
    </main>
  );

  if (!article) return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '20px', fontFamily: 'var(--font-geist-sans, system-ui, sans-serif)' }}>
      <Link href="/" style={{ fontSize: '12px', opacity: 0.5, textDecoration: 'none', color: 'inherit' }}>← Back to signals</Link>
      <div style={{ marginTop: '20px', opacity: 0.4 }}>Signal not found.</div>
    </main>
  );

  const hasViews = article.track2a_feeling && article.track2b_question;
  const formatType = hasViews ? 'A' : 'B';
  const paras: string[] = Array.isArray(article.body) ? article.body :
    Array.isArray(article.track1) ? article.track1 :
    article.subheadline ? [article.subheadline] : [];
  const sources = article.original_source
    ? article.original_source.split(/[·,]/).map((s: string) => s.trim()).filter(Boolean)
    : [];

  return (
    <main style={{ fontFamily: 'var(--font-geist-sans, system-ui, sans-serif)', fontSize: '13px', minHeight: '100vh' }}>

      <header style={{ padding: '8px 20px', borderBottom: `0.5px solid ${BD}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ fontSize: '15px', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>Z-Factors</Link>
        <Link href="/" style={{ fontSize: '11px', opacity: 0.5, textDecoration: 'none', color: 'inherit' }}>← All signals</Link>
      </header>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 20px' }}>

        <div style={{ padding: '20px 0 14px', borderBottom: `0.5px solid ${BD}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <ZBadge score={article.z_factor_score} />
            {article.series && <span style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.5, border: `0.5px solid ${BD}`, padding: '1px 6px', borderRadius: '3px' }}>{article.series}</span>}
            {article.sub_tag && <span style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.5, border: `0.5px solid ${BD}`, padding: '1px 6px', borderRadius: '3px' }}>{article.sub_tag}</span>}
            <span style={{ fontSize: '10px', opacity: 0.4, marginLeft: 'auto' }}>{article.publish_date}</span>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: 600, lineHeight: 1.35, margin: '0 0 8px' }}>{article.headline}</h1>
          {sources.length > 0 && <div style={{ fontSize: '11px', opacity: 0.4 }}>Sources: {sources.join(' · ')}</div>}
        </div>

        <div style={{ display: 'flex', borderBottom: `0.5px solid ${BD}` }}>
          {(['signal', 'sources', 'related', 'archive'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ fontSize: '11px', padding: '7px 14px', cursor: 'pointer', borderBottom: tab === t ? `2px solid ${T}` : '2px solid transparent', color: tab === t ? T : 'inherit', fontWeight: tab === t ? 600 : 400, background: 'none', border: 'none', borderBottom: tab === t ? `2px solid ${T}` : '2px solid transparent' }}>
              {t === 'signal' ? 'Z-Factors Signal' : t.charAt(0).toUpperCase() + t.slice(1)}
              {t === 'related' && related.length > 0 && <span style={{ marginLeft: '4px', fontSize: '9px', opacity: 0.5 }}>({related.length})</span>}
            </button>
          ))}
        </div>

        {tab === 'signal' && (
          <div style={{ padding: '20px 0' }}>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1.5px', color: T, fontWeight: 600, marginBottom: '10px', opacity: 0.7 }}>What really happened · 5th grade English</div>
            {paras.map((p, i) => <p key={i} style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '14px', opacity: 0.85 }}>{p}</p>)}
            {paras.length === 0 && article.subheadline && <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '14px', opacity: 0.85 }}>{article.subheadline}</p>}
            <div style={{ height: '0.5px', background: BD, margin: '20px 0' }} />
            {formatType === 'A' && (
              <>
                <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1.5px', color: T, fontWeight: 600, marginBottom: '12px', opacity: 0.7 }}>Two views</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ background: 'rgba(29,158,117,0.08)', borderRadius: '6px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: T, marginBottom: '6px' }}>Who benefits</div>
                    <div style={{ fontSize: '13px', lineHeight: 1.6, opacity: 0.8 }}>{article.track2a_feeling}</div>
                  </div>
                  <div style={{ background: 'rgba(226,75,74,0.08)', borderRadius: '6px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: R, marginBottom: '6px' }}>Who loses</div>
                    <div style={{ fontSize: '13px', lineHeight: 1.6, opacity: 0.8 }}>{article.track2b_question}</div>
                  </div>
                </div>
              </>
            )}
            {formatType === 'B' && (article.teaser_question || article.track2b_question) && (
              <>
                <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1.5px', color: T, fontWeight: 600, marginBottom: '12px', opacity: 0.7 }}>The question</div>
                <div style={{ fontSize: '16px', fontStyle: 'italic', borderLeft: `3px solid ${T}`, paddingLeft: '14px', lineHeight: 1.7, opacity: 0.85, marginBottom: '20px' }}>
                  {article.teaser_question || article.track2b_question}
                </div>
              </>
            )}
            <div style={{ height: '0.5px', background: BD, margin: '20px 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
              <div style={{ flex: 1, height: '4px', background: 'rgba(128,128,128,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${(article.z_factor_score / 10) * 100}%`, height: '4px', background: article.z_factor_score >= 9.5 ? R : article.z_factor_score >= 9 ? T : A, borderRadius: '2px' }} />
              </div>
              <ZBadge score={article.z_factor_score} />
            </div>
            <div style={{ fontSize: '11px', opacity: 0.4, marginBottom: '20px' }}>Z-score measures meaning. Not certainty.</div>
            {article.key_entities?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
                {(article.key_entities as string[]).map((e, i) => (
                  <span key={i} style={{ fontSize: '11px', border: `0.5px solid ${BD}`, padding: '2px 8px', borderRadius: '20px', opacity: 0.6 }}>{typeof e === 'string' ? e : JSON.stringify(e)}</span>
                ))}
              </div>
            )}
            <div style={{ padding: '12px 14px', border: `0.5px solid ${BD}`, borderRadius: '6px', background: 'rgba(128,128,128,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ fontSize: '11px', opacity: 0.6 }}>Full intelligence report available on z-factoring.com</div>
              <a href="https://z-factoring.com" style={{ fontSize: '11px', padding: '5px 12px', border: `0.5px solid ${P}`, borderRadius: '4px', color: P, textDecoration: 'none' }}>Government intelligence →</a>
            </div>
          </div>
        )}

        {tab === 'sources' && (
          <div style={{ padding: '20px 0' }}>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.5, fontWeight: 600, marginBottom: '12px' }}>Primary sources</div>
            {sources.length > 0 ? sources.map((src: string, i: number) => (
              <div key={i} style={{ padding: '10px 0', borderBottom: `0.5px solid ${BD}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 500 }}>{src}</span>
                <span style={{ fontSize: '10px', color: T }}>Z-weight: high</span>
              </div>
            )) : <div style={{ opacity: 0.4, fontSize: '13px' }}>No sources listed for this signal.</div>}
          </div>
        )}

        {tab === 'related' && (
          <div style={{ padding: '20px 0' }}>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.5, fontWeight: 600, marginBottom: '12px' }}>Related signals</div>
            {related.length > 0 ? related.map((a, i) => (
              <Link key={i} href={`/article/${slugify(a.headline)}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 0', borderBottom: `0.5px solid ${BD}` }}>
                <ZBadge score={a.z_factor_score} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px' }}>{a.headline}</div>
                  <div style={{ fontSize: '10px', opacity: 0.4 }}>{a.publish_date} · {a.original_source}</div>
                </div>
              </Link>
            )) : <div style={{ opacity: 0.4, fontSize: '13px' }}>No related signals found.</div>}
          </div>
        )}

        {tab === 'archive' && (
          <div style={{ padding: '20px 0' }}>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.5, fontWeight: 600, marginBottom: '12px' }}>
              {article.series ? `${article.series} · full archive` : 'Signal archive'}
            </div>
            {archive.length > 0 ? archive.map((a, i) => (
              <Link key={i} href={`/article/${slugify(a.headline)}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `0.5px solid ${BD}` }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '1px' }}>{a.headline}</div>
                  <div style={{ fontSize: '10px', opacity: 0.4 }}>{a.publish_date}</div>
                </div>
                <ZBadge score={a.z_factor_score} />
              </Link>
            )) : <div style={{ opacity: 0.4, fontSize: '13px' }}>No archive entries yet.</div>}
            <div style={{ marginTop: '16px' }}>
              <Link href="/archive" style={{ fontSize: '11px', color: T, textDecoration: 'none' }}>View full signal archive →</Link>
            </div>
          </div>
        )}

      </div>

      <footer style={{ padding: '20px', borderTop: `0.5px solid ${BD}`, fontSize: '11px', opacity: 0.4, display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
        <span>Z-Factors · Part of Etherom</span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="https://z-factoring.com" style={{ color: 'inherit', textDecoration: 'none' }}>Government</a>
          <a href="https://geobond.app" style={{ color: 'inherit', textDecoration: 'none' }}>Business</a>
          <Link href="/archive" style={{ color: 'inherit', textDecoration: 'none' }}>Archive</Link>
        </div>
      </footer>

    </main>
  );
}
