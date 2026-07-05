'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Message from ${formData.name} via Magic Signal`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:studiohappens26@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 5000)
  }

  return (
    <div className="animate-fade-in">
      <section style={{ padding: 'clamp(3rem, 8vw, 5rem) clamp(1rem, 3vw, 2rem)' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="section-header">
            <span className="pill">Get In Touch</span>
            <h1 className="section-title" style={{ marginTop: '1rem' }}>
              Let's <span style={{ color: 'var(--primary)' }}>Talk</span>
            </h1>
            <p className="section-subtitle">
              Have a question about our tools, want a custom solution, or just want to say hello? We'd love to hear from you.
            </p>
          </div>

          <div style={{
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            backgroundColor: 'var(--card-bg)',
          }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)' }}>Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)' }}>Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)' }}>Message *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you're looking for..."
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center', width: '100%' }}>
                  Send Message
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--muted)' }}>Your email client should have opened. We'll get back to you soon.</p>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
            <p>Or email us directly at <a href="mailto:studiohappens26@gmail.com" style={{ color: 'var(--primary)', fontWeight: '600' }}>studiohappens26@gmail.com</a></p>
          </div>
        </div>
      </section>
    </div>
  )
}
