import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free Online Document Signing — No Signup, No Watermarks',
  description: 'Sign PDFs and documents online for free. Legally binding electronic signatures with no signup, no watermarks, and no limits. Powered by Magic Signal.',
  keywords: ['free document signing', 'sign pdf online free', 'electronic signature free', 'e-signature no signup', 'free esignature tool', 'sign documents free'],
}

export default function DocumentSigningPage() {
  return (
    <div className="animate-fade-in">
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 3vw, 2rem)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          {/* Hero */}
          <div className="section-header">
            <span className="pill">Free Tool — No Signup · No Watermarks</span>
            <h1 className="section-title" style={{ marginTop: '1rem' }}>
              Free Document <span style={{ color: 'var(--primary)' }}>Signing</span>
            </h1>
            <p className="section-subtitle">
              Sign PDFs and documents online in seconds. No account needed, no watermarks on your documents, no limits on how many you sign.
            </p>
          </div>

          {/* CTA Card */}
          <div style={{
            textAlign: 'center',
            padding: 'clamp(2rem, 5vw, 4rem)',
            border: '2px solid var(--border)',
            borderRadius: 'var(--radius)',
            backgroundColor: 'rgba(168, 85, 247, 0.03)',
            marginBottom: '4rem',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>✒️</div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '1rem' }}>
              Ready to Sign Your Document?
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: '1.7' }}>
              Upload your PDF, draw or type your signature, and download the signed document — all in under 60 seconds.
            </p>
            <a
              href="https://sign.studiohappens.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
            >
              Open Document Signing Tool →
            </a>
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              Opens in a new tab · 100% Free · No signup required
            </p>
          </div>

          {/* How it Works */}
          <div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>How It <span style={{ color: 'var(--primary)' }}>Works</span></h2>
            <div className="step-list" style={{ marginTop: '2rem' }}>
              {[
                { step: '1', title: 'Upload Your Document', desc: 'Drag and drop your PDF, Word document, or image file. We support all common document formats. Your file is processed locally in your browser.' },
                { step: '2', title: 'Place Your Signature', desc: 'Draw your signature with your mouse or finger (on mobile), type it, or upload an image of your signature. Place it precisely where you need it on the document.' },
                { step: '3', title: 'Add Additional Fields', desc: 'Add the date, your name, initials, or any text annotations. Position them anywhere on any page of the document.' },
                { step: '4', title: 'Download Signed Document', desc: 'Click "Sign & Download" to get your completed document as a PDF. No watermarks, no "powered by" branding, no quality loss.' },
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
            <h2 className="section-title" style={{ textAlign: 'center' }}>Why Choose Our <span style={{ color: 'var(--primary)' }}>Free Signing Tool</span></h2>
            <div className="feature-grid" style={{ marginTop: '2rem' }}>
              {[
                { title: 'No Account Required', desc: 'Unlike DocuSign or HelloSign, you never need to create an account. Upload, sign, download — that is it.' },
                { title: 'No Watermarks', desc: 'Free tools typically stamp "Signed with [tool name]" on your document. We never add watermarks. Your document stays clean and professional.' },
                { title: 'Unlimited Signatures', desc: 'No "3 free signatures per month" limits. Sign as many documents as you need, whenever you need. Forever free.' },
                { title: 'Privacy First', desc: 'Your documents are processed in your browser. We do not store, read, or have access to your files. Your data never leaves your device.' },
                { title: 'Mobile Friendly', desc: 'Sign documents from your phone or tablet. Draw your signature with your finger — no stylus needed. Works on iOS and Android.' },
                { title: 'Legally Binding', desc: 'Electronic signatures are legally recognized under the ESIGN Act (US), eIDAS (EU), and IT Act (India). Our signatures meet these legal standards.' },
              ].map(f => (
                <div key={f.title} className="feature-card">
                  <h3>✅ {f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Perfect For <span style={{ color: 'var(--primary)' }}>Every Industry</span></h2>
            <div className="feature-grid" style={{ marginTop: '2rem' }}>
              {[
                { title: 'Freelancers', desc: 'Sign client contracts, NDAs, and proposals without paying for expensive e-signature subscriptions. One less monthly tool to worry about.' },
                { title: 'Small Businesses', desc: 'Sign employment agreements, vendor contracts, and invoices. No need to print, sign, scan, and email — do it all digitally in seconds.' },
                { title: 'Real Estate', desc: 'Sign lease agreements, property documents, and disclosures. Share signed documents instantly with agents and tenants.' },
                { title: 'Students & Educators', desc: 'Sign consent forms, application documents, and academic papers. No printer needed — sign right from your phone.' },
              ].map(f => (
                <div key={f.title} className="feature-card">
                  <h3>📋 {f.title}</h3>
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
                <thead><tr><th>Feature</th><th style={{ color: 'var(--primary)' }}>Magic Signal</th><th>DocuSign</th><th>HelloSign</th><th>Adobe Sign</th></tr></thead>
                <tbody>
                  <tr><td>Price</td><td><strong>Free</strong></td><td>$10+/mo</td><td>$15+/mo</td><td>$12.99+/mo</td></tr>
                  <tr><td>Signup Required</td><td><strong>No</strong></td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
                  <tr><td>Watermarks</td><td><strong>None</strong></td><td>None (paid)</td><td>Branding</td><td>None (paid)</td></tr>
                  <tr><td>Monthly Limit</td><td><strong>Unlimited</strong></td><td>5 free</td><td>3 free</td><td>2 free</td></tr>
                  <tr><td>Draw Signature</td><td><strong>✓</strong></td><td>✓</td><td>✓</td><td>✓</td></tr>
                  <tr><td>Type Signature</td><td><strong>✓</strong></td><td>✓</td><td>✓</td><td>✓</td></tr>
                  <tr><td>Mobile Support</td><td><strong>✓</strong></td><td>App Only</td><td>App Only</td><td>App Only</td></tr>
                  <tr><td>Privacy (No Upload)</td><td><strong>✓</strong></td><td>✗</td><td>✗</td><td>✗</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div style={{ marginTop: '5rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Frequently Asked Questions</h2>
            <div style={{ marginTop: '2rem' }}>
              {[
                { q: 'Is a document signed with this tool legally binding?', a: 'Yes. Electronic signatures are legally recognized in most countries including the US (ESIGN Act), EU (eIDAS Regulation), UK, India (IT Act), Canada, and Australia. Our tool creates legally valid electronic signatures.' },
                { q: 'Do you store my documents?', a: 'No. Your documents are processed entirely in your browser. We never upload, store, or access your files. Your privacy is guaranteed.' },
                { q: 'What file formats are supported?', a: 'We support PDF, Word (.doc, .docx), and common image formats (PNG, JPG). The output is always a clean, high-quality PDF.' },
                { q: 'Can I sign multiple pages?', a: 'Yes. Navigate between pages and place your signature, date, or text on any page of a multi-page document.' },
                { q: 'Why is this free when DocuSign charges $10/month?', a: 'We built this tool as part of our mission to make essential business tools free for everyone. We make money through our agency services, not through tool subscriptions.' },
                { q: 'Can I use this for business contracts?', a: 'Absolutely. Use it for contracts, NDAs, proposals, invoices, consent forms, and any other document that requires a signature.' },
                { q: 'Does this work on mobile phones?', a: 'Yes. The tool is fully responsive. You can draw your signature with your finger on any smartphone or tablet. No app download needed.' },
              ].map(faq => (
                <details key={faq.q} className="faq-item">
                  <summary>{faq.q}</summary>
                  <div className="faq-answer">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div style={{ textAlign: 'center', marginTop: '5rem', padding: '3rem', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '1rem' }}>
              Start Signing Documents <span style={{ color: 'var(--primary)' }}>For Free</span>
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
              No signup. No watermarks. No limits. Just sign.
            </p>
            <a href="https://sign.studiohappens.tech" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Open Signing Tool →
            </a>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Free Document Signing Tool",
        "applicationCategory": "BusinessApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "description": "Sign PDFs and documents online for free. No signup, no watermarks, legally binding."
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Is a document signed with this tool legally binding?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Electronic signatures are legally recognized under ESIGN Act (US), eIDAS (EU), and IT Act (India)." } },
          { "@type": "Question", "name": "Do you store my documents?", "acceptedAnswer": { "@type": "Answer", "text": "No. Documents are processed in your browser. We never upload or access your files." } },
          { "@type": "Question", "name": "Why is this free?", "acceptedAnswer": { "@type": "Answer", "text": "We make money through our agency, not tool subscriptions." } },
        ]
      }) }} />
    </div>
  )
}
