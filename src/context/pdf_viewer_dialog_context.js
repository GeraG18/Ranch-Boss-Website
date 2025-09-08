'use client' // Renders on client side
import { createContext, useContext, useEffect, useState } from "react";
import ShowPdfModal from "@/components/product-standard-features/show_pdf_modal";
import { usePathname } from "next/navigation";

const PdfViewerContext = createContext();

const PdfViewerProvider = ({ children }) => {
  
    const pathname = usePathname();
    const [pdfSrc, setPdfSrc] = useState(false);
    const [enableOverflow, setEnableOverflow] = useState(false);

    const openPdfViewer = (src, enableOFunctionality = false) => {
        setPdfSrc(src);
        setEnableOverflow(enableOFunctionality)
    }

    const closePdfViewer = () => {
        setPdfSrc(false);
    }

    useEffect(() => {
        // console.log('pathname changes from pdfViewer', pathname);
        closePdfViewer();
    }, [pathname]);

    useEffect(() => {
        if( enableOverflow ) {
            if(document.body.style.overflowY !== 'hidden') {
                // console.log('escondidon');
                document.body.style.overflowY = 'hidden'
            } else {
                // console.log('auton');
                document.body.style.overflowY = 'auto'
            }
        }
    }, [pdfSrc])
    
    return (
        <PdfViewerContext.Provider value={{ openPdfViewer, closePdfViewer }}>
            <ShowPdfModal
                showModal={pdfSrc !== false}
                pdfRoute={pdfSrc}
                onFilterChange={(v) => setPdfSrc(v)}
            />
            {children}
        </PdfViewerContext.Provider>
    );
};

export default PdfViewerProvider;

export const usePdfViewerProvider = () => useContext(PdfViewerContext);