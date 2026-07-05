import type { Metadata } from 'next'
import { SerpPreview } from '@/components/serp-preview'

export const metadata: Metadata = {
  title: 'Free Google SERP Preview Tool — Desktop & Mobile',
  description: 'See exactly how your page appears in Google search results. Preview on desktop and mobile, check title and description truncation. 100% free.',
  keywords: ['serp preview tool', 'google search preview', 'meta title preview', 'meta description checker', 'seo title length', 'free seo tool'],
}

export default function SerpPreviewPage() {
  return (
    <div className="animate-fade-in">
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 3vw, 2rem)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-header">
            <span className="pill">Free Tool — No Signup</span>
            <h1 className="section-title" style={{ marginTop: '1rem' }}>
              SERP <span style={{ color: 'var(--primary)' }}>Preview Tool</span>
            </h1>
            <p className="section-subtitle">
              See exactly how your page will appear in Google search results — on both desktop and mobile. Catch title truncation before you publish.
            </p>
          </div>

          <SerpPreview />

          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>How to Use the <span style={{ color: 'var(--primary)' }}>SERP Preview</span></h2>
            <div className="step-list" style={{ marginTop: '2rem' }}>
              {[
                { step: '1', title: 'Enter Your URL', desc: 'Type the URL of the page you want to preview. This is what appears as the green/gray link text in search results.' },
                { step: '2', title: 'Write Your Title Tag', desc: 'Enter your SEO title (meta title). The tool shows a real-time character count — Google typically truncates titles at 60 characters.' },
                { step: '3', title: 'Write Your Meta Description', desc: 'Enter your meta description. Google truncates at ~160 characters on desktop and ~120 on mobile. The tool highlights when you exceed limits.' },
                { step: '4', title: 'Toggle Desktop/Mobile', desc: 'Switch between desktop and mobile preview to see how your listing looks on both devices. Mobile has stricter truncation limits.' },
              ].map(item => (
                <div key={item.step} className="step-item">
                  <div className="step-number">{item.step}</div>
                  <div><h3>{item.title}</h3><p>{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Why SERP Previews <span style={{ color: 'var(--primary)' }}>Matter for SEO</span></h2>
            <div className="feature-grid" style={{ marginTop: '2rem' }}>
              {[
                { title: 'Prevent Title Truncation', desc: 'A truncated title with "..." looks unprofessional and hides your key message. Preview before publishing to ensure your full title displays.' },
                { title: 'Improve Click-Through Rate', desc: 'Your SERP listing is your first impression. A well-crafted title and description can increase CTR by 30-50% compared to generic ones.' },
                { title: 'Mobile-First Indexing', desc: 'Google uses mobile-first indexing. If your title gets cut off on mobile, that is how most searchers see it. Always check mobile preview.' },
                { title: 'Competitive Edge', desc: 'Most marketers never preview their SERP listings. By optimizing yours, you stand out among competitors who leave their titles to chance.' },
              ].map(f => (
                <div key={f.title} className="feature-card">
                  <h3>🔍 {f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Compared to <span style={{ color: 'var(--primary)' }}>Paid Tools</span></h2>
            <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
              <table className="comparison-table">
                <thead><tr><th>Feature</th><th style={{ color: 'var(--primary)' }}>Magic Signal</th><th>Yoast SEO</th><th>Mangools</th></tr></thead>
                <tbody>
                  <tr><td>Price</td><td><strong>Free</strong></td><td>$99/yr</td><td>$29/mo</td></tr>
                  <tr><td>Signup Required</td><td><strong>No</strong></td><td>Yes</td><td>Yes</td></tr>
                  <tr><td>Desktop Preview</td><td><strong>✓</strong></td><td>✓</td><td>✓</td></tr>
                  <tr><td>Mobile Preview</td><td><strong>✓</strong></td><td>Limited</td><td>✓</td></tr>
                  <tr><td>Real-time Character Count</td><td><strong>✓</strong></td><td>✓</td><td>✓</td></tr>
                  <tr><td>No WordPress Required</td><td><strong>✓</strong></td><td>✗</td><td>✓</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
            <div style={{ marginTop: '2rem' }}>
              {[
                { q: 'What is a SERP?', a: 'SERP stands for Search Engine Results Page — the page Google shows when you search for something. Your "SERP listing" is the title, URL, and description that appears for your page.' },
                { q: 'What is the ideal title tag length?', a: 'Google displays up to 60 characters (or ~580 pixels) for title tags. Keep your most important keywords within the first 50 characters to be safe.' },
                { q: 'What is the ideal meta description length?', a: 'Desktop: up to 160 characters. Mobile: up to 120 characters. Always front-load your most compelling copy within the first 120 characters.' },
                { q: 'Does Google always use my meta description?', a: 'Not always. Google sometimes generates its own snippet from your page content if it thinks it better matches the query. But a well-written meta description is used ~70% of the time.' },
                { q: 'Does this tool fetch my live page data?', a: 'No. This is a preview tool — you manually input your title and description to preview them. It does not crawl or fetch data from your website.' },
              ].map(faq => (
                <details key={faq.q} className="faq-item">
                  <summary>{faq.q}</summary>
                  <div className="faq-answer">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Free SERP Preview Tool",
        "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "See exactly how your page appears in Google search results on desktop and mobile."
      }) }} />
    </div>
  )
}
