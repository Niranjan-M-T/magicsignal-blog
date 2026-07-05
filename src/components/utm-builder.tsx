"use client"

import { useState, useMemo } from "react"
import { 
  Link2, QrCode, Copy, Check, Globe, Lock, CreditCard, Zap, ExternalLink, Code2
} from "lucide-react"
import Image from "next/image"

export function UtmBuilder() {
  const [url, setUrl] = useState("https://www.yourwebsite.com/page")
  const [source, setSource] = useState("google")
  const [medium, setMedium] = useState("cpc")
  const [campaign, setCampaign] = useState("summer_sale")
  const [term, setTerm] = useState("")
  const [content, setContent] = useState("")
  const [copied, setCopied] = useState(false)

  const generatedUrl = useMemo(() => {
    if (!url) return ""
    try {
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`)
      if (source) urlObj.searchParams.set("utm_source", source)
      if (medium) urlObj.searchParams.set("utm_medium", medium)
      if (campaign) urlObj.searchParams.set("utm_campaign", campaign)
      if (term) urlObj.searchParams.set("utm_term", term)
      if (content) urlObj.searchParams.set("utm_content", content)
      return urlObj.toString()
    } catch (e) {
      return "Invalid URL"
    }
  }, [url, source, medium, campaign, term, content])

  const qrUrl = useMemo(() => {
    if (!generatedUrl || generatedUrl === "Invalid URL") return null
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(generatedUrl)}&margin=10`
  }, [generatedUrl])

  const handleCopy = () => {
    if (!generatedUrl || generatedUrl === "Invalid URL") return
    navigator.clipboard.writeText(generatedUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const embedCode = `<div id="sh-utm-builder" data-theme="auto"></div>\n<script src="https://www.studiohappens.tech/embed/utm-builder.js" defer></script>`
  const [embedCopied, setEmbedCopied] = useState(false)
  const handleEmbedCopy = () => {
    navigator.clipboard.writeText(embedCode)
    setEmbedCopied(true)
    setTimeout(() => setEmbedCopied(false), 2000)
  }

  return (
    <div className="w-full">
      {/* ── Builder Card ── */}
      <div className="bg-white/70 dark:bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-black/5 dark:border-white/5 shadow-2xl shadow-black/5 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Link2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Campaign UTM Builder</h2>
                <p className="text-white/70 text-sm font-medium">Generate Tracking URLs & QR Codes Instantly</p>
              </div>
            </div>
            <p className="text-white/80 text-base md:text-lg max-w-2xl">
              Create perfectly tagged tracking links for Google Analytics 4. Ensure every click, campaign, and offline scan is accurately tracked.
            </p>
          </div>
        </div>

        <div className="p-6 md:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* ── Form Inputs ── */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-foreground/50 mb-2">
                  Website URL <span className="text-red-500">*</span>
                </label>
                <input 
                  type="url" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.example.com"
                  className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-foreground/50 mb-2">
                    Campaign Source <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="e.g. google, newsletter"
                    className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <p className="text-xs text-foreground/40 mt-2 font-medium">The referrer (e.g. google, facebook)</p>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-foreground/50 mb-2">
                    Campaign Medium <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={medium}
                    onChange={(e) => setMedium(e.target.value)}
                    placeholder="e.g. cpc, email, social"
                    className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <p className="text-xs text-foreground/40 mt-2 font-medium">Marketing medium (e.g. cpc, email)</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold uppercase tracking-wider text-foreground/50 mb-2">
                    Campaign Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={campaign}
                    onChange={(e) => setCampaign(e.target.value)}
                    placeholder="e.g. spring_sale_2026"
                    className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <p className="text-xs text-foreground/40 mt-2 font-medium">Product, promo code, or slogan</p>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-foreground/50 mb-2">
                    Campaign Term
                  </label>
                  <input 
                    type="text" 
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="e.g. running+shoes"
                    className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <p className="text-xs text-foreground/40 mt-2 font-medium">Identify paid keywords</p>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-foreground/50 mb-2">
                    Campaign Content
                  </label>
                  <input 
                    type="text" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="e.g. logolink, textlink"
                    className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <p className="text-xs text-foreground/40 mt-2 font-medium">Differentiate ads (A/B testing)</p>
                </div>
              </div>
            </div>

            {/* ── Output ── */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 rounded-2xl p-6 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/50 mb-4 flex items-center gap-2">
                    <Globe className="w-4 h-4" /> Generated URL
                  </h3>
                  <div className="bg-background rounded-xl p-4 border border-black/10 dark:border-white/10 relative group">
                    <p className="text-sm font-mono break-all text-foreground/80 leading-relaxed min-h-[4rem]">
                      {generatedUrl || "Fill in the required fields to generate your URL."}
                    </p>
                  </div>
                  <button 
                    onClick={handleCopy}
                    disabled={!generatedUrl || generatedUrl === "Invalid URL"}
                    className="w-full mt-3 py-3 rounded-xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied ? "Copied to Clipboard" : "Copy URL"}
                  </button>
                </div>

                <div className="mt-auto border-t border-black/5 dark:border-white/5 pt-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/50 mb-4 flex items-center gap-2">
                    <QrCode className="w-4 h-4" /> Print-Ready QR Code
                  </h3>
                  <div className="flex flex-col items-center justify-center">
                    {qrUrl ? (
                      <div className="bg-white p-3 rounded-2xl shadow-sm border border-black/5">
                        <Image src={qrUrl} alt="QR Code" width={180} height={180} className="w-48 h-48" unoptimized />
                      </div>
                    ) : (
                      <div className="w-48 h-48 bg-black/5 dark:bg-white/5 rounded-2xl flex items-center justify-center border border-black/10 dark:border-white/10 border-dashed">
                        <QrCode className="w-12 h-12 text-foreground/20" />
                      </div>
                    )}
                    <a 
                      href={qrUrl || "#"} 
                      download="campaign-qr-code.png"
                      className={`mt-4 text-sm font-bold tracking-wide uppercase ${qrUrl ? 'text-primary hover:text-primary/80' : 'text-foreground/30 cursor-not-allowed pointer-events-none'}`}
                    >
                      Download QR Code
                    </a>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ── Embed Section ── */}
      <div className="mt-16 bg-gradient-to-br from-black to-zinc-900 text-white rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(233,30,99,0.15),transparent_60%)]" />
        <div className="relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-primary bg-primary/10 rounded-full border border-primary/20 mb-6">
                Free for Everyone
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
                Add This UTM Builder<br />To <span className="text-primary">Your Website</span>
              </h3>
              <p className="text-white/60 text-lg mb-6 leading-relaxed">
                Embed this UTM Builder and QR Generator on your website for free. No signup, no login, no subscription required. 
                Perfect for marketing blogs, agencies, and resource pages.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/80 font-medium">100% Free — No hidden costs, no subscription</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/80 font-medium">Whitelabel Available — Add it to your agency website</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/80 font-medium">No Signup Required — Instant embed, zero friction</span>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold text-white/50 uppercase tracking-wider">Embed Code</span>
                  </div>
                  <button 
                    onClick={handleEmbedCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/20 hover:bg-primary/30 text-primary text-sm font-bold transition-all"
                  >
                    {embedCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {embedCopied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="text-sm text-green-400 font-mono bg-black/40 rounded-xl p-5 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
                  {embedCode}
                </pre>
              </div>

              <p className="text-white/30 text-xs mt-4 text-center">
                Paste this code anywhere in your HTML. The tool will render automatically.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
