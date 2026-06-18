'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL ? createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
) : null;

function slugify(str: string) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').slice(0, 80).replace(/-$/, '');
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [article, setArticle] = useState<any>(null);
  const [showInsight, setShowInsight] = useState(false);
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
      const match = (data || []).find((a: any) => slugify(a.headline) === slug);
      setArticle(match || null);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) return (
    <main style={{ maxWidth: '640px', margin: '0 auto', padding: '20px' }}>
      <div style={{ opacity: 0.4, fontSize: '13px' }}>Loading...</div>
    </main>
  );

  if (!article) return (
    <main style={{ maxWidth: '640px', margin: '0 auto', padding: '20px' }}>
      <Link href="/" style={{ fontSize: '12px', opacity: 0.5, textDecoration: 'none', color: 'inherit' }}>← Back</Link>
      <div style={{ marginTop: '20px', opacity: 0.4 }}>Article not found.</div>
    </main>
  );

  const paras = Array.isArray(article.body) ? article.body :
                Array.isArray(article.track1) ? article.track1 : [];

  return (
    <main style={{ maxWidth: '640px', margin: '0 auto', padding: '0', fontFamily: 'var(--font-geist-sans, system-ui, sans-serif)' }}>
      {/* Header */}
      <header style={{ padding: '16px 20px', borderBottom: '0.5px solid rgba(128,128,128,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontSize: '16px', fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>Z-Factors</Link>
        <Link href="/" style={{ fontSize: '12px', opacity: 0.5, textDecoration: 'none', color: 'inherit' }}>← All signals</Link>
      </header>

      <div style={{ padding: '20px' }}>
        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#1D9E75' }}>{article.z_factor_score}/10</span>
          {article.series && <span style={{ fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.5, border: '0.5px solid rgba(128,128,128,0.3)', padding: '1px 6px', borderRadius: '3px' }}>{article.series}</span>}
          <span style={{ fontSize: '10px', opacity: 0.4, marginLeft: 'auto' }}>{article.publish_date}</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: '22px', fontWeight: 600, lineHeight: 1.3, marginBottom: '10px' }}>{article.headline}</h1>
        {article.subheadline && <p style={{ fontSize: '14px', opacity: 0.6, lineHeight: 1.6, marginBottom: '20px' }}>{article.subheadline}</p>}

        {/* Perspective 1A */}
        <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#1D9E75', marginBottom: '8px', opacity: 0.7 }}>Who Wins · Who Loses</div>
        {article.perspective_1a_wins_loses ? (
          <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '20px', opacity: 0.85 }}>{article.perspective_1a_wins_loses}</p>
        ) : paras[0] ? (
          <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '20px', opacity: 0.85 }}>{paras[0]}</p>
        ) : null}

        {/* Perspective 1B */}
        <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#1D9E75', marginBottom: '8px', opacity: 0.7 }}>The Average Person</div>
        {article.perspective_1b_average_person ? (
          <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '20px', opacity: 0.85 }}>{article.perspective_1b_average_person}</p>
        ) : paras[1] ? (
          <p style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '20px', opacity: 0.85 }}>{paras[1]}</p>
        ) : null}

        {/* Remaining paragraphs */}
        {paras.slice(2).map((p: string, i: number) => (
          <p key={i} style={{ fontSize: '15px', lineHeight: 1.8, marginBottom: '14px', opacity: 0.85 }}>{p}</p>
        ))}

        {/* Insight button */}
        {(article.track2a_feeling || article.track2b_question) && (
          <>
            <button
              onClick={() => setShowInsight(!showInsight)}
              style={{
                marginTop: '8px',
                padding: '10px 20px',
                background: 'transparent',
                border: '1px solid #1D9E75',
                color: '#1D9E75',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {showInsight ? 'Hide' : 'Z-Factor Insight'} {showInsight ? '▲' : '▼'}
            </button>

            {showInsight && (
              <div style={{ marginTop: '16px', borderTop: '0.5px solid rgba(128,128,128,0.2)', paddingTop: '16px' }}>
                {article.track2a_feeling && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#1D9E75', marginBottom: '8px', opacity: 0.7 }}>1 · The Insight</div>
                    <div style={{ fontSize: '14px', fontStyle: 'italic', borderLeft: '2px solid #1D9E75', paddingLeft: '12px', lineHeight: 1.7, opacity: 0.8 }}>{article.track2a_feeling}</div>
                  </div>
                )}
                {article.track2b_question && (
                  <div>
                    <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#1D9E75', marginBottom: '8px', opacity: 0.7 }}>2 · What Can We Do</div>
                    <div style={{ fontSize: '15px', fontWeight: 500, lineHeight: 1.6 }}>{article.track2b_question}</div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Entities */}
        {article.key_entities?.length > 0 && (
          <div style={{ marginTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {(article.key_entities as string[]).map((e, i) => (
              <span key={i} style={{ fontSize: '11px', border: '0.5px solid rgba(128,128,128,0.3)', padding: '3px 8px', borderRadius: '20px', opacity: 0.6 }}>{typeof e === 'string' ? e : JSON.stringify(e)}</span>
            ))}
          </div>
        )}

        {/* Source */}
        {article.original_source && (
          <div style={{ marginTop: '16px', fontSize: '11px', opacity: 0.4 }}>Source: {article.original_source}</div>
        )}
      </div>

      <footer style={{ padding: '24px 20px', borderTop: '0.5px solid rgba(128,128,128,0.2)', fontSize: '11px', opacity: 0.4, display: 'flex', justifyContent: 'space-between' }}>
        <span>Z-Factors · Part of Etherom</span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="https://z-factoring.com" style={{ color: 'inherit', textDecoration: 'none' }}>Government</a>
          <a href="https://geobond.app" style={{ color: 'inherit', textDecoration: 'none' }}>Business</a>
        </div>
      </footer>
    </main>
  );
}
