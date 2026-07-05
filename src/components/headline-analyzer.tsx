"use client"

import { useState, useMemo } from "react"
import { PenTool, CheckCircle2, XCircle, Copy, Check, Globe, Lock, CreditCard, Code2, AlertCircle } from "lucide-react"

// Curated lists for scoring
const POWER_WORDS = new Set(["improve", "trust", "immediately", "discover", "profit", "learn", "understand", "powerful", "best", "greatest", "ultimate", "exclusive", "proven", "guaranteed", "free", "save", "easy", "simple", "secret", "new", "now", "bonus", "premium", "fast", "quick", "increase", "boost", "master"])
const EMOTIONAL_WORDS = new Set(["amazing", "awesome", "badass", "beautiful", "blissful", "brave", "breathtaking", "courageous", "dazzling", "delightful", "epic", "fearless", "gorgeous", "heartbreaking", "inspiring", "jaw-dropping", "magic", "mind-blowing", "miracle", "sensational", "spectacular", "stunning", "surprising", "terrific", "thrilling", "triumph", "unbelievable", "unforgettable", "wonderful", "warning", "beware", "danger", "scary", "shocking"])

function ScoreRing({ score, label }: { score: number; label: string }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 70 ? "#3b82f6" : score >= 50 ? "#f59e0b" : "#ef4444"

  return (
    <div className="relative flex items-center justify-center w-[130px] h-[130px] mx-auto">
      <svg width="130" height="130" viewBox="0 0 130 130" className="transform -rotate-90 absolute inset-0">
        <circle cx="65" cy="65" r={radius} fill="none" stroke="currentColor" strokeWidth="8" className="text-black/5 dark:text-white/5" />
        <circle cx="65" cy="65" r={radius} fill="none" stroke={color} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
      </svg>
      <div className="flex flex-col items-center justify-center z-10">
        <span className="text-4xl font-black leading-none" style={{ color }}>{Math.round(score)}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 mt-1 max-w-[80px] text-center leading-tight">{label}</span>
      </div>
    </div>
  )
}

function StatCard({ label, value, status, message }: { label: string; value: string | number; status: "good" | "bad" | "warning"; message: string }) {
  const colorClass = status === "good" ? "text-blue-500 bg-blue-500/10" : status === "warning" ? "text-amber-500 bg-amber-500/10" : "text-red-500 bg-red-500/10"
  const Icon = status === "good" ? CheckCircle2 : status === "warning" ? AlertCircle : XCircle

  return (
    <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-5 border border-black/5 dark:border-white/5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold uppercase tracking-wider text-foreground/50">{label}</span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-2xl font-black mb-2">{value}</p>
      <p className="text-xs font-medium text-foreground/50">{message}</p>
    </div>
  )
}

