"use client"
import CounterPage from "@/components/pages/counter"
import { NavbarRes } from "@/components/pages/navbar"
import FloatingLines from "@/components/ui/FloatingLines"

export default function CounterRoute() {
    return (
        <div style={{ width: "100%", minHeight: "100vh", position: "relative" }}>
            {/* Animated background - fixed to viewport */}
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
            <div style={{ position: "relative", zIndex: 10 }}>
                <CounterPage />
            </div>
        </div>
    )
}
