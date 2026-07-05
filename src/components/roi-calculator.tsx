"use client"

import { useState, useMemo } from "react"
import { 
  Calculator, TrendingUp, DollarSign, Target, BarChart3, 
  Percent, ArrowRight, Code2, Globe, Zap, Lock, CreditCard,
  Copy, Check, ExternalLink, AlertCircle, Settings2, MousePointerClick, RefreshCcw, Briefcase, ShoppingBag, AlertTriangle, ShieldCheck
} from "lucide-react"

// ─── Currency & Number Formatters ──────────────────────────
function formatCurrency(value: number, currency: string = "₹"): string {
  if (!isFinite(value) || isNaN(value)) return `${currency}0`
  if (value >= 10000000) return `${currency}${(value / 10000000).toFixed(2)}Cr`
  if (value >= 100000) return `${currency}${(value / 100000).toFixed(2)}L`
  if (value >= 1000) return `${currency}${(value / 1000).toFixed(1)}K`
  return `${currency}${Math.round(value).toLocaleString("en-IN")}`
}

function formatNumber(value: number): string {
  if (!isFinite(value) || isNaN(value)) return "0"
  return Math.round(value).toLocaleString("en-IN")
}

// ─── Main Calculator ───────────────────────────────────────
export function RoiCalculator() {
  const [mode, setMode] = useState<"product" | "service">("product")
  const [advancedMode, setAdvancedMode] = useState(false)
  const [copied, setCopied] = useState(false)

  // -- PRODUCT (E-Commerce) INPUTS --
  const [pRevGoal, setPRevGoal] = useState(1000000)
  const [pPrice, setPPrice] = useState(2000)
  const [pProfit, setPProfit] = useState(800)
  
  // -- SERVICE (Lead Gen) INPUTS --
  const [sRevGoal, setSRevGoal] = useState(1000000)
  const [sDealSize, setSDealSize] = useState(50000)
  const [sCpl, setSCpl] = useState(500)
  const [sLeadsSample, setSLeadsSample] = useState(100)
  const [sClosedSample, setSClosedSample] = useState(5)

  // -- ADVANCED INPUTS --
  const [agencyFee, setAgencyFee] = useState(25000)
  const [ltv, setLtv] = useState(0) // 0 means not set
  const [cpc, setCpc] = useState(15)
  const [cvr, setCvr] = useState(2.5) // E-com website CVR
  const [lpCvr, setLpCvr] = useState(10) // Service Landing Page CVR

  // ─── CALCULATE PRODUCT (E-COMMERCE) ──────────────────────
  const productResults = useMemo(() => {
    // Step 1 — Profit Margin
    const margin = pPrice > 0 ? pProfit / pPrice : 0
    
    // Step 2 — Breakeven ROAS
    const breakevenROAS = margin > 0 ? 1 / margin : Infinity
    
    // Step 3 — Target ROAS range
    const targetROAS_low = breakevenROAS * 1.5
    const targetROAS_high = breakevenROAS * 2.0
    
    // Step 4 — Units needed
    const units = pPrice > 0 ? Math.ceil(pRevGoal / pPrice) : 0
    
    // Step 5 — Ad spend range
    const spend_low = targetROAS_high > 0 ? pRevGoal / targetROAS_high : 0
    const spend_high = targetROAS_low > 0 ? pRevGoal / targetROAS_low : 0
    
    // Step 6 — Daily spend
    const daily_low = spend_low / 30
    const daily_high = spend_high / 30

    // Warnings
    const isThinMargin = margin > 0 && margin < 0.15
    const isInvalidInput = pProfit >= pPrice
    const marginWarning = isInvalidInput 
      ? "Invalid Input: Profit cannot be greater than or equal to Price."
      : isThinMargin 
        ? "Thin Margin Warning: With margins <15%, ad spend efficiency must be extremely high." 
        : null

    // Advanced Metrics
    let actualRoas = 0
    let actualCpa = 0
    let ltvRevenue = 0
    if (advancedMode && cpc > 0 && cvr > 0) {
      // Projected CPA based on CPC and CVR
      actualCpa = cpc / (cvr / 100)
      // Projected ROAS = Price / Actual CPA
      actualRoas = actualCpa > 0 ? pPrice / actualCpa : 0
      
      if (ltv > 0) {
        ltvRevenue = units * ltv
      }
    }

    return {
      margin,
      breakevenROAS,
      targetROAS_low,
      targetROAS_high,
      units,
      spend_low,
      spend_high,
      daily_low,
      daily_high,
      isThinMargin,
      isInvalidInput,
      marginWarning,
      actualCpa,
      actualRoas,
      ltvRevenue
    }
  }, [pRevGoal, pPrice, pProfit, advancedMode, cpc, cvr, ltv])

  // ─── CALCULATE SERVICE (LEAD GEN) ────────────────────────
  const serviceResults = useMemo(() => {
    // Advanced Mode Override for CPL
    const effectiveCpl = (advancedMode && cpc > 0 && lpCvr > 0) ? (cpc / (lpCvr / 100)) : sCpl

    // Step 1 — Close rate
    const closeRate = sLeadsSample > 0 ? sClosedSample / sLeadsSample : 0
    
    // Step 2 — Leads needed
    const leadsNeeded = (sDealSize > 0 && closeRate > 0) ? Math.ceil(sRevGoal / (sDealSize * closeRate)) : 0
    
    // Step 3 — Cost to acquire one customer (CAC)
    const cac = closeRate > 0 ? effectiveCpl / closeRate : Infinity
    
    // Step 4 — CAC as % of deal size
    const cacPercent = sDealSize > 0 ? (cac / sDealSize) * 100 : Infinity
    
    // Step 5 — Base monthly ad spend
    const baseSpend = leadsNeeded * effectiveCpl
    
    // Step 6 — Buffered spend range (learning-phase cushion)
    const spend_low = baseSpend * 1.2
    const spend_high = baseSpend * 1.3
    const daily_low = spend_low / 30
    const daily_high = spend_high / 30

    // Health Badge Logic
    let healthStatus: "healthy" | "watch" | "danger" = "healthy"
    let healthLabel = "Healthy"
    if (cacPercent > 25) {
      healthStatus = "danger"
      healthLabel = "High CAC Warning"
    } else if (cacPercent >= 10) {
      healthStatus = "watch"
      healthLabel = "Watch Closely"
    }

    const isSmallSample = sLeadsSample < 20
    const sampleWarning = isSmallSample ? "Small Sample Size: Historical leads < 20 reduces accuracy." : null

    // Advanced Metrics
    let ltvRevenue = 0
    let ltvNetProfit = 0
    if (advancedMode && ltv > 0) {
      const customers = Math.ceil(sRevGoal / sDealSize)
      ltvRevenue = customers * ltv
      // Gross Profit assuming 100% margin for service, minus agency fee
      ltvNetProfit = ltvRevenue - spend_high - agencyFee
    }

    return {
      closeRate,
      leadsNeeded,
      cac,
      cacPercent,
      baseSpend,
      spend_low,
      spend_high,
      daily_low,
      daily_high,
      healthStatus,
      healthLabel,
      sampleWarning,
      effectiveCpl,
      ltvRevenue,
      ltvNetProfit
    }
  }, [sRevGoal, sDealSize, sCpl, sLeadsSample, sClosedSample, advancedMode, cpc, lpCvr, ltv, agencyFee])

  const copyEmbedCode = () => {
    const embedCode = `<iframe src="https://studiohappens.tech/embed/roi-calculator" width="100%" height="900" style="border:none;border-radius:12px;overflow:hidden;"></iframe><div style="text-align:center;font-family:sans-serif;font-size:12px;margin-top:8px;"><a href="https://studiohappens.tech/tools/roi-calculator" target="_blank" style="color:#E91E63;text-decoration:none;">Free Ad Spend Forecaster by Studio Happens</a></div>`
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      
      {/* ─── TOP BAR: TABS & ADVANCED TOGGLE ─── */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/50 dark:bg-white/5 p-2 rounded-3xl border border-black/5 dark:border-white/5 backdrop-blur-xl shadow-lg">
        
        {/* Mode Switcher */}
        <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-full w-full md:w-auto relative">
          <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-black/50 rounded-full shadow transition-all duration-300 ease-out ${mode === "service" ? "left-[calc(50%+2px)]" : "left-1"}`} />
          <button 
            onClick={() => setMode("product")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold z-10 transition-colors ${mode === "product" ? "text-primary" : "text-foreground/60 hover:text-foreground"}`}
          >
            <ShoppingBag className="w-4 h-4" /> Product (D2C)
          </button>
          <button 
            onClick={() => setMode("service")}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold z-10 transition-colors ${mode === "service" ? "text-primary" : "text-foreground/60 hover:text-foreground"}`}
          >
            <Briefcase className="w-4 h-4" /> Service (B2B)
          </button>
        </div>

        {/* Advanced Toggle */}
        <div className="px-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <Settings2 className={`w-4 h-4 ${advancedMode ? 'text-primary' : 'text-foreground/50'}`} />
            <span className={`text-sm font-bold tracking-wide uppercase ${advancedMode ? 'text-primary' : 'text-foreground/50'}`}>
              Advanced Mode
            </span>
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={advancedMode} onChange={(e) => setAdvancedMode(e.target.checked)} />
              <div className={`block w-10 h-6 rounded-full transition-colors ${advancedMode ? 'bg-primary' : 'bg-black/20 dark:bg-white/20'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${advancedMode ? 'transform translate-x-4' : ''}`}></div>
            </div>
          </label>
        </div>
      </div>

      {/* ─── MAIN GRID ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ─── LEFT PANEL: INPUTS ─── */}
        <div className="lg:col-span-5 bg-white/50 dark:bg-white/5 rounded-[2rem] p-6 md:p-8 border border-black/5 dark:border-white/5 shadow-xl backdrop-blur-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                {mode === "product" ? "E-Commerce Metrics" : "Lead Gen Metrics"}
              </h2>
              <p className="text-sm text-foreground/50 font-medium">Work backwards from your goal</p>
            </div>
          </div>

          {/* === PRODUCT INPUTS === */}
          {mode === "product" && (
            <div className="space-y-6">
              {/* Revenue Goal */}
              <div>
                <label className="text-sm font-bold text-foreground/70 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" /> Monthly Revenue Goal
                </label>
                <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-xl px-4 py-3 border border-black/5 dark:border-white/5 focus-within:border-primary/50 transition-colors">
                  <span className="text-sm font-bold text-foreground/50">₹</span>
                  <input type="number" value={pRevGoal} onChange={(e) => setPRevGoal(Number(e.target.value))} className="bg-transparent w-full text-lg font-black text-foreground focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Product Price */}
                <div>
                  <label className="text-sm font-bold text-foreground/70 mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" /> Sale Price
                  </label>
                  <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-xl px-4 py-3 border border-black/5 dark:border-white/5 focus-within:border-primary/50 transition-colors">
                    <span className="text-sm font-bold text-foreground/50">₹</span>
                    <input type="number" value={pPrice} onChange={(e) => setPPrice(Number(e.target.value))} className="bg-transparent w-full text-lg font-black text-foreground focus:outline-none" />
                  </div>
                </div>
                {/* Profit Per Sale */}
                <div>
                  <label className="text-sm font-bold text-foreground/70 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" /> Profit / Sale
                  </label>
                  <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-xl px-4 py-3 border border-black/5 dark:border-white/5 focus-within:border-primary/50 transition-colors">
                    <span className="text-sm font-bold text-foreground/50">₹</span>
                    <input type="number" value={pProfit} onChange={(e) => setPProfit(Number(e.target.value))} className="bg-transparent w-full text-lg font-black text-foreground focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* === SERVICE INPUTS === */}
          {mode === "service" && (
            <div className="space-y-6">
              {/* Revenue Goal */}
              <div>
                <label className="text-sm font-bold text-foreground/70 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" /> Monthly Revenue Goal
                </label>
                <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-xl px-4 py-3 border border-black/5 dark:border-white/5 focus-within:border-primary/50 transition-colors">
                  <span className="text-sm font-bold text-foreground/50">₹</span>
                  <input type="number" value={sRevGoal} onChange={(e) => setSRevGoal(Number(e.target.value))} className="bg-transparent w-full text-lg font-black text-foreground focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Deal Size */}
                <div>
                  <label className="text-sm font-bold text-foreground/70 mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary" /> Avg Deal Size
                  </label>
                  <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-xl px-4 py-3 border border-black/5 dark:border-white/5 focus-within:border-primary/50 transition-colors">
                    <span className="text-sm font-bold text-foreground/50">₹</span>
                    <input type="number" value={sDealSize} onChange={(e) => setSDealSize(Number(e.target.value))} className="bg-transparent w-full text-lg font-black text-foreground focus:outline-none" />
                  </div>
                </div>
                {/* CPL */}
                <div>
                  <label className="text-sm font-bold text-foreground/70 mb-2 flex items-center gap-2">
                    <MousePointerClick className="w-4 h-4 text-primary" /> Cost Per Lead
                  </label>
                  <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-xl px-4 py-3 border border-black/5 dark:border-white/5 focus-within:border-primary/50 transition-colors opacity-100">
                    <span className="text-sm font-bold text-foreground/50">₹</span>
                    <input 
                      type="number" 
                      value={advancedMode ? serviceResults.effectiveCpl : sCpl} 
                      onChange={(e) => !advancedMode && setSCpl(Number(e.target.value))} 
                      disabled={advancedMode}
                      className={`bg-transparent w-full text-lg font-black focus:outline-none ${advancedMode ? "text-primary" : "text-foreground"}`} 
                    />
                  </div>
                  {advancedMode && <p className="text-[10px] text-foreground/50 mt-1">Calculated from CPC & LP CVR</p>}
                </div>
              </div>

              <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/5">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground/50 mb-4">Historical Close Rate</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-foreground/60 mb-1 block">Leads Generated</label>
                    <input type="number" value={sLeadsSample} onChange={(e) => setSLeadsSample(Number(e.target.value))} className="bg-white dark:bg-black/20 w-full rounded-lg px-3 py-2 text-sm font-black focus:outline-none border border-black/5 dark:border-white/5" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-foreground/60 mb-1 block">Deals Closed</label>
                    <input type="number" value={sClosedSample} onChange={(e) => setSClosedSample(Number(e.target.value))} className="bg-white dark:bg-black/20 w-full rounded-lg px-3 py-2 text-sm font-black focus:outline-none border border-black/5 dark:border-white/5" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* === ADVANCED INPUTS === */}
          {advancedMode && (
            <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 animate-in fade-in slide-in-from-top-4">
              <div className="flex items-center gap-2 mb-4">
                <Settings2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold uppercase tracking-wider text-primary">Advanced Features</span>
              </div>
              
              <div className="space-y-4">
                {/* Global Advanced: Agency Fee & LTV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground/60 mb-1 uppercase tracking-wider">Agency Fee / Mo</label>
                    <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-xl px-3 py-2.5 border border-black/5 dark:border-white/5">
                      <span className="text-sm font-bold text-foreground/40">₹</span>
                      <input type="number" value={agencyFee} onChange={(e) => setAgencyFee(Number(e.target.value))} className="bg-transparent w-full font-black focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground/60 mb-1 uppercase tracking-wider">Lifetime Value (LTV)</label>
                    <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-xl px-3 py-2.5 border border-black/5 dark:border-white/5">
                      <span className="text-sm font-bold text-foreground/40">₹</span>
                      <input type="number" value={ltv} onChange={(e) => setLtv(Number(e.target.value))} className="bg-transparent w-full font-black focus:outline-none" />
                    </div>
                  </div>
                </div>

                {/* Mode Specific Advanced: CPC & CVR */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground/60 mb-1 uppercase tracking-wider">Avg CPC</label>
                    <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-xl px-3 py-2.5 border border-black/5 dark:border-white/5">
                      <span className="text-sm font-bold text-foreground/40">₹</span>
                      <input type="number" value={cpc} onChange={(e) => setCpc(Number(e.target.value))} step="0.5" className="bg-transparent w-full font-black focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground/60 mb-1 uppercase tracking-wider">
                      {mode === "product" ? "Conv. Rate" : "Landing Page CVR"}
                    </label>
                    <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 rounded-xl px-3 py-2.5 border border-black/5 dark:border-white/5">
                      <input type="number" value={mode === "product" ? cvr : lpCvr} onChange={(e) => mode === "product" ? setCvr(Number(e.target.value)) : setLpCvr(Number(e.target.value))} step="0.1" className="bg-transparent w-full font-black focus:outline-none" />
                      <span className="text-sm font-bold text-foreground/40">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ─── RIGHT PANEL: RESULTS ─── */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* === PRODUCT RESULTS === */}
          {mode === "product" && (
            <>
              {productResults.marginWarning && (
                <div className={`p-4 rounded-xl border flex items-start gap-3 ${productResults.isInvalidInput ? "bg-red-500/10 border-red-500/20 text-red-600" : "bg-amber-500/10 border-amber-500/20 text-amber-600"}`}>
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium leading-relaxed">{productResults.marginWarning}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Break-Even ROAS */}
                <div className="bg-white/50 dark:bg-white/5 rounded-[2rem] p-6 border border-black/5 dark:border-white/5 shadow-lg flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2" />
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wider text-foreground/50 mb-1">Break-Even ROAS</p>
                  <h3 className="text-5xl font-black text-primary tracking-tight">
                    {productResults.breakevenROAS === Infinity ? "N/A" : `${productResults.breakevenROAS.toFixed(2)}x`}
                  </h3>
                  <p className="text-xs font-medium text-foreground/50 mt-3 max-w-[200px]">
                    Minimum return needed to cover COGS & ad spend.
                  </p>
                </div>

                {/* Spend Range */}
                <div className="bg-primary text-primary-foreground rounded-[2rem] p-6 shadow-xl flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2" />
                  <p className="text-sm font-bold uppercase tracking-wider text-primary-foreground/70 mb-2">Required Ad Spend</p>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                    {formatCurrency(productResults.spend_low)} <span className="text-lg md:text-xl font-bold text-primary-foreground/60 mx-1">to</span> {formatCurrency(productResults.spend_high)}
                  </h3>
                  <p className="text-xs font-medium text-primary-foreground/80 leading-relaxed max-w-[220px]">
                    Targeting {productResults.targetROAS_low.toFixed(1)}x to {productResults.targetROAS_high.toFixed(1)}x ROAS to hit your {formatCurrency(pRevGoal)} goal.
                  </p>
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 mb-1">Profit Margin</p>
                  <p className="text-xl font-black">{(productResults.margin * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 mb-1">Units Needed</p>
                  <p className="text-xl font-black">{formatNumber(productResults.units)}</p>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 mb-1">Daily Budget (Low)</p>
                  <p className="text-xl font-black">{formatCurrency(productResults.daily_low)}</p>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 mb-1">Daily Budget (High)</p>
                  <p className="text-xl font-black">{formatCurrency(productResults.daily_high)}</p>
                </div>
              </div>

              {/* Advanced Product Outputs */}
              {advancedMode && (
                <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-6 border border-black/5 dark:border-white/5 mt-6 animate-in fade-in">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/50 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Projected Funnel Performance
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <p className="text-[10px] font-bold text-foreground/50 mb-1 uppercase">Projected CPA</p>
                      <p className="text-2xl font-black text-foreground">{formatCurrency(productResults.actualCpa)}</p>
                      <p className="text-[10px] text-foreground/40 mt-1">Based on {cpc} CPC & {cvr}% CVR</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-foreground/50 mb-1 uppercase">Projected ROAS</p>
                      <p className={`text-2xl font-black ${productResults.actualRoas >= productResults.breakevenROAS ? "text-emerald-500" : "text-red-500"}`}>
                        {productResults.actualRoas.toFixed(2)}x
                      </p>
                      <p className="text-[10px] text-foreground/40 mt-1">
                        {productResults.actualRoas >= productResults.breakevenROAS ? "Profitable" : "Unprofitable (Below Break-Even)"}
                      </p>
                    </div>
                    {ltv > 0 && (
                      <div>
                        <p className="text-[10px] font-bold text-foreground/50 mb-1 uppercase">Lifetime Cohort Revenue</p>
                        <p className="text-2xl font-black text-primary">{formatCurrency(productResults.ltvRevenue)}</p>
                        <p className="text-[10px] text-foreground/40 mt-1">LTV value of {formatNumber(productResults.units)} units</p>
                      </div>
                    )}
                  </div>
                  {agencyFee > 0 && (
                    <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10 text-xs font-medium text-foreground/60 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      Remember to factor your {formatCurrency(agencyFee)} agency fee into your total Break-Even math.
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* === SERVICE RESULTS === */}
          {mode === "service" && (
            <>
              {serviceResults.sampleWarning && (
                <div className="p-4 rounded-xl border bg-amber-500/10 border-amber-500/20 text-amber-600 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium leading-relaxed">{serviceResults.sampleWarning}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Health Badge */}
                <div className="bg-white/50 dark:bg-white/5 rounded-[2rem] p-6 border border-black/5 dark:border-white/5 shadow-lg flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2 ${
                    serviceResults.healthStatus === "healthy" ? "bg-emerald-500/10" : 
                    serviceResults.healthStatus === "watch" ? "bg-amber-500/10" : "bg-red-500/10"
                  }`} />
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    serviceResults.healthStatus === "healthy" ? "bg-emerald-500/10 text-emerald-500" : 
                    serviceResults.healthStatus === "watch" ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                  }`}>
                    {serviceResults.healthStatus === "healthy" ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wider text-foreground/50 mb-1">Funnel Health</p>
                  <h3 className={`text-3xl font-black tracking-tight ${
                    serviceResults.healthStatus === "healthy" ? "text-emerald-500" : 
                    serviceResults.healthStatus === "watch" ? "text-amber-500" : "text-red-500"
                  }`}>
                    {serviceResults.healthLabel}
                  </h3>
                  <p className="text-xs font-medium text-foreground/50 mt-3 max-w-[200px]">
                    CAC is {(serviceResults.cacPercent).toFixed(1)}% of Deal Size.
                  </p>
                </div>

                {/* Buffered Spend */}
                <div className="bg-primary text-primary-foreground rounded-[2rem] p-6 shadow-xl flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2" />
                  <p className="text-sm font-bold uppercase tracking-wider text-primary-foreground/70 mb-2">Buffered Ad Spend</p>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
                    {formatCurrency(serviceResults.spend_low)} <span className="text-lg md:text-xl font-bold text-primary-foreground/60 mx-1">to</span> {formatCurrency(serviceResults.spend_high)}
                  </h3>
                  <p className="text-xs font-medium text-primary-foreground/80 leading-relaxed max-w-[220px]">
                    Includes a 20-30% buffer to account for learning phases and variance. Base spend: {formatCurrency(serviceResults.baseSpend)}.
                  </p>
                </div>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 mb-1">Close Rate</p>
                  <p className="text-xl font-black">{(serviceResults.closeRate * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 mb-1">Leads Needed</p>
                  <p className="text-xl font-black">{formatNumber(serviceResults.leadsNeeded)}</p>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 mb-1">Target CAC</p>
                  <p className="text-xl font-black">{formatCurrency(serviceResults.cac)}</p>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 mb-1">Daily Spend (High)</p>
                  <p className="text-xl font-black">{formatCurrency(serviceResults.daily_high)}</p>
                </div>
              </div>

              {/* Advanced Service Outputs */}
              {advancedMode && (
                <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-6 border border-black/5 dark:border-white/5 mt-6 animate-in fade-in">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/50 mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Lifetime Value Metrics
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {ltv > 0 ? (
                      <>
                        <div className="bg-white/50 dark:bg-white/5 rounded-xl p-4 border border-black/5 dark:border-white/5">
                          <p className="text-[10px] font-bold text-foreground/50 mb-1 uppercase">LTV Cohort Revenue</p>
                          <p className="text-3xl font-black text-primary">{formatCurrency(serviceResults.ltvRevenue)}</p>
                          <p className="text-[10px] text-foreground/40 mt-1">Based on {Math.ceil(sRevGoal / sDealSize)} closed deals.</p>
                        </div>
                        <div className="bg-white/50 dark:bg-white/5 rounded-xl p-4 border border-black/5 dark:border-white/5">
                          <p className="text-[10px] font-bold text-foreground/50 mb-1 uppercase">LTV Net Profit (After Ads & Agency)</p>
                          <p className={`text-3xl font-black ${serviceResults.ltvNetProfit >= 0 ? "text-emerald-500" : "text-red-500"}`}>
                            {formatCurrency(serviceResults.ltvNetProfit)}
                          </p>
                          <p className="text-[10px] text-foreground/40 mt-1">Calculated using the high buffered spend range.</p>
                        </div>
                      </>
                    ) : (
                      <div className="col-span-2 text-sm text-foreground/50 italic py-4">
                        Enter a Lifetime Value (LTV) above to project long-term cohort profitability.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ─── EMBED SECTION ─── */}
      <div className="mt-16 pt-16 border-t border-black/5 dark:border-white/5">
        <div className="bg-black/5 dark:bg-white/5 rounded-[2rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-4 flex items-center gap-3 justify-center md:justify-start">
              <Code2 className="w-8 h-8 text-primary" /> Embed This Tool
            </h3>
            <p className="text-foreground/60 font-medium text-lg mb-6">
              Add this professional Ad Spend Forecaster to your agency website or blog. 100% free. No API keys required.
            </p>
            
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-black/10 dark:bg-black/30 rounded-xl p-4 font-mono text-xs md:text-sm text-foreground/60 overflow-x-auto whitespace-nowrap border border-black/5 dark:border-white/5">
                {`<iframe src="https://studiohappens.tech/embed/roi-calculator"...`}
              </div>
              <button 
                onClick={copyEmbedCode}
                className="shrink-0 h-full px-6 bg-primary text-primary-foreground font-bold rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div className="relative z-10 shrink-0 hidden lg:block">
            <div className="w-48 h-48 rounded-full border-8 border-primary/20 flex flex-col items-center justify-center p-6 text-center transform rotate-12 bg-white/50 dark:bg-black/50 backdrop-blur-sm shadow-xl">
              <Globe className="w-10 h-10 text-primary mb-2" />
              <span className="font-black text-sm uppercase tracking-wider text-primary">Whitelabel<br/>Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
