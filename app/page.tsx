import Link from 'next/link';

export default function HomePage() {
return ( <main className="max-w-5xl mx-auto px-8 py-12 space-y-16">

```
  <header className="border-b border-neutral-200 pb-8">
    <div className="flex justify-between items-center mb-10">
      <div>
        <div className="text-xs uppercase tracking-[0.3em] text-neutral-500">
          Track A
        </div>
        <h1 className="text-5xl font-bold mt-2">
          Z-FACTORS
        </h1>
      </div>

      <nav className="space-x-6 text-sm">
        <Link href="/">Home</Link>
        <Link href="/archive">Archive</Link>
      </nav>
    </div>

    <p className="text-xl text-neutral-700 max-w-2xl">
      People First. World Second.
    </p>

    <p className="text-neutral-600 mt-4 max-w-3xl">
      Z-Factors interprets real-world events through human impact,
      economic consequences, and hidden structural forces.
    </p>
  </header>

  <section className="border-l-4 border-black pl-6">
    <div className="text-xs uppercase tracking-widest text-neutral-500 mb-3">
      Featured Insight
    </div>

    <p className="text-lg italic">
      “The insurance crisis is not only about wildfire risk.
      It exposes the gap between individual responsibility and
      institutional risk models.”
    </p>

    <div className="mt-3 text-sm">
      From:
      {' '}
      <Link
        href="/analysis/TA-001"
        className="underline"
      >
        TA-001
      </Link>
    </div>
  </section>

  <section>
    <h2 className="text-2xl font-semibold mb-6">
      Latest Analysis
    </h2>

    <article className="border rounded-lg p-6">
      <div className="text-sm text-neutral-500 mb-2">
        TA-001 • June 2026 • Confidence: 92%
      </div>

      <h3 className="text-3xl font-semibold mb-3">
        California Insurance Crisis:
        The Collapse of the Safety Net
      </h3>

      <p className="text-neutral-700 mb-4">
        California's insurance crisis reveals a growing disconnect
        between institutional risk management algorithms and the
        realities facing homeowners.
      </p>

      <Link
        href="/analysis/TA-001"
        className="underline font-medium"
      >
        Read Analysis →
      </Link>
    </article>
  </section>

  <section>
    <h2 className="text-2xl font-semibold mb-6">
      How We Analyze
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-semibold mb-2">
          People First
        </h3>

        <p className="text-neutral-600">
          How does this affect ordinary people?
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">
          Economic Reality
        </h3>

        <p className="text-neutral-600">
          Who benefits? Who loses?
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">
          Hidden Structures
        </h3>

        <p className="text-neutral-600">
          What forces operate beneath the headline?
        </p>
      </div>
    </div>
  </section>

  <footer className="border-t pt-8 text-sm text-neutral-500">
    <div>Z-Factors • Track A Intelligence</div>
    <div>Part of Etherom</div>
  </footer>

</main>
```

);
}

