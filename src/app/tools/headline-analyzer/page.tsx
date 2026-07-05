import type { Metadata } from 'next'
import { HeadlineAnalyzer } from '@/components/headline-analyzer'

export const metadata: Metadata = {
  title: 'Free Headline Analyzer — Score Your Copy for Conversions',
  description: 'Analyze your headlines for emotional impact, readability, power words, and conversion potential. Free, no signup. Based on proven copywriting frameworks.',
  keywords: ['headline analyzer', 'headline score', 'copy analyzer', 'emotional headline', 'power words checker', 'free headline tool'],
}

export default function HeadlineAnalyzerPage() {
  return (
    <div className="animate-fade-in">
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 3vw, 2rem)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-header">
            <span className="pill">Free Tool — No Signup</span>
            <h1 className="section-title" style={{ marginTop: '1rem' }}>
              Headline <span style={{ color: 'var(--primary)' }}>Analyzer</span>
            </h1>
            <p className="section-subtitle">
              Score your headlines for emotional impact, readability, and conversion potential. Based on frameworks used by the world's best copywriters.
            </p>
          </div>

          <HeadlineAnalyzer />

          {/* How to Use */}
          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>How to Use the <span style={{ color: 'var(--primary)' }}>Headline Analyzer</span></h2>
            <div className="step-list" style={{ marginTop: '2rem' }}>
              {[
                { step: '1', title: 'Type or Paste Your Headline', desc: 'Enter your blog title, ad copy, email subject line, or any headline you want to test. The analyzer works in real-time.' },
                { step: '2', title: 'Review Your Score', desc: 'You get an overall score out of 100, plus individual scores for emotional impact, power words, word count, and readability.' },
                { step: '3', title: 'Check Specific Feedback', desc: 'The tool identifies which power words and emotional triggers you used. It also flags issues like headlines that are too long or too short.' },
                { step: '4', title: 'Iterate and Improve', desc: 'Rewrite your headline using the feedback. Try adding power words, emotional triggers, or adjusting the length until your score improves.' },
              ].map(item => (
                <div key={item.step} className="step-item">
                  <div className="step-number">{item.step}</div>
                  <div><h3>{item.title}</h3><p>{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Why Your Headlines <span style={{ color: 'var(--primary)' }}>Matter</span></h2>
            <div className="feature-grid" style={{ marginTop: '2rem' }}>
              {[
                { title: '80% Read Headlines Only', desc: 'Research shows 8 out of 10 people will read your headline, but only 2 out of 10 will read the rest. Your headline IS your content for most people.' },
                { title: '500% CTR Difference', desc: 'The best headline can generate 5x more clicks than an average one. A/B testing has proven this across millions of ad impressions.' },
                { title: 'Email Open Rates', desc: 'Your subject line determines whether your email gets opened or deleted. Strong emotional headlines can double open rates overnight.' },
                { title: 'SEO Title Tags', desc: 'Google ranks pages partly by click-through rate. A compelling title tag that gets more clicks can outrank competitors with more backlinks.' },
              ].map(f => (
                <div key={f.title} className="feature-card">
                  <h3>📝 {f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison */}
          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Compared to <span style={{ color: 'var(--primary)' }}>Paid Tools</span></h2>
            <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
              <table className="comparison-table">
                <thead><tr><th>Feature</th><th style={{ color: 'var(--primary)' }}>Magic Signal</th><th>CoSchedule</th><th>Sharethrough</th></tr></thead>
                <tbody>
                  <tr><td>Price</td><td><strong>Free</strong></td><td>$19+/mo</td><td>Free (limited)</td></tr>
                  <tr><td>Signup Required</td><td><strong>No</strong></td><td>Yes</td><td>Yes</td></tr>
                  <tr><td>Emotional Score</td><td><strong>✓</strong></td><td>✓</td><td>✓</td></tr>
                  <tr><td>Power Word Detection</td><td><strong>✓</strong></td><td>✓</td><td>✗</td></tr>
                  <tr><td>Readability Analysis</td><td><strong>✓</strong></td><td>Limited</td><td>✗</td></tr>
                  <tr><td>Real-time Scoring</td><td><strong>✓</strong></td><td>✓</td><td>✗</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
            <div style={{ marginTop: '2rem' }}>
              {[
                { q: 'What is a good headline score?', a: 'Aim for 70+ out of 100. Headlines scoring above 70 typically have strong emotional triggers, appropriate length (6-12 words), and at least one power word.' },
                { q: 'What are power words?', a: 'Power words are psychologically proven terms that trigger emotional responses: "free," "proven," "secret," "guaranteed," "exclusive," etc. They increase click-through and conversion rates.' },
                { q: 'Does word count matter?', a: 'Yes. Research shows headlines between 6-12 words perform best. Too short lacks context; too long gets ignored or truncated in search results.' },
                { q: 'Can I use this for email subject lines?', a: 'Absolutely. Email subject lines follow the same principles as headlines — emotional impact, curiosity, and power words drive open rates.' },
                { q: 'How is readability calculated?', a: 'We analyze syllable count, word complexity, and sentence structure. Headlines should be scannable and instantly understandable — aim for a 6th-8th grade reading level.' },
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
        "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Free Headline Analyzer",
        "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "Score your headlines for emotional impact, readability, and conversion potential."
      }) }} />
    </div>
  )
}
