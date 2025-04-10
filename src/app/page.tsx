/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"

import { useEffect, useState } from "react"
import QRCode from "qrcode"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Download, Printer, Share2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function QRRangePage() {
  const [qrCodes, setQrCodes] = useState<{ id: number; url: string; qrDataURL: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [baseUrl, setBaseUrl] = useState("https://evogen-qr.vercel.app/page")
  const [range, setRange] = useState<[number, number]>([11, 50])
  const [searchTerm, setSearchTerm] = useState("")
  const [qrSize, setQrSize] = useState(200)

  useEffect(() => {
    generateQRCodes()
  }, [baseUrl, range, qrSize])

  const primenumber = (num: number): boolean => {
    if (num < 2) return false
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false
    }
    return true
  }

  const generateQRCodes = async () => {
    setLoading(true)
    const codes = []

    for (let i = range[0]; i <= range[1]; i++) {
      if (!primenumber(i)) continue
      const url = `${baseUrl}${i}`
      const qrDataURL = await QRCode.toDataURL(url, {
        width: qrSize,
        margin: 1,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
      codes.push({ id: i, url, qrDataURL })
    }

    setQrCodes(codes)
    setLoading(false)
  }

  const downloadQRCode = (dataUrl: string, id: number) => {
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = `qr-code-${id}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const printAllQRCodes = () => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    printWindow.document.write(`
      <html>
        <head>
          <title>Print QR Codes</title>
          <style>
            body { font-family: system-ui, sans-serif; }
            .container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
            .qr-item { page-break-inside: avoid; text-align: center; padding: 15px; border: 1px solid #eee; }
            .qr-item img { max-width: 100%; height: auto; }
            @media print {
              .no-print { display: none; }
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="no-print" style="margin-bottom: 20px;">
            <button onclick="window.print()">Print</button>
            <button onclick="window.close()">Close</button>
          </div>
          <div class="container">
            ${qrCodes
              .map(
                (code) => `
              <div class="qr-item">
               
                <img src="${code.qrDataURL}" alt="QR Code ${code.id}" />
                <p style="margin-top: 10px; font-weight: bold;">QR Code ${code.id}</p>
              </div>
            `
              )
              .join("")}
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  const filteredQRCodes = qrCodes.filter(
    (code) => code.url.toLowerCase().includes(searchTerm.toLowerCase()) || code.id.toString().includes(searchTerm)
  )

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-amber-50 to-amber-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-2">QR Code Generator (Primes Only)</h1>
          <p className="text-amber-700">Generate QR codes only for prime-numbered pages</p>
        </div>

        <Tabs defaultValue="gallery" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="gallery">Gallery View</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>QR Code Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="base-url">Base URL</Label>
                  <Input
                    id="base-url"
                    value={baseUrl}
                    onChange={(e) => setBaseUrl(e.target.value)}
                    placeholder="Enter base URL"
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Page Range (Currently: {range[0]} to {range[1]})
                  </Label>
                  <div className="flex gap-4">
                    <Input
                      type="number"
                      value={range[0]}
                      onChange={(e) => setRange([Number.parseInt(e.target.value), range[1]])}
                      min={1}
                      max={range[1] - 1}
                    />
                    <span className="flex items-center">to</span>
                    <Input
                      type="number"
                      value={range[1]}
                      onChange={(e) => setRange([range[0], Number.parseInt(e.target.value)])}
                      min={range[0] + 1}
                      max={100}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>QR Code Size: {qrSize}px</Label>
                  <Slider
                    value={[qrSize]}
                    min={100}
                    max={400}
                    step={10}
                    onValueChange={(value) => setQrSize(value[0])}
                  />
                </div>

                <Button onClick={generateQRCodes} className="w-full">
                  Regenerate QR Codes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="w-full md:w-1/3">
                <Input
                  placeholder="Search by ID or URL..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={printAllQRCodes}>
                  <Printer className="h-4 w-4 mr-2" />
                  Print All
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2">
                      <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent className="p-4 pt-2 pb-2 flex justify-center">
                      <Skeleton className="h-[200px] w-[200px]" />
                    </CardContent>
                    <CardFooter className="p-4 pt-2 flex justify-between">
                      <Skeleton className="h-9 w-20" />
                      <Skeleton className="h-9 w-20" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {filteredQRCodes.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-gray-500">No QR codes match your search.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredQRCodes.map(({ id, url, qrDataURL }) => (
                      <Card key={id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardHeader className="p-4 pb-2">
                          <CardTitle className="text-lg font-medium">QR Code {id === 11 ? "fake" : id}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-2 pb-2 flex flex-col items-center">
                          <div className="bg-white p-2 rounded-lg border border-amber-200 mb-2">
                            <img src={qrDataURL || "/placeholder.svg"} alt={`QR Code ${id}`} className="mx-auto" />
                          </div>
                          
                        </CardContent>
                        <CardFooter className="p-4 pt-2 flex justify-between">
                          <Button variant="outline" size="sm" onClick={() => downloadQRCode(qrDataURL, id)}>
                            <Download className="h-4 w-4 mr-2" />
                            Save
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(url)
                            }}
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Copy URL
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
