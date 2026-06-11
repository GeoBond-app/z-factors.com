import Link from 'next/link';
import fs from 'fs';
import path from 'path';

function getArticles() {
  const analysisDir = path.join(process.cwd(), 'app/analysis');
  try {
    const folders = fs.readdirSync(analysisDir)
      .filter(f => f.match(/^ta-\d+$/i))
      .sort((a, b) => parseInt(b.replace(/ta-/i,'')) - parseInt(a.replace(/ta-/i,'')));
    return folders.map(folder => {
      try {
        const content = fs.readFileSync(path.join(analysisDir, folder, 'page.tsx'), 'utf8');
        const titleMatch = content.match(/title: ['"]([^'"]+) \| Z-Factors['"]/);
        const descMatch = content.match(/description: ['"]([^'"]+)['"]/);
        const scoreMatch = content.match(/Signal[:\s]+(\d+)\/10/);
        const dateMatch = content.match(/(\d{4}-\d{2}-\d{2})/);
        const isCommentary = /Commentary/i.test(content);
        return {
          id: folder.toUpperCase(),
          slug: folder.toLowerCase(),
          headline: titleMatch?.[1]?.trim() || folder,
          description: descMatch?.[1] || '',
          score: scoreMatch?.[1] || '0',
          date: dateMatch?.[1] || '',
          type: isCommentary ? 'SMALL TOWN' : 'BIG CITY'
        };
      } catch { return { id: folder.toUpperCase(), slug: folder, headline: folder, description: '', score: '0', date: '', type: 'BIG CITY' }; }
    });
  } catch { return []; }
}

const R = {
  story:    { color: '#1D9E75', light: '#E1F5EE', dark: '#085041' },
  feeling:  { color: '#7F77DD', light: '#EEEDFE', dark: '#3C3489' },
  response: { color: '#BA7517', light: '#FAEEDA', dark: '#633806' },
};

