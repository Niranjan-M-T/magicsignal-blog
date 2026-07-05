import type { Metadata } from 'next'
import { RoiCalculator } from '@/components/roi-calculator'

export const metadata: Metadata = {
  title: 'Free Ad Spend Forecaster & ROI Calculator (D2C & B2B)',
  description: 'Calculate exactly how much you need to spend on ads to hit your revenue goals. Features dual-modes for E-Commerce and Lead Gen. 100% free, no signup.',
  keywords: ['ad spend calculator', 'roi calculator', 'roas calculator', 'marketing budget calculator', 'cac calculator', 'free marketing tool'],
}

export default function RoiCalculatorPage() {
  return (
    <div className="animate-fade-in">
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 3vw, 2rem)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {/* Hero */}
          <div className="section-header">
            <span className="pill">Free Tool — No Signup · No Login</span>
            <h1 className="section-title" style={{ marginTop: '1rem' }}>
              Ad Spend <span style={{ color: 'var(--primary)' }}>Forecaster</span>
            </h1>
            <p className="section-subtitle">
              Stop guessing your budget. Work backward from your Revenue Goal to find your exact required ad spend. Custom models for both E-Commerce and Lead Gen.
            </p>
          </div>

          {/* Trust Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            {['100% Free Forever', 'No Signup Required', 'D2C & B2B Modes', 'Break-Even Math', 'Advanced P&L Mode'].map(badge => (
              <span key={badge} style={{ padding: '0.4rem 0.9rem', backgroundColor: 'rgba(168, 85, 247, 0.06)', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', color: 'var(--muted)' }}>
                ✓ {badge}
              </span>
            ))}
          </div>

          <RoiCalculator />

          {/* How to Use */}
          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>How to Use the <span style={{ color: 'var(--primary)' }}>Ad Spend Forecaster</span></h2>
            <div className="step-list" style={{ marginTop: '2rem' }}>
              {[
                { step: '1', title: 'Select Your Business Model', desc: 'Choose "Product (D2C)" if you run an e-commerce brand selling physical or digital products. Choose "Service (B2B)" if you generate leads and close them through a sales process.' },
                { step: '2', title: 'Set Your Revenue Goal', desc: 'Input the exact amount of revenue you want to generate this month. Our calculator works backward from this number to determine your required spend.' },
                { step: '3', title: 'Input Your Margins or Close Rates', desc: 'For D2C: enter your product price and profit per sale. For B2B: enter your deal size, cost-per-lead, and historical close rate from past campaigns.' },
                { step: '4', title: 'Analyze Required Spend', desc: 'The forecaster calculates the exact ad spend range you need. It includes realistic buffers (+20% learning phase cushions for B2B) and highlights your True Break-Even ROAS.' },
                { step: '5', title: 'Enable Advanced Mode', desc: 'Toggle advanced mode to input CPC, conversion rates, agency fees, and customer lifetime value for a complete P&L breakdown.' },
              ].map(item => (
                <div key={item.step} className="step-item">
                  <div className="step-number">{item.step}</div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Use */}
          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Why Use This <span style={{ color: 'var(--primary)' }}>Forecasting Tool?</span></h2>
            <div className="feature-grid" style={{ marginTop: '2rem' }}>
              {[
                { title: 'Goal-Oriented Logic', desc: 'Standard calculators ask: "I have $5,000, what will it get me?" Our tool asks: "I need $50,000 in revenue, how much do I spend?" This is how CFOs plan.' },
                { title: 'Model-Specific Math', desc: 'E-commerce brands care about margins and ROAS. Service businesses care about close rates and CAC. We built distinct calculators for both.' },
                { title: 'Automated Warnings', desc: 'If your CAC is too high or your margins are dangerously thin, the tool triggers health warnings automatically — like a financial consultant.' },
                { title: 'Advanced P&L Mode', desc: 'Toggle advanced mode to include agency fees, CPC, conversion rates, and LTV for a complete profitability projection.' },
              ].map(f => (
                <div key={f.title} className="feature-card">
                  <h3>⚡ {f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison */}
          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>How We Compare to <span style={{ color: 'var(--primary)' }}>Paid Alternatives</span></h2>
            <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th style={{ color: 'var(--primary)' }}>Magic Signal</th>
                    <th>HubSpot</th>
                    <th>Calculoid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Price</td><td><strong>Free</strong></td><td>$45+/mo</td><td>$29+/mo</td></tr>
                  <tr><td>Signup Required</td><td><strong>No</strong></td><td>Yes</td><td>Yes</td></tr>
                  <tr><td>D2C & B2B Modes</td><td><strong>✓</strong></td><td>✗</td><td>✗</td></tr>
                  <tr><td>Break-Even ROAS</td><td><strong>✓</strong></td><td>✗</td><td>✗</td></tr>
                  <tr><td>Goal-Based Forecasting</td><td><strong>✓</strong></td><td>✗</td><td>Limited</td></tr>
                  <tr><td>Advanced P&L Mode</td><td><strong>✓</strong></td><td>Paid Add-on</td><td>✗</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
            <div style={{ marginTop: '2rem' }}>
              {[
                { q: 'What is Break-Even ROAS?', a: 'Break-Even ROAS is the Return on Ad Spend you must achieve to exactly cover your ad spend AND your product costs (COGS). Below this number, you lose money on every sale.' },
                { q: 'Why is the B2B spend "buffered"?', a: 'Lead generation campaigns require learning phases and lead quality can vary wildly. Our tool adds a 20-30% buffer to ensure you hit targets even during volatile performance periods.' },
                { q: 'What is a good CAC percentage?', a: 'CAC (Cost to Acquire a Customer) should ideally be less than 10% of your average deal size. If it creeps above 25%, your profit margins will compress dangerously.' },
                { q: 'Can I include agency fees?', a: 'Yes! Toggle Advanced Mode to include your monthly agency retainer and customer LTV for a hyper-accurate P&L projection.' },
                { q: 'Is this tool accurate?', a: 'It uses the same mathematical models that performance marketers at top agencies use. Accuracy depends on the quality of your input data — garbage in, garbage out.' },
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
        "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Free Ad Spend Forecaster",
        "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "Calculate exactly how much you need to spend on ads to hit your revenue goals."
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is Break-Even ROAS?", "acceptedAnswer": { "@type": "Answer", "text": "Break-Even ROAS is the Return on Ad Spend you must achieve to exactly cover your ad spend AND product costs." } },
          { "@type": "Question", "name": "What is a good CAC percentage?", "acceptedAnswer": { "@type": "Answer", "text": "CAC should ideally be less than 10% of your average deal size." } },
        ]
      }) }} />
    </div>
  )
}
