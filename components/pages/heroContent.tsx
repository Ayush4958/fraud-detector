"use client"
import { EncryptedText } from "@/components/ui/encrypted-text";
import React from "react";
import {DashboardButton} from "@/components/ui/dashButton"
import {BillAnalysisButton} from "@/components/ui/billAnal"
 
export function HeroContent() {
  return (
    <>
    <p className="mx-auto mt-10 max-w-5xl font-extrabold py-7 text-8xl text-center text-[#404e58e5]">
      <EncryptedText
        text="Fraud Detector Powered By AI"
        encryptedClassName="dark:text-[#404e58e5]"
        revealedClassName="dark:text-[#a4cae7] "
        revealDelayMs={50}
      />
    </p>
    <p className="mx-auto  max-w-4xl font-sans font-semibold py-10 text-lg text-center text-[#d3ecff]">
      Stop fraud before it hurts your wallet. Our advanced AI engine analyzes every bill in seconds, spotting anomalies, double charges, and hidden manipulations.Protect your money with real-time, transparent insights you can trust.
    </p>
    <div className=" my-4 text-center">
      <DashboardButton />
      <BillAnalysisButton />
    </div>
    </>
  );
}