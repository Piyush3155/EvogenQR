/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function QRRangePage() {
  const [qrCodes, setQrCodes] = useState<{ id: number; url: string; qrDataURL: string }[]>([]);

  useEffect(() => {
    const generateQRCodes = async () => {
      const codes = [];

      for (let i = 11; i <= 21; i++) {
        const url = `https://evogen-qr.vercel.app/page${i}`;
        const qrDataURL = await QRCode.toDataURL(url);
        codes.push({ id: i, url, qrDataURL });
      }

      setQrCodes(codes);
    };

    generateQRCodes();
  }, []);

  return (
    <div className="min-h-screen p-8 text-black bg-amber-50">
      <h1 className="text-2xl font-bold mb-6">QR Codes from 11 to 30</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {qrCodes.map(({ id, url, qrDataURL }) => (
          <div key={id} className="bg-white p-4 rounded shadow text-center">
            <p className="mb-2 text-sm">{url}</p>
            <img src={qrDataURL} alt={`QR Code ${id}`} className="mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
