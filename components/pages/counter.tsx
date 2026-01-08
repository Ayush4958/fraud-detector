"use client"

import { useState } from "react"
import { generateCounterBill } from "@/services/counter"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"
import { motion } from "framer-motion"

function AnimatedShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rectangular shapes with circular elements */}
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-[5%] left-[5%] w-72 h-40 rounded-3xl bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-cyan-500/[0.08] backdrop-blur-[2px] border border-emerald-500/[0.2] shadow-[0_8px_32px_0_rgba(16,185,129,0.1)]"
      />

      <motion.div
        animate={{ y: [0, -25, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
        className="absolute top-[50%] right-[5%] w-64 h-48 rounded-3xl bg-gradient-to-br from-cyan-500/[0.08] via-transparent to-blue-500/[0.08] backdrop-blur-[2px] border border-cyan-500/[0.2] shadow-[0_8px_32px_0_rgba(6,182,212,0.1)]"
      />

      <motion.div
        animate={{ y: [0, 15, 0], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[10%] left-[10%] w-80 h-44 rounded-3xl bg-gradient-to-br from-teal-500/[0.08] via-transparent to-emerald-500/[0.08] backdrop-blur-[2px] border border-teal-500/[0.2] shadow-[0_8px_32px_0_rgba(20,184,166,0.1)]"
      />

      <motion.div
        animate={{ y: [0, -18, 0], x: [0, -12, 0] }}
        transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1.5 }}
        className="absolute bottom-[20%] right-[15%] w-56 h-36 rounded-3xl bg-gradient-to-br from-blue-500/[0.08] via-transparent to-cyan-500/[0.08] backdrop-blur-[2px] border border-blue-500/[0.2] shadow-[0_8px_32px_0_rgba(59,130,246,0.1)]"
      />
    </div>
  )
}

export default function CounterPage() {
  const [scanId, setScanId] = useState("")
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)

    const { data: session } = await supabase.auth.getSession()
    const token = session?.session?.access_token

    if (!token) {
      alert("Please login first")
      setLoading(false)
      return
    }

    const res = await generateCounterBill(scanId, token)
    setReport(res.data)
    setLoading(false)
    console.log(res.data)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <AnimatedShapes />

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-cyan-500/[0.03] blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-white to-cyan-300 mb-2">
            AI Invoice Correction
          </h2>
          <p className="text-white/40 text-sm">Analyze and correct fraudulent invoices with AI</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 mb-8"
        >
          <input
            className="w-full bg-black/40 backdrop-blur-md p-3 rounded-xl border border-emerald-500/[0.2] text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
            placeholder="Enter Scan ID"
            value={scanId}
            onChange={(e) => setScanId(e.target.value)}
          />

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white border-0 rounded-xl py-6 font-semibold transition-all duration-300"
          >
            {loading ? "Analyzing..." : "Generate Corrections"}
          </Button>
        </motion.div>

        {report && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/30 backdrop-blur-md p-8 rounded-2xl border border-emerald-500/[0.1] space-y-6 text-sm text-white shadow-2xl"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-black/50 p-4 rounded-xl border border-cyan-500/[0.15] hover:border-cyan-500/[0.3] transition-all"
              >
                <p className="text-white/60 text-xs mb-1">Fraud Detected</p>
                <p className="text-lg font-semibold text-cyan-300">{String(report.is_fraudulent)}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-black/50 p-4 rounded-xl border border-emerald-500/[0.15] hover:border-emerald-500/[0.3] transition-all"
              >
                <p className="text-white/60 text-xs mb-1">Severity Score</p>
                <p className="text-lg font-semibold text-emerald-300">{report.severity_score}/100</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-black/50 p-4 rounded-xl border border-blue-500/[0.15] hover:border-blue-500/[0.3] transition-all"
              >
                <p className="text-white/60 text-xs mb-1">Original Total</p>
                <p className="text-lg font-semibold text-blue-300">₹{report.original_total}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="bg-black/50 p-4 rounded-xl border border-teal-500/[0.15] hover:border-teal-500/[0.3] transition-all"
              >
                <p className="text-white/60 text-xs mb-1">Corrected Total</p>
                <p className="text-lg font-semibold text-teal-300">₹{report.corrected_total}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="col-span-2 bg-black/50 p-4 rounded-xl border border-red-500/[0.15] hover:border-red-500/[0.3] transition-all"
              >
                <p className="text-white/60 text-xs mb-1">Estimated Overcharge</p>
                <p className="text-lg font-semibold text-red-300">₹{report.estimated_overcharge}</p>
              </motion.div>
            </div>

            {/* Removed Items */}
            <div>
              <h3 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
                <span className="text-lg">❌</span> Removed Charges
              </h3>
              <div className="space-y-2">
                {report.removed_items.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                    className="border border-red-500/[0.2] p-3 rounded-lg bg-red-500/[0.05] hover:bg-red-500/[0.08] transition-all text-white/70"
                  >
                    {item.label}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Corrected Items */}
            <div>
              <h3 className="font-semibold text-emerald-300 mb-3 flex items-center gap-2">
                <span className="text-lg">✔</span> Corrected Invoice Values
              </h3>
              <div className="space-y-2">
                {report.corrected_items.map((item: any, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                    className="border border-emerald-500/[0.2] p-3 rounded-lg bg-emerald-500/[0.05] hover:bg-emerald-500/[0.08] transition-all text-white/70"
                  >
                    ₹{item.amount}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Suspicious Terms */}
            <div>
              <h3 className="font-semibold text-yellow-300 mb-3 flex items-center gap-2">
                <span className="text-lg">⚠</span> Suspicious Terms
              </h3>
              <div className="space-y-2">
                {report.suspicious_terms.map((term: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                    className="bg-yellow-500/[0.08] p-3 rounded-lg border border-yellow-500/[0.2] hover:border-yellow-500/[0.3] transition-all text-white/70"
                  >
                    {term}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-black/40 p-4 rounded-xl border border-white/[0.1] space-y-2">
              <h3 className="font-semibold text-white mb-3">AI Reasoning</h3>
              <div className="space-y-1">
                {report.explanation.map((line: string, i: number) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                    className="text-white/60 leading-relaxed text-xs"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
