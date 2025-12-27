"use client";

import { useState } from "react";
import { generateCounterBill } from "@/services/counter";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

export default function CounterPage() {
  const [scanId, setScanId] = useState("");
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    const { data: session } = await supabase.auth.getSession();
    const token = session?.session?.access_token;

    if (!token) {
      alert("Please login first");
      setLoading(false);
      return;
    }

    const res = await generateCounterBill(scanId, token);
    setReport(res.data);
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-bold">AI Invoice Correction Panel</h2>

      <input
        className="w-full bg-zinc-900 p-2 rounded"
        placeholder="Enter Scan ID"
        value={scanId}
        onChange={(e) => setScanId(e.target.value)}
      />

      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Analyzing..." : "Generate Corrections"}
      </Button>

      {/* {report && (
        <div className="bg-zinc-900 p-6 rounded space-y-4 text-sm text-white">

          <div className="flex justify-between">
            <p><b>Vendor:</b> {report.vendor_name}</p>
            <p><b>Severity Score:</b> {report.fraud_report.severity_score}/100</p>
          </div>

          <div>
            <p className="font-semibold text-red-400 mb-2">
              ❌ Detected Issues
            </p>

            {report.fraud_report.suspicious_terms.map((term: string, i: number) => (
              <div
                key={i}
                className="border border-red-500/30 rounded p-2 mb-2 bg-red-500/10"
              >
                {term}
              </div>
            ))}

            {report.fraud_report.invalid_gst_values.map((gst: string, i: number) => (
              <div
                key={i}
                className="border border-yellow-500/30 rounded p-2 mb-2 bg-yellow-500/10"
              >
                Invalid GST: {gst}
              </div>
            ))}
          </div>

          <div>
            <p className="font-semibold text-green-400 mb-2">
              ✔ AI Suggested Corrections
            </p>

            {report.fraud_report.suspicious_terms.map((term: string, i: number) => (
              <div key={i} className="bg-green-500/10 p-2 rounded mb-2">
                Remove or replace <b>{term}</b> with verified service charge
              </div>
            ))}

            {report.fraud_report.invalid_gst_values.map((gst: string, i: number) => (
              <div key={i} className="bg-green-500/10 p-2 rounded mb-2">
                Replace GST value <b>{gst}</b> with valid GST slab (18%)
              </div>
            ))}
          </div>

          <div className="bg-zinc-800 p-3 rounded">
            <p className="font-semibold mb-1">AI Reasoning</p>
            <p className="text-zinc-300">
              {report.fraud_report.reasoning}
            </p>
          </div>
        </div>
      )} */}
    </div>
  );
}
