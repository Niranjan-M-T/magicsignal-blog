"use client"

import { useState } from "react"
import { Search, Monitor, Smartphone, Globe, Lock, CreditCard, Code2, Copy, Check, Info } from "lucide-react"
import Image from "next/image"

export function SerpPreview() {
  const [url, setUrl] = useState("https://www.yourwebsite.com/page")
  const [title, setTitle] = useState("Your Perfect Page Title | Brand Name")
  const [description, setDescription] = useState("Write a compelling meta description here. Make sure it accurately describes your page content and includes a clear call to action for users searching.")
  const [view, setView] = useState<"desktop" | "mobile">("desktop")

  const titleLimit = 60
  const titleChars = title.length
  const titleColor = titleChars === 0 ? "text-foreground/50" : titleChars <= titleLimit ? "text-emerald-500" : "text-red-500"

  const descLimit = 160
  const descChars = description.length
  const descColor = descChars === 0 ? "text-foreground/50" : descChars <= descLimit ? "text-emerald-500" : "text-red-500"

  const embedCode = `<div id="sh-serp-preview" data-theme="auto"></div>\n<script src="https://www.studiohappens.tech/embed/serp-preview.js" defer></script>`
  const [embedCopied, setEmbedCopied] = useState(false)
  const handleEmbedCopy = () => {
    navigator.clipboard.writeText(embedCode)
    setEmbedCopied(true)
    setTimeout(() => setEmbedCopied(false), 2000)
  }

  // Format URL for Google SERP
  const formattedUrl = url.replace(/^https?:\/\/(www\.)?/, "")
  const breadcrumbs = formattedUrl.split('/').filter(Boolean)
  const domain = breadcrumbs[0] || "example.com"
  const path = breadcrumbs.slice(1).join(" › ")

  return (
    <div className="w-full">
      <div className="bg-white/70 dark:bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-black/5 dark:border-white/5 shadow-2xl shadow-black/5 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">SEO SERP Preview Tool</h2>
                <p className="text-white/70 text-sm font-medium">Visualize Your Google Search Results</p>
              </div>
            </div>
            <p className="text-white/80 text-base md:text-lg max-w-2xl">
              See exactly how your web pages will appear in Google search results. Optimize your title tags and meta descriptions to maximize click-through rates.
            </p>
          </div>
        </div>

        <div className="p-6 md:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            
            {/* ── Editor ── */}
            <div className="space-y-8">
              
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-foreground/50 mb-2">
                  Page URL
                </label>
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.example.com/page"
                  className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-foreground/50">
                    Title Tag
                  </label>
                  <span className={`text-xs font-bold ${titleColor}`}>
                    {titleChars} / {titleLimit}
                  </span>
                </div>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Your Page Title | Brand Name"
                  className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                />
                <div className="w-full h-1 bg-black/5 dark:bg-white/5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${titleChars > titleLimit ? 'bg-red-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(100, (titleChars / titleLimit) * 100)}%` }}
                  />
                </div>
                {titleChars > titleLimit && (
                  <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1">
                    <Info className="w-3 h-3" /> Title is too long and may be truncated by Google.
                  </p>
                )}
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-foreground/50">
                    Meta Description
                  </label>
                  <span className={`text-xs font-bold ${descColor}`}>
                    {descChars} / {descLimit}
                  </span>
                </div>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a compelling meta description..."
                  rows={4}
                  className="w-full px-5 py-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none"
                />
                <div className="w-full h-1 bg-black/5 dark:bg-white/5 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 ${descChars > descLimit ? 'bg-red-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min(100, (descChars / descLimit) * 100)}%` }}
                  />
                </div>
                {descChars > descLimit && (
                  <p className="text-xs text-red-500 mt-2 font-medium flex items-center gap-1">
                    <Info className="w-3 h-3" /> Description is too long and may be truncated.
                  </p>
                )}
              </div>
            </div>

            {/* ── Preview ── */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-6 bg-black/5 dark:bg-white/5 p-1 rounded-xl w-max self-center lg:self-start">
                <button 
                  onClick={() => setView("desktop")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === "desktop" ? "bg-white dark:bg-black shadow-sm text-emerald-600 dark:text-emerald-400" : "text-foreground/50 hover:text-foreground"}`}
                >
                  <Monitor className="w-4 h-4" /> Desktop
                </button>
                <button 
                  onClick={() => setView("mobile")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === "mobile" ? "bg-white dark:bg-black shadow-sm text-emerald-600 dark:text-emerald-400" : "text-foreground/50 hover:text-foreground"}`}
                >
                  <Smartphone className="w-4 h-4" /> Mobile
                </button>
              </div>

              <div className="bg-[#f8f9fa] dark:bg-[#202124] rounded-2xl border border-[#dfe1e5] dark:border-[#3c4043] p-6 h-full font-sans flex items-start justify-center shadow-inner overflow-hidden">
                
                {view === "desktop" ? (
                  // Desktop Google Search Result Preview
                  <div className="w-full max-w-[600px] text-left">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-7 h-7 rounded-full bg-[#f1f3f4] dark:bg-[#303134] flex items-center justify-center shrink-0 border border-black/5 dark:border-white/5">
                        <Globe className="w-4 h-4 text-[#70757a] dark:text-[#bdc1c6]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-[#202124] dark:text-[#dadce0] font-medium leading-none">{domain}</span>
                        <span className="text-xs text-[#4d5156] dark:text-[#bdc1c6] leading-none mt-1">https://{url.replace(/^https?:\/\//, "")}</span>
                      </div>
                    </div>
                    <h3 className="text-xl text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer font-medium leading-tight mb-1" style={{ wordWrap: "break-word" }}>
                      {title || "Untitled Document"}
                    </h3>
                    <p className="text-sm text-[#4d5156] dark:text-[#bdc1c6] leading-[1.58] break-words">
                      {description.length > descLimit ? description.substring(0, descLimit) + "..." : description}
                    </p>
                  </div>
                ) : (
                  // Mobile Google Search Result Preview
                  <div className="w-[375px] shrink-0 bg-white dark:bg-[#202124] p-4 rounded-xl shadow-md border border-[#dfe1e5] dark:border-[#3c4043]">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-7 h-7 rounded-full bg-[#f1f3f4] dark:bg-[#303134] flex items-center justify-center shrink-0">
                        <Globe className="w-4 h-4 text-[#70757a] dark:text-[#bdc1c6]" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-[#202124] dark:text-[#dadce0] font-medium leading-none">{domain}</span>
                        <span className="text-xs text-[#70757a] dark:text-[#9aa0a6] leading-none mt-1">{url.replace(/^https?:\/\/(www\.)?/, "")}</span>
                      </div>
                    </div>
                    <h3 className="text-lg text-[#1558d6] dark:text-[#8ab4f8] font-medium leading-[1.3] mb-2" style={{ wordWrap: "break-word" }}>
                      {title || "Untitled Document"}
                    </h3>
                    <p className="text-sm text-[#4d5156] dark:text-[#bdc1c6] leading-[1.5] break-words">
                      {description.length > descLimit ? description.substring(0, descLimit) + "..." : description}
                    </p>
                  </div>
                )}
                
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Embed Section ── */}
      <div className="mt-16 bg-gradient-to-br from-black to-zinc-900 text-white rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.15),transparent_60%)]" />
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-emerald-500 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-6">
                Free for Everyone
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
                Add This SERP Preview<br />To <span className="text-emerald-500">Your Website</span>
              </h3>
              <p className="text-white/60 text-lg mb-6 leading-relaxed">
                Embed this SEO SERP Preview tool on your website for free. No signup, no login, no subscription required. 
                Perfect for SEO agencies, bloggers, and marketing sites.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-white/80 font-medium">100% Free — No hidden costs, no subscription</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-white/80 font-medium">Whitelabel Available — Add it to your agency website</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="text-white/80 font-medium">No Signup Required — Instant embed, zero friction</span>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-bold text-white/50 uppercase tracking-wider">Embed Code</span>
                  </div>
                  <button 
                    onClick={handleEmbedCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500 text-sm font-bold transition-all"
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
