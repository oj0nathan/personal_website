"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { Download, Loader2 } from "lucide-react"

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

function LazyPage({
  pageNumber,
  width,
  aspectRatio,
}: {
  pageNumber: number
  width: number
  aspectRatio: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(pageNumber <= 3)

  useEffect(() => {
    if (visible) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: "1200px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden bg-white/[0.03]"
      style={{ minHeight: width / aspectRatio }}
    >
      {visible ? (
        <Page
          pageNumber={pageNumber}
          width={width}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          loading={
            <div className="flex items-center justify-center" style={{ height: width / aspectRatio }}>
              <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
            </div>
          }
        />
      ) : (
        <div className="flex items-center justify-center" style={{ height: width / aspectRatio }}>
          <span className="text-white/20 text-sm">{pageNumber}</span>
        </div>
      )}
      {/* Page number badge */}
      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-white/70 text-xs backdrop-blur-sm">
        {pageNumber}
      </div>
    </div>
  )
}

export function PdfViewer({ file, downloadName }: { file: string; downloadName?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [numPages, setNumPages] = useState<number>(0)
  const [width, setWidth] = useState<number>(0)
  const [aspectRatio, setAspectRatio] = useState<number>(16 / 9)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setWidth(el.clientWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const onDocumentLoadSuccess = useCallback(async (pdf: { numPages: number; getPage: (n: number) => Promise<any> }) => {
    setNumPages(pdf.numPages)
    try {
      const firstPage = await pdf.getPage(1)
      const viewport = firstPage.getViewport({ scale: 1 })
      setAspectRatio(viewport.width / viewport.height)
    } catch {
      // keep default aspect ratio
    }
  }, [])

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between rounded-t-2xl border border-white/10 border-b-0 bg-white/[0.04] px-4 py-3">
        <span className="text-white/60 text-sm">{numPages > 0 ? `${numPages} pages` : "Loading document..."}</span>
        <a
          href={file}
          download={downloadName}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 text-sm text-blue-300 hover:bg-blue-500/20 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </a>
      </div>

      {/* Scrollable document - LinkedIn style */}
      <div
        ref={containerRef}
        className="h-[70vh] md:h-[80vh] overflow-y-auto rounded-b-2xl border border-white/10 bg-[#0a0a0a]"
      >
        {width > 0 && (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex flex-col items-center justify-center gap-3 py-32">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                <span className="text-white/50 text-sm">Loading primer...</span>
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center gap-3 py-32 px-4 text-center">
                <span className="text-white/60 text-sm">
                  Unable to load the document.{" "}
                  <a href={file} className="text-blue-400 hover:text-blue-300 underline">
                    Download it instead
                  </a>
                  .
                </span>
              </div>
            }
            className="flex flex-col gap-2 p-2"
          >
            {Array.from({ length: numPages }, (_, i) => (
              <LazyPage key={i + 1} pageNumber={i + 1} width={width - 16} aspectRatio={aspectRatio} />
            ))}
          </Document>
        )}
      </div>
    </div>
  )
}
