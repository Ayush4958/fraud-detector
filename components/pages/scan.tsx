"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, Upload, FileText } from "lucide-react"
import { scanInvoice } from "@/services/scan"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"
import { cn } from "@/lib/utils"

const ElegantShape = ({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-3xl",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-white/[0.15]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-3xl",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export default function ScanPage() {
  const [file, setFile] = useState<File | null>(null)
  const [out, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleScan = async () => {
    if (!file) return

    setLoading(true)

    const { data: session } = await supabase.auth.getSession()
    const token = session?.session?.access_token

    if (!token) {
      alert("Please login first")
      setLoading(false)
      return
    }

    const res = await scanInvoice(file, token)

    console.log(res.result)

    setResult(res)
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030303]">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-slate-900/20 blur-3xl" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ElegantShape
          delay={0.3}
          width={500}
          height={120}
          rotate={12}
          gradient="from-emerald-500/[0.12]"
          className="left-[-10%] md:left-[-5%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.5}
          width={400}
          height={100}
          rotate={-15}
          gradient="from-cyan-500/[0.12]"
          className="right-[-5%] md:right-[0%] bottom-[15%] md:bottom-[20%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-teal-500/[0.12]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={250}
          height={70}
          rotate={20}
          gradient="from-emerald-500/[0.12]"
          className="right-[10%] md:right-[15%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-emerald-500/30 text-emerald-300 text-sm font-medium mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Invoice Scanner</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold text-white mb-2 text-balance"
            >
              Scan Your Invoice
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/40 text-sm"
            >
              Upload and analyze with AI-powered fraud detection
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="bg-black/70 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(16,185,129,0.08)] hover:shadow-[0_8px_32px_0_rgba(16,185,129,0.12)] transition-shadow"
          >
            <div className="space-y-4">
              <div className="relative">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-emerald-500/30 rounded-xl cursor-pointer hover:border-emerald-500/60 transition-all bg-black/40 backdrop-blur-sm group hover:shadow-[0_0_15px_rgba(16,185,129,0.12)]"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-6 h-6 text-slate-500 mb-1 group-hover:text-emerald-400 transition-colors" />
                    <p className="text-xs text-slate-400">
                      <span className="font-semibold text-slate-300">Click</span> or drag
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">PNG, JPG (MAX 10MB)</p>
                    {file && (
                      <div className="mt-2 flex items-center gap-2 text-emerald-400 text-xs">
                        <FileText className="w-3 h-3" />
                        <span className="truncate">{file.name}</span>
                      </div>
                    )}
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="hidden"
                  />
                </label>
              </div>

              <Button
                onClick={handleScan}
                disabled={loading || !file}
                className="w-full h-10 bg-gradient-to-r from-emerald-600/80 to-teal-600/80 hover:from-emerald-500 hover:to-teal-500 text-white font-medium text-sm rounded-lg shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-emerald-400/20"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Scanning...
                  </span>
                ) : (
                  <span>Scan Invoice</span>
                )}
              </Button>
            </div>
          </motion.div>

          {/* Scan Results Section */}
          {out && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-6 bg-black/70 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(16,185,129,0.08)]"
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-semibold text-white">Fraud Analysis</h3>
              </div>

              <div className="space-y-4 text-sm text-white/80">
                <div className="flex justify-between items-center p-3 bg-black/40 rounded-lg border border-white/10">
                  <p>
                    <b>Fraud Detected:</b>
                  </p>
                  {out?.result?.fraud_report && (
                    <div className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      out.result.fraud_report.fraud_detected
                        ? "bg-red-500/20 text-red-300 border border-red-500/30"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    )}>
                      {out.result.fraud_report.fraud_detected
                        ? "Fraud Detected"
                        : "Clean Invoice"}
                    </div>
                  )}

                </div>

                <div className="p-3 bg-black/40 rounded-lg border border-white/10">
                  <p className="mb-2">
                    <b>Severity Score:</b>
                  </p>
                  <div className="w-full bg-black/60 rounded-full h-2 border border-white/10">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(out?.result?.fraud_report?.severity_score ?? 0, 100)
                          }%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-white/60 mt-2">{out.result?.fraud_report?.severity_score}/100</p>
                </div>

                <div className="p-3 bg-black/40 rounded-lg border border-white/10">
                  <p className="font-semibold mb-2">Scan ID</p>
                  <p className="text-xs font-mono text-emerald-400 break-all">{out?.scanId}</p>
                </div>

                <div className="p-3 bg-black/40 rounded-lg border border-white/10">
                  <p className="font-semibold mb-2">Reasoning</p>
                  <p className="text-xs text-white/70 leading-relaxed">{out?.result?.fraud_report?.reasoning}</p>
                </div>

                {out?.result?.fraud_report?.suspicious_terms?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-amber-300 mb-2 text-sm">⚠️ Suspicious Charges</h4>
                    <div className="space-y-2">
                      {out.result?.fraud_report?.suspicious_terms.map((term: string, i: number) => (
                        <div
                          key={i}
                          className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-200"
                        >
                          {term}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {out?.result?.fraud_report?.invalid_gst_values.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-orange-300 mb-2 text-sm">Invalid GST Values</h4>
                    <div className="space-y-2">
                      {out?.result?.fraud_report?.invalid_gst_values.map((gst: string, i: number) => (
                        <div
                          key={i}
                          className="p-2 bg-orange-500/10 border border-orange-500/30 rounded-lg text-xs text-orange-200"
                        >
                          {gst}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