export function HeadlineAnalyzer() {
  const [headline, setHeadline] = useState("The Ultimate Guide to Boosting Your Marketing ROI Fast")

  const analysis = useMemo(() => {
    if (!headline.trim()) {
      return { score: 0, wordCount: 0, charCount: 0, powerWords: 0, emotionalWords: 0, lengthStatus: "bad", charStatus: "bad", powerStatus: "bad", emotionalStatus: "bad", hasNumber: false }
    }

    const words = headline.trim().split(/\s+/)
    const wordCount = words.length
    const charCount = headline.length

    let powerWords = 0
    let emotionalWords = 0
    let hasNumber = /\d/.test(headline)

    words.forEach(w => {
      const cleanWord = w.toLowerCase().replace(/[^a-z0-9]/g, '')
      if (POWER_WORDS.has(cleanWord)) powerWords++
      if (EMOTIONAL_WORDS.has(cleanWord)) emotionalWords++
    })

    let score = 0
    
    // Length scoring (ideal is 6-12 words)
    let lengthStatus: "good" | "bad" | "warning" = "warning"
    if (wordCount >= 6 && wordCount <= 12) { score += 30; lengthStatus = "good" }
    else if (wordCount >= 4 && wordCount <= 15) { score += 15; lengthStatus = "warning" }
    else { score += 5; lengthStatus = "bad" }

    // Character scoring (ideal is 50-70 characters)
    let charStatus: "good" | "bad" | "warning" = "warning"
    if (charCount >= 50 && charCount <= 70) { score += 20; charStatus = "good" }
    else if (charCount >= 30 && charCount <= 90) { score += 10; charStatus = "warning" }
    else { score += 0; charStatus = "bad" }

    // Power words scoring (ideal is 1-2)
    let powerStatus: "good" | "bad" | "warning" = "warning"
    if (powerWords >= 1) { score += 25; powerStatus = "good" }
    else { powerStatus = "bad" }

    // Emotional words scoring
    let emotionalStatus: "good" | "bad" | "warning" = "warning"
    if (emotionalWords >= 1) { score += 15; emotionalStatus = "good" }
    else { emotionalStatus = "bad" }

    // Numbers boost
    if (hasNumber) { score += 10 }

    score = Math.min(100, Math.max(0, score))

    return { score, wordCount, charCount, powerWords, emotionalWords, lengthStatus, charStatus, powerStatus, emotionalStatus, hasNumber }
  }, [headline])

  const embedCode = `<div id="sh-headline-analyzer" data-theme="auto"></div>\n<script src="https://www.studiohappens.tech/embed/headline-analyzer.js" defer></script>`
  const [embedCopied, setEmbedCopied] = useState(false)
  const handleEmbedCopy = () => {
    navigator.clipboard.writeText(embedCode)
    setEmbedCopied(true)
    setTimeout(() => setEmbedCopied(false), 2000)
  }

  return (
    <div className="w-full">
      <div className="bg-white/70 dark:bg-white/5 backdrop-blur-2xl rounded-[2rem] border border-black/5 dark:border-white/5 shadow-2xl shadow-black/5 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <PenTool className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tight">Headline Analyzer</h2>
                <p className="text-white/70 text-sm font-medium">Write Copy That Converts</p>
              </div>
            </div>
            <p className="text-white/80 text-base md:text-lg max-w-2xl">
              Score your headlines based on emotional impact, readability, and proven copywriting formulas. Get instant feedback to increase your click-through rates.
            </p>
          </div>
        </div>

        <div className="p-6 md:p-10 lg:p-12">
          
          <div className="mb-10 relative">
            <textarea 
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Type your headline here..."
              rows={3}
              className="w-full px-6 py-6 rounded-[2rem] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-2xl md:text-3xl font-black focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none shadow-inner"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Score Ring */}
            <div className="flex flex-col items-center justify-center bg-black/[0.02] dark:bg-white/[0.02] rounded-2xl p-8 relative border border-black/5 dark:border-white/5">
              <ScoreRing score={analysis.score} label="Headline Score" />
              <p className="text-sm text-foreground/50 mt-6 text-center font-medium max-w-[200px]">
                {analysis.score >= 70 ? "Excellent! Your headline is optimized for clicks." : analysis.score >= 50 ? "Good, but could use more emotional or power words." : "Needs improvement. Try adding power words or numbers."}
              </p>
            </div>

            {/* Metrics */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard 
                label="Word Count" 
                value={analysis.wordCount} 
                status={analysis.lengthStatus as any} 
                message={analysis.lengthStatus === "good" ? "Perfect length (6-12 words)" : "Aim for 6-12 words for best CTR"} 
              />
              <StatCard 
                label="Character Count" 
                value={analysis.charCount} 
                status={analysis.charStatus as any} 
                message={analysis.charStatus === "good" ? "Optimal length (50-70 chars)" : "Aim for 50-70 characters"} 
              />
              <StatCard 
                label="Power Words" 
                value={analysis.powerWords} 
                status={analysis.powerStatus as any} 
                message={analysis.powerWords > 0 ? "Great use of power words" : "Add power words to command attention"} 
              />
              <StatCard 
                label="Emotional Words" 
                value={analysis.emotionalWords} 
                status={analysis.emotionalStatus as any} 
                message={analysis.emotionalWords > 0 ? "Strong emotional hook" : "Add emotion to drive action"} 
              />
            </div>
          </div>

        </div>
      </div>

      {/* ── Embed Section ── */}
      <div className="mt-16 bg-gradient-to-br from-black to-zinc-900 text-white rounded-[2rem] p-8 md:p-12 lg:p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-blue-500 bg-blue-500/10 rounded-full border border-blue-500/20 mb-6">
                Free for Everyone
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-6">
                Add This Analyzer<br />To <span className="text-blue-500">Your Website</span>
              </h3>
              <p className="text-white/60 text-lg mb-6 leading-relaxed">
                Embed this Headline Analyzer on your website for free. No signup, no login, no subscription required. 
                Perfect for content agencies, bloggers, and marketing sites.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Lock className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-white/80 font-medium">100% Free — No hidden costs, no subscription</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-white/80 font-medium">Whitelabel Available — Add it to your agency website</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="text-white/80 font-medium">No Signup Required — Instant embed, zero friction</span>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-bold text-white/50 uppercase tracking-wider">Embed Code</span>
                  </div>
                  <button 
                    onClick={handleEmbedCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-500 text-sm font-bold transition-all"
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
