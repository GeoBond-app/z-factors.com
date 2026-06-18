'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const SECTIONS = [
  { id: 'all', label: 'All Signals' },
  { id: 'economics', label: 'Economics' },
  { id: 'housing', label: 'Housing' },
  { id: 'earth', label: 'Earth' },
  { id: 'health', label: 'Health + Food' },
  { id: 'power', label: 'Power + Money' },
  { id: 'archive', label: 'Archive' },
];

function slugify(str: string) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').slice(0, 80).replace(/-$/, '');
}

interface Article {
  id: string;
  headline: string;
  subheadline: string;
  publish_date: string;
  z_factor_score: number;
  teaser_question: string;
  track2a_feeling: string;
  track2b_question: string;
  body: string[];
  key_entities: string[];
  original_source: string;
  series: string;
  status: string;
}

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [section, setSection] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('publish_date', { ascending: false })
        .limit(50);
      setArticles(data || []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = articles.filter(a => {
    if (section === 'all') return true;
    if (section === 'economics') return /econom|financ|market|bank|currency|stagflat|inflation/i.test(a.headline + a.subheadline);
    if (section === 'housing') return /hous|real estate|rent|afford|zoning/i.test(a.headline + a.subheadline);
    if (section === 'earth') return /climate|water|earthquake|seaweed|wildfire|flood|environment/i.test(a.headline + a.subheadline);
    if (section === 'health') return /health|food|farm|milk|oil|preserv|diet/i.test(a.headline + a.subheadline);
    if (section === 'power') return /dollar|stablecoin|payment|bank|toll|currency|power/i.test(a.headline + a.subheadline);
    if (section === 'archive') return true;
    return true;
  });

  return (
    <main style={{
      maxWidth: '640px',
      margin: '0 auto',
      padding: '0',
      minHeight: '100vh',
      fontFamily: 'var(--font-geist-sans, system-ui, sans-serif)',
    }}>
      {/* Header */}
      <header style={{
        padding: '16px 20px',
        borderBottom: '0.5px solid var(--color-foreground, #171717)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity: 0.9,
      }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.5px' }}>Z-Factors</div>
          <div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.5 }}>Community Intelligence</div>
        </div>
        <div style={{ display: 'flex', gap: '12px', fontSize: '12px', opacity: 0.6 }}>
          <Link href="/portal" style={{ textDecoration: 'none', color: 'inherit' }}>Network</Link>
          <Link href="/archive" style={{ textDecoration: 'none', color: 'inherit' }}>Archive</Link>
          <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About</Link>
        </div>
      </header>

      {/* Section tabs */}
      <div style={{
        display: 'flex',
        overflowX: 'auto',
        borderBottom: '0.5px solid rgba(128,128,128,0.2)',
        scrollbarWidth: 'none',
      }}>
        {SECTIONS.map(s => (
          <button
            key={s.id}
            onClick={() => setSection(s.id)}
            style={{
              flexShrink: 0,
              padding: '10px 16px',
              fontSize: '11px',
              fontWeight: section === s.id ? 600 : 400,
              border: 'none',
              borderBottom: section === s.id ? '2px solid #1D9E75' : '2px solid transparent',
              background: 'transparent',
              color: section === s.id ? '#1D9E75' : 'inherit',
              cursor: 'pointer',
              letterSpacing: '0.5px',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div style={{ padding: '16px 20px' }}>
        {loading && (
          <div style={{ opacity: 0.4, fontSize: '13px', padding: '20px 0' }}>Loading signals...</div>
        )}

        {!loading && filtered.length === 0 && (
          <div style={{ opacity: 0.4, fontSize: '13px', padding: '20px 0' }}>No signals in this section yet.</div>
        )}

        {filtered.map((article, i) => (
          <Link
            key={article.id || i}
            href={`/article/${slugify(article.headline)}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              borderBottom: '0.5px solid rgba(128,128,128,0.15)',
              padding: '16px 0',
              cursor: 'pointer',
            }}>
              {/* Score + series */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#1D9E75',
                }}>{article.z_factor_score}/10</span>
                {article.series && (
                  <span style={{
                    fontSize: '9px',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    opacity: 0.5,
                    border: '0.5px solid rgba(128,128,128,0.3)',
                    padding: '1px 6px',
                    borderRadius: '3px',
                  }}>{article.series}</span>
                )}
                <span style={{ fontSize: '10px', opacity: 0.4, marginLeft: 'auto' }}>
                  {article.publish_date}
                </span>
              </div>

              {/* Headline */}
              <div style={{
                fontSize: '15px',
                fontWeight: 500,
                lineHeight: 1.4,
                marginBottom: '6px',
              }}>{article.headline}</div>

              {/* Subheadline */}
              {article.subheadline && (
                <div style={{
                  fontSize: '12px',
                  opacity: 0.6,
                  lineHeight: 1.5,
                  marginBottom: '8px',
                }}>{article.subheadline}</div>
              )}

              {/* Teaser question */}
              {article.teaser_question && (
                <div style={{
                  fontSize: '12px',
                  fontStyle: 'italic',
                  borderLeft: '2px solid #1D9E75',
                  paddingLeft: '8px',
                  opacity: 0.8,
                  lineHeight: 1.5,
                }}>{article.teaser_question}</div>
              )}

              {/* Source */}
              {article.original_source && (
                <div style={{
                  fontSize: '10px',
                  opacity: 0.4,
                  marginTop: '6px',
                  letterSpacing: '0.5px',
                }}>{article.original_source}</div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer style={{
        padding: '24px 20px',
        borderTop: '0.5px solid rgba(128,128,128,0.2)',
        fontSize: '11px',
        opacity: 0.4,
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span>Z-Factors · Part of Etherom</span>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="https://z-factoring.com" style={{ color: 'inherit', textDecoration: 'none' }}>Government</a>
          <a href="https://geobond.app" style={{ color: 'inherit', textDecoration: 'none' }}>Business</a>
          <a href="https://etherom.com" style={{ color: 'inherit', textDecoration: 'none' }}>Network</a>
        </div>
      </footer>
    </main>
  );
}