export default function ArchivePage() {
  const articles = getArticles();
  const bigCity = articles.filter(a => a.type === 'BIG CITY');
  const smallTown = articles.filter(a => a.type === 'SMALL TOWN');

  return (
    <main style={{minHeight:'100vh',background:'#fff',color:'#171717',fontFamily:'ui-sans-serif,system-ui,-apple-system,sans-serif'}}>

      <nav style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px 24px',borderBottom:'0.5px solid #e5e5e5'}}>
        <div>
          <Link href="/" style={{textDecoration:'none',color:'inherit'}}>
            <div style={{fontSize:'20px',fontWeight:'500',letterSpacing:'-0.4px'}}>Z-Factors</div>
            <div style={{fontSize:'10px',letterSpacing:'0.18em',textTransform:'uppercase',color:'#a3a3a3',marginTop:'2px'}}>The real story · The real feeling · The real response</div>
          </Link>
        </div>
        <div style={{display:'flex',gap:'20px',fontSize:'13px',color:'#737373'}}>
          <Link href="/archive" style={{color:'#171717',textDecoration:'none',fontWeight:'500'}}>Archive</Link>
          <Link href="/about" style={{color:'#737373',textDecoration:'none'}}>About</Link>
          <Link href="/contact" style={{color:'#737373',textDecoration:'none'}}>Contact</Link>
        </div>
      </nav>

      <header style={{padding:'36px 24px 28px',borderBottom:'0.5px solid #e5e5e5'}}>
        <div style={{fontSize:'11px',letterSpacing:'0.14em',textTransform:'uppercase',color:'#a3a3a3',marginBottom:'10px'}}>Complete Index</div>
        <h1 style={{fontSize:'28px',fontFamily:'Georgia,Cambria,serif',fontWeight:'400',letterSpacing:'-0.4px',marginBottom:'8px'}}>Archive</h1>
        <p style={{fontSize:'14px',color:'#737373',lineHeight:'1.6',maxWidth:'480px'}}>
          All intelligence · chronological · filterable by lens.
        </p>
        <div style={{display:'flex',gap:'8px',marginTop:'16px',flexWrap:'wrap'}}>
          <span style={{fontSize:'11px',padding:'4px 12px',borderRadius:'999px',background:'#f5f5f5',color:'#525252',fontWeight:'500'}}>All · {articles.length}</span>
          <span style={{fontSize:'11px',padding:'4px 12px',borderRadius:'999px',background:R.story.light,color:R.story.dark,fontWeight:'500'}}>Big City · {bigCity.length}</span>
          <span style={{fontSize:'11px',padding:'4px 12px',borderRadius:'999px',background:R.feeling.light,color:R.feeling.dark,fontWeight:'500'}}>Small Town · {smallTown.length}</span>
        </div>
      </header>

      {bigCity.length > 0 && (
        <section style={{padding:'28px 24px',borderBottom:'0.5px solid #e5e5e5'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}>
            <div style={{width:'3px',height:'20px',background:'linear-gradient(180deg,#1D9E75 0%,#7F77DD 100%)',borderRadius:'2px'}}></div>
            <div>
              <div style={{fontSize:'14px',fontWeight:'500'}}>Big City</div>
              <div style={{fontSize:'11px',color:'#a3a3a3'}}>The real story · What really happened</div>
            </div>
          </div>
          {bigCity.map(article => (
            <Link key={article.id} href={`/analysis/${article.slug}`} style={{textDecoration:'none',color:'inherit'}}>
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',padding:'14px 0',borderBottom:'0.5px solid #f5f5f5',gap:'16px'}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'5px'}}>
                    <span style={{fontSize:'10px',fontFamily:'monospace',color:'#a3a3a3'}}>{article.id}</span>
                    <span style={{fontSize:'10px',fontWeight:'500',padding:'1px 6px',borderRadius:'3px',background:R.story.light,color:R.story.dark}}>Big City</span>
                    <span style={{fontSize:'10px',color:'#a3a3a3'}}>{article.date}</span>
                  </div>
                  <div style={{fontSize:'15px',fontFamily:'Georgia,serif',lineHeight:'1.4',marginBottom:'4px'}}>{article.headline}</div>
                  {article.description && (
                    <div style={{fontSize:'12px',color:'#737373',lineHeight:'1.5',overflow:'hidden',display:'-webkit-box',WebkitLineClamp:'2',WebkitBoxOrient:'vertical'}}>{article.description}</div>
                  )}
                </div>
                <div style={{flexShrink:0,display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'4px'}}>
                  <span style={{fontSize:'12px',fontWeight:'500',color:R.story.color}}>{article.score}/10</span>
                  <span style={{fontSize:'11px',color:'#a3a3a3'}}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      )}

      {smallTown.length > 0 && (
        <section style={{padding:'28px 24px',borderBottom:'0.5px solid #e5e5e5'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}>
            <div style={{width:'3px',height:'20px',background:'linear-gradient(180deg,#7F77DD 0%,#BA7517 100%)',borderRadius:'2px'}}></div>
            <div>
              <div style={{fontSize:'14px',fontWeight:'500'}}>Small Town</div>
              <div style={{fontSize:'11px',color:'#a3a3a3'}}>The real feeling · The real response</div>
            </div>
          </div>
          {smallTown.map(article => (
            <Link key={article.id} href={`/analysis/${article.slug}`} style={{textDecoration:'none',color:'inherit'}}>
              <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',padding:'14px 0',borderBottom:'0.5px solid #f5f5f5',gap:'16px'}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'5px'}}>
                    <span style={{fontSize:'10px',fontFamily:'monospace',color:'#a3a3a3'}}>{article.id}</span>
                    <span style={{fontSize:'10px',fontWeight:'500',padding:'1px 6px',borderRadius:'3px',background:R.feeling.light,color:R.feeling.dark}}>Small Town</span>
                    <span style={{fontSize:'10px',color:'#a3a3a3'}}>{article.date}</span>
                  </div>
                  <div style={{fontSize:'15px',fontFamily:'Georgia,serif',lineHeight:'1.4',marginBottom:'4px'}}>{article.headline}</div>
                  {article.description && (
                    <div style={{fontSize:'12px',color:'#737373',lineHeight:'1.5',overflow:'hidden',display:'-webkit-box',WebkitLineClamp:'2',WebkitBoxOrient:'vertical'}}>{article.description}</div>
                  )}
                </div>
                <div style={{flexShrink:0,display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'4px'}}>
                  <span style={{fontSize:'12px',fontWeight:'500',color:R.feeling.color}}>{article.score}/10</span>
                  <span style={{fontSize:'11px',color:'#a3a3a3'}}>→</span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      )}

      <footer style={{padding:'16px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Link href="/" style={{fontSize:'11px',color:'#a3a3a3',textDecoration:'none'}}>← Back to Z-Factors</Link>
        <span style={{fontSize:'11px',color:'#a3a3a3'}}>{articles.length} articles · Community Intelligence</span>
      </footer>

    </main>
  );
}
