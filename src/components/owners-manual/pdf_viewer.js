import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();

const PDFViewer = ({pdfURL}) => {

    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    useEffect(() => {setPageNumber(1)}, [pdfURL])

    const PDFContainerStyle = {
        border: "solid 1px grey",
        display:'flex',
        flexDirection:'column',
        height: "60em",
        alignItems: "center",
    }

    const buttonStyle = {
        height: "25px",
        width: "100px",
        border: "solid 1px grey",
        borderRadius: "7px",
        backgroundColor: "#6897d8",
        color: "white",
        cursor: "pointer"
    }

    const buttonContainerStyle = {
        display: "flex",
        flexDirection: "row",
        gap: "50px"
    }

    return (
        <div style={PDFContainerStyle}>
            <p style={buttonContainerStyle}>
                <button onClick={() => { setPageNumber((prev) => prev > 1 ? prev - 1 : prev)}} style={buttonStyle} className='material-symbols-outlined notranslate ' >chevron_left</button>
                    Page {pageNumber} of {numPages}
                <button onClick={() => { setPageNumber((prev) => prev < numPages ? prev + 1 : prev)}} style={buttonStyle} className='material-symbols-outlined notranslate '>chevron_right</button>
            </p>
            <Document file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
            </Document>
        </div>
    );
};

export default PDFViewer;