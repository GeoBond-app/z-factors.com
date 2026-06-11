import Link from 'next/link';
import fs from 'fs';
import path from 'path';

function getArticles() {
  const analysisDir = path.join(process.cwd(), 'app/analysis');
  const folders = fs.readdirSync(analysisDir)
    .filter(f => f.match(/^ta-\d+$/i))
    .sort((a, b) => {
      const numA = parseInt(a.replace(/ta-/i,''));
      const numB = parseInt(b.replace(/ta-/i,''));
      return numB - numA;
    });
  return folders.map(folder => {
    try {
      const content = fs.readFileSync(
        path.join(analysisDir, folder, 'page.tsx'), 'utf8'
      );
      const titleMatch = content.match(/title: '([^']+) \| Z-Factors'/);
      const descMatch = content.match(/description: '([^']+)'/);
      const h1Match = content.match(/<h1[^>]*>\s*([^<]+)\s*<\/h1>/);
      const scoreMatch = content.match(/Signal: (\d+)\/10/);
      const dateMatch = content.match(/(\d{4}-\d{2}-\d{2})/);
      return {
        id: folder.toUpperCase(),
        slug: folder.toLowerCase(),
        headline: (titleMatch?.[1] || h1Match?.[1] || folder).trim(),
        description: descMatch?.[1] || '',
        score: scoreMatch?.[1] || '0',
        date: dateMatch?.[1] || ''
      };
    } catch(e) {
      return { id: folder.toUpperCase(), slug: folder, headline: folder, description: '', score: '0', date: '' };
    }
  });
}

export default function HomePage() {
  const articles = getArticles();
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <main className="max-w-5xl mx-auto px-8 py-12 space-y-16">

      <header className="border-b border-neutral-200 pb-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Track A · Community Intelligence
            </div>
            <h1 className="text-5xl font-bold mt-2">
              Z-FACTORS
            </h1>
          </div>
          <nav className="space-x-6 text-sm">
            <Link href="/">Home</Link>
            <Link href="/archive">Archive</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
          </nav>
        </div>
        <p className="text-xl text-neutral-700 max-w-2xl">
          Most news tells you what happened.
          We ask how people are carrying it.
        </p>
        <p className="text-neutral-600 mt-4 max-w-3xl">
          Z-Factors interprets global events through three lenses:
          Visible Reality, Human Reality, and Shared Reality.
        </p>
      </header>

      {featured && (
        <section className="border-l-4 border-black pl-6">
          <div className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
            Latest Signal · Score {featured.score}/10
          </div>
          <h2 className="text-3xl font-serif mb-3">
            {featured.headline}
          </h2>
          <p className="text-neutral-600 mb-4">{featured.description}</p>
          <Link href={"/analysis/" + featured.slug} className="underline font-medium">
            Read Analysis →
          </Link>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Latest Analysis
        </h2>
        <div className="space-y-4">
          {articles.map(article => (
            <article key={article.id} className="border rounded-lg p-6 hover:border-neutral-400 transition-colors">
              <div className="text-sm text-neutral-500 mb-2">
                {article.id} · {article.date} · Signal: {article.score}/10
              </div>
              <h3 className="text-2xl font-semibold mb-3">
                {article.headline}
              </h3>
              <p className="text-neutral-700 mb-4">{article.description}</p>
              <Link href={"/analysis/" + article.slug} className="underline font-medium">
                Read Analysis →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Editorial DNA
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Visible Reality</h3>
            <p className="text-neutral-600">Facts, events, economics, policies.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Human Reality</h3>
            <p className="text-neutral-600">How people experience and carry it.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Shared Reality</h3>
            <p className="text-neutral-600">Community ripples and collective response.</p>
          </div>
        </div>
        <p className="text-neutral-500 mt-6 text-sm italic">
          Technology is a tool. Community is the outcome. People are the destination.
        </p>
      </section>

      <footer className="border-t pt-8 text-sm text-neutral-500">
        <div>Z-Factors · Track A Intelligence · Part of Etherom</div>
      </footer>

    </main>
  );
}
