import type { Metadata } from 'next'
import { UtmBuilder } from '@/components/utm-builder'

export const metadata: Metadata = {
  title: 'Free UTM Builder + QR Code Generator',
  description: 'Create perfectly tagged campaign URLs with UTM parameters and instantly generate downloadable QR codes. 100% free, no signup.',
  keywords: ['utm builder', 'utm link generator', 'campaign url builder', 'qr code generator', 'utm parameters', 'google analytics utm'],
}

export default function UtmBuilderPage() {
  return (
    <div className="animate-fade-in">
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 3vw, 2rem)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-header">
            <span className="pill">Free Tool — No Signup</span>
            <h1 className="section-title" style={{ marginTop: '1rem' }}>
              UTM Builder + <span style={{ color: 'var(--primary)' }}>QR Generator</span>
            </h1>
            <p className="section-subtitle">
              Build perfectly tagged campaign URLs and generate downloadable QR codes. Track every click from every campaign across every channel.
            </p>
          </div>

          <UtmBuilder />

          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>How to Use the <span style={{ color: 'var(--primary)' }}>UTM Builder</span></h2>
            <div className="step-list" style={{ marginTop: '2rem' }}>
              {[
                { step: '1', title: 'Enter Your Landing Page URL', desc: 'Paste the URL of the page you want to track. This is where users will land when they click your campaign link.' },
                { step: '2', title: 'Fill In UTM Parameters', desc: 'Source = where traffic comes from (google, facebook). Medium = type of traffic (cpc, email). Campaign = your campaign name (summer_sale).' },
                { step: '3', title: 'Copy Your Tagged URL', desc: 'The tool generates your complete UTM-tagged URL. Click copy to grab it. Use this URL in your ads, emails, and social posts.' },
                { step: '4', title: 'Download QR Code (Optional)', desc: 'Instantly generate a QR code for your tagged URL — perfect for print ads, flyers, business cards, and event materials.' },
              ].map(item => (
                <div key={item.step} className="step-item">
                  <div className="step-number">{item.step}</div>
                  <div><h3>{item.title}</h3><p>{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Why UTM Tracking <span style={{ color: 'var(--primary)' }}>Matters</span></h2>
            <div className="feature-grid" style={{ marginTop: '2rem' }}>
              {[
                { title: 'Know What Works', desc: 'Without UTM tags, Google Analytics lumps all traffic together. UTMs let you see exactly which campaign, ad, or post drove each conversion.' },
                { title: 'Prove ROI to Clients', desc: 'As an agency, UTM tracking is how you prove your campaigns drive revenue. Show clients exactly which spend produced which results.' },
                { title: 'Optimize Ad Spend', desc: 'When you know which campaigns convert, you can double down on winners and kill losers. UTMs are the foundation of data-driven marketing.' },
                { title: 'Bridge Online & Offline', desc: 'QR codes with UTM tags let you track offline campaigns (print, events, packaging) right inside Google Analytics. No more guessing.' },
              ].map(f => (
                <div key={f.title} className="feature-card">
                  <h3>🔗 {f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Compared to <span style={{ color: 'var(--primary)' }}>Paid Alternatives</span></h2>
            <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
              <table className="comparison-table">
                <thead><tr><th>Feature</th><th style={{ color: 'var(--primary)' }}>Magic Signal</th><th>Bitly</th><th>Google Campaign URL Builder</th></tr></thead>
                <tbody>
                  <tr><td>Price</td><td><strong>Free</strong></td><td>$8+/mo</td><td>Free</td></tr>
                  <tr><td>QR Code Generation</td><td><strong>✓</strong></td><td>Paid</td><td>✗</td></tr>
                  <tr><td>Signup Required</td><td><strong>No</strong></td><td>Yes</td><td>No</td></tr>
                  <tr><td>Copy to Clipboard</td><td><strong>✓</strong></td><td>✓</td><td>Manual</td></tr>
                  <tr><td>Clean UI</td><td><strong>✓</strong></td><td>✓</td><td>Basic</td></tr>
                  <tr><td>Downloadable QR</td><td><strong>✓</strong></td><td>Paid</td><td>✗</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
            <div style={{ marginTop: '2rem' }}>
              {[
                { q: 'What are UTM parameters?', a: 'UTM parameters are tags you add to a URL that tell Google Analytics where your traffic came from. The main parameters are: source, medium, campaign, term, and content.' },
                { q: 'What is the difference between source and medium?', a: 'Source is WHERE the traffic comes from (google, facebook, newsletter). Medium is the TYPE of traffic (cpc, organic, email, social). Think of source as the "who" and medium as the "how."' },
                { q: 'Do UTM parameters affect SEO?', a: 'No. UTM parameters only affect analytics tracking. Google ignores them for ranking purposes. However, avoid using UTM-tagged URLs as canonical URLs.' },
                { q: 'Can I use this for social media campaigns?', a: 'Absolutely. UTM tagging is essential for social media. Without UTMs, GA4 often misattributes social traffic as "direct" or "referral."' },
                { q: 'Why do I need a QR code?', a: 'QR codes bridge offline and online marketing. Use them on print materials, packaging, event signage, and business cards to drive trackable traffic to your campaigns.' },
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
        "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Free UTM Builder + QR Generator",
        "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "Create UTM-tagged campaign URLs and generate downloadable QR codes."
      }) }} />
    </div>
  )
}
