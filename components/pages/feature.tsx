"use client"

import { GlareCard } from "@/components/ui/glare-card"

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: "Real-Time Detection",
      description: "Instantly detect fraudulent activities as they happen with our advanced algorithms.",
      image: "/detect.png",
    },
    {
      id: 2,
      title: "AI-Powered Analysis",
      description: "Machine learning models continuously evolve to catch new fraud patterns.",
      image: "/aipowered.png",
    },
    {
      id: 3,
      title: "Secure Transactions",
      description: "End-to-end encryption and multi-layer security for all transactions.",
      image: "/secure.png",
    },
    {
      id: 4,
      title: "Risk Assessment",
      description: "Comprehensive risk scoring for every transaction in milliseconds.",
      image: "/risk.png",
    },
    {
      id: 5,
      title: "Transaction Monitoring",
      description: "Continuous tracking and monitoring of all transaction activities.",
      image: "/transaction.png",
    },
    {
      id: 6,
      title: "Custom Rules Engine",
      description: "Create and manage custom fraud detection rules tailored to your needs.",
      image: "/custom.png",
    },
  ]

  return (
    <section className="w-full py-20 px-4 relative z-20 bg-gradient-to-b from-transparent via-[#061222]/30 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-lg text-[#447794] max-w-2xl mx-auto">
            Everything you need to detect, prevent, and respond to fraud in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <GlareCard key={feature.id} className="p-6">
              <div className="flex flex-col h-full gap-4">
                {/* Feature Image */}
                <img
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  className="w-full h-40 object-cover rounded-lg opacity-80"
                />

                {/* Title */}
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>

                {/* Description */}
                <p className="text-[#2D5B75] text-sm leading-relaxed flex-grow">{feature.description}</p>

                {/* Arrow */}
                <div className="flex items-center text-[#447794] group-hover:translate-x-2 transition-transform duration-300">
                  <span className="text-lg">→</span>
                </div>
              </div>
            </GlareCard>
          ))}
        </div>
      </div>
    </section>
  )
}
