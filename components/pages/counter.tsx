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
    console.log(res.data)
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

     {report && (
  <div className="bg-zinc-900 p-6 rounded space-y-6 text-sm text-white">

    <div className="grid grid-cols-2 gap-4">
      <p><b>Fraud Detected:</b> {String(report.is_fraudulent)}</p>
      <p><b>Severity Score:</b> {report.severity_score}/100</p>
      <p><b>Original Total:</b> ₹{report.original_total}</p>
      <p><b>Corrected Total:</b> ₹{report.corrected_total}</p>
      <p className="col-span-2 text-red-400">
        Estimated Overcharge: ₹{report.estimated_overcharge}
      </p>
    </div>

    {/* Removed Items */}
    <div>
      <h3 className="font-semibold text-red-400 mb-2">❌ Removed Charges</h3>
      {report.removed_items.map((item: any, i: number) => (
        <div key={i} className="border border-red-500/30 p-2 mb-2 rounded bg-red-500/10">
          {item.label} — ₹{item.amount}
        </div>
      ))}
    </div>

    {/* Corrected Items */}
    <div>
      <h3 className="font-semibold text-green-400 mb-2">✔ Corrected Invoice Values</h3>
      {report.corrected_items.map((item: any, i: number) => (
        <div key={i} className="border border-green-500/30 p-2 mb-2 rounded bg-green-500/10">
          {item.label} — ₹{item.amount}
        </div>
      ))}
    </div>

    {/* Suspicious Terms */}
    <div>
      <h3 className="font-semibold text-yellow-400 mb-2">⚠ Suspicious Terms</h3>
      {report.suspicious_terms.map((term: string, i: number) => (
        <div key={i} className="bg-yellow-500/10 p-2 rounded mb-2">
          {term}
        </div>
      ))}
    </div>

    {/* Explanation */}
    <div className="bg-zinc-800 p-3 rounded">
      <h3 className="font-semibold mb-1">AI Reasoning</h3>
      {report.explanation.map((line: string, i: number) => (
        <p key={i} className="text-zinc-300">{line}</p>
      ))}
    </div>
  </div>
)}


    </div>
  );
}
