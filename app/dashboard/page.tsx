"use client"
import { NavbarRes } from "@/components/pages/navbar"
import FloatingLines from "@/components/ui/FloatingLines"
import { useAuth } from "@/context/authContext"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FileText, Shield, TrendingUp, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const [stats, setStats] = useState({
        totalScans: 0,
        fraudulentScans: 0,
        cleanScans: 0,
        recentScans: []
    })

    useEffect(() => {
        if (!loading && !user) {
            router.push("/")
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#030303]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full"
                />
            </div>
        )
    }

    if (!user) return null

    return (
        <div style={{ width: "100%", minHeight: "100vh", position: "relative" }}>
            {/* Animated background */}
            <div style={{ position: "fixed", inset: "0", zIndex: 0 }}>
                <FloatingLines
                    enabledWaves={["top", "middle", "bottom"]}
                    lineCount={[6, 7, 8]}
                    lineDistance={[8, 6, 4]}
                    bendRadius={5.0}
                    bendStrength={-0.5}
                    interactive={true}
                    parallax={true}
                />
            </div>

            {/* Navbar */}
            <NavbarRes />

            {/* Main Content */}
            <div style={{ position: "relative", zIndex: 10 }} className="max-w-7xl mx-auto px-4 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-white to-cyan-300">
                        Dashboard
                    </h1>
                    <p className="text-white/40 mt-2">Welcome back, {user.email}</p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-emerald-500/20"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm mb-1">Total Scans</p>
                                <p className="text-3xl font-bold text-white">{stats.totalScans}</p>
                            </div>
                            <FileText className="w-10 h-10 text-emerald-500/50" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-red-500/20"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm mb-1">Fraudulent</p>
                                <p className="text-3xl font-bold text-red-300">{stats.fraudulentScans}</p>
                            </div>
                            <Shield className="w-10 h-10 text-red-500/50" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-emerald-500/20"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm mb-1">Clean Scans</p>
                                <p className="text-3xl font-bold text-emerald-300">{stats.cleanScans}</p>
                            </div>
                            <TrendingUp className="w-10 h-10 text-emerald-500/50" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-cyan-500/20"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/60 text-sm mb-1">Success Rate</p>
                                <p className="text-3xl font-bold text-cyan-300">
                                    {stats.totalScans > 0 ? Math.round((stats.cleanScans / stats.totalScans) * 100) : 0}%
                                </p>
                            </div>
                            <Activity className="w-10 h-10 text-cyan-500/50" />
                        </div>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-emerald-500/20 mb-8"
                >
                    <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                            onClick={() => router.push("/scans")}
                            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white h-12"
                        >
                            <FileText className="w-4 h-4 mr-2" />
                            Scan New Invoice
                        </Button>
                        <Button
                            onClick={() => router.push("/counter")}
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white h-12"
                        >
                            <Shield className="w-4 h-4 mr-2" />
                            Generate Counter Bill
                        </Button>
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-emerald-500/20"
                >
                    <h2 className="text-xl font-semibold text-white mb-4">Recent Scans</h2>
                    {stats.recentScans.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
                            <p className="text-white/40">No scans yet. Start by scanning your first invoice!</p>
                            <Button
                                onClick={() => router.push("/scans")}
                                className="mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500"
                            >
                                Scan Invoice
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {stats.recentScans.map((scan: any, idx: number) => (
                                <div
                                    key={idx}
                                    className="bg-black/30 p-4 rounded-lg border border-white/10 flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-white font-medium">{scan.id}</p>
                                        <p className="text-white/40 text-sm">{scan.date}</p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${scan.fraudulent
                                                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                                                : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                            }`}
                                    >
                                        {scan.fraudulent ? "Fraudulent" : "Clean"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}
