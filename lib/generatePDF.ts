import jsPDF from "jspdf";
import type { TicketFormData } from "@/types";
import { EVENT_DETAILS } from "@/constants";

export const generatePDF = (ticketData: TicketFormData) => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  pdf.setFillColor(0, 38, 38);
  pdf.rect(0, 0, 210, 297, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.text(EVENT_DETAILS.name, 105, 20, { align: "center" });

  pdf.setFontSize(12);
  pdf.text(
    `Date: ${EVENT_DETAILS.date} | Time: ${EVENT_DETAILS.time}`,
    105,
    30,
    { align: "center" }
  );
  pdf.text(`Location: ${EVENT_DETAILS.location}`, 105, 37, { align: "center" });

  pdf.setFontSize(16);
  pdf.text("Ticket Holder Information", 20, 55);
  pdf.setFontSize(12);
  pdf.text(`Name: ${ticketData.fullName}`, 20, 65);
  pdf.text(`Email: ${ticketData.email}`, 20, 72);
  pdf.text(`Ticket Type: ${ticketData.ticketType.toUpperCase()}`, 20, 79);
  pdf.text(`Quantity: ${ticketData.quantity}`, 20, 86);

  pdf.setDrawColor(255, 255, 255);
  pdf.setLineWidth(0.5);
  pdf.rect(20, 95, 30, 30);
  pdf.setFontSize(8);
  pdf.text("QR Code", 35, 130, { align: "center" });

  pdf.rect(60, 95, 130, 20);
  pdf.setFontSize(8);
  pdf.text("Barcode", 125, 120, { align: "center" });

  const ticketNumber = `TF25-${Math.random()
    .toString(36)
    .substr(2, 6)
    .toUpperCase()}`;
  pdf.setFontSize(10);
  pdf.text(`Ticket #: ${ticketNumber}`, 105, 140, { align: "center" });

  if (ticketData.specialRequest) {
    pdf.setFontSize(12);
    pdf.text("Special Request:", 20, 155);
    pdf.setFontSize(10);
    const splitText = pdf.splitTextToSize(ticketData.specialRequest, 170);
    pdf.text(splitText, 20, 162);
  }

  pdf.setFontSize(10);
  pdf.text("This ticket is non-transferable and non-refundable.", 105, 280, {
    align: "center",
  });
  pdf.text("Please present this ticket at the event entrance.", 105, 285, {
    align: "center",
  });

  return pdf;
};
