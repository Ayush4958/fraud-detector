"use client";

import { downloadPdf } from "@/services/pdf";
import { Button } from "@/components/ui/button";

interface PdfPageProps {
  counterId: string;
}

export default function PdfPage({ counterId }: PdfPageProps) {
  const handleDownload = async () => {
    await downloadPdf(counterId);
  };

  return (
    <div className="flex justify-center mt-20">
      <Button onClick={handleDownload}>
        Download Dispute Letter PDF
      </Button>
    </div>
  );
}
