import jsPDF from "jspdf";

export const downloadPDF = (content: string, filename?: string) => {
  const pdf = new jsPDF()
  pdf.setFontSize(10)
  // Set margins and content width
  const marginTop = 20;
  const marginLeft = 20;
  const contentWidth = pdf.internal.pageSize.getWidth() - marginLeft * 2;
  // Split the content into lines that fit within the content width
  const lines = pdf.splitTextToSize(content, contentWidth);
  pdf.text(lines, marginLeft, marginTop)
  pdf.save(`coverletter-${filename?.toLowerCase()}.pdf`)
}
