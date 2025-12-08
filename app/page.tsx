"use client"
import FloatingLines from "@/components/ui/FloatingLines"
import {HeroContent} from "@/components/pages/heroContent"
import { NavbarRes } from "@/components/pages/navbar"
import FeaturesSection from "@/components/pages/feature"
import SignUp from "@/components/auth/signUp"

export default function Home() {
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

      {/* Main Content Flow */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Hero Section */}
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
            paddingTop: "20px",
          }}
        >
          <div style={{ width: "100%", maxWidth: "1200px", padding: "2rem" }}>
            <HeroContent />
          </div>
        </div>

        {/* Features Section */}
        <div id="features">
        <FeaturesSection />
        </div>
      </div>
    </div>
  )
}
