import jsPDF from "jspdf";
import type { TicketFormData } from "@/types";
import { EVENT_DETAILS } from "@/constants";

export const generatePDF = async (ticketData: TicketFormData) => {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: [210, 297],
  });

  // Set background color
  pdf.setFillColor(4, 30, 35);
  pdf.rect(0, 0, 210, 297, "F");

  // Main ticket container
  const margin = 20;
  const width = 170;
  const height = 220;
  const x = (210 - width) / 2;
  const y = 35;

  // Outer glow effect
  pdf.setDrawColor(36, 160, 181);
  pdf.setLineWidth(0.5);
  pdf.roundedRect(x - 2, y - 2, width + 4, height + 4, 12, 12, "S");

  // Inner container
  pdf.setDrawColor(14, 70, 79);
  pdf.roundedRect(x, y, width, height, 10, 10, "F");

  // Event Title
  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(32);
  pdf.text(EVENT_DETAILS.name, 105, y + 25, { align: "center" });

  // Location and Date
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(115, 155, 155);

  // Location
  pdf.text("04 Rumens road, Ikoyi, Lagos", 105, y + 40, { align: "center" });

  // Date and Time
  pdf.text("March 15, 2025 | 7:00 PM", 105, y + 50, { align: "center" });

  // Divider line
  pdf.setDrawColor(36, 160, 181);
  pdf.setLineWidth(0.3);
  pdf.line(x + 20, y + 60, x + width - 20, y + 60);

  // Profile Image
  if (ticketData.avatarUrl) {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = ticketData.avatarUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const imageSize = 80;
      const imageX = 105 - imageSize / 2;
      const imageY = y + 70;

      // Image border
      pdf.setDrawColor(36, 160, 181);
      pdf.setLineWidth(1);
      pdf.roundedRect(
        imageX - 2,
        imageY - 2,
        imageSize + 4,
        imageSize + 4,
        8,
        8,
        "S"
      );

      // Image
      pdf.addImage(img, "JPEG", imageX, imageY, imageSize, imageSize);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  }

  // User Information Section
  const formX = x + 20;
  const formY = y + 160;
  const formWidth = width - 40;

  const drawFormField = (label: string, value: string, yPos: number) => {
    pdf.setFontSize(10);
    pdf.setTextColor(115, 155, 155);
    pdf.text(label, formX, yPos);
    pdf.setFontSize(12);
    pdf.setTextColor(255, 255, 255);
    pdf.text(value, formX, yPos + 5);
  };

  // Name
  drawFormField("Enter your name", ticketData.fullName, formY);

  // Ticket Type
  drawFormField(
    "Ticket Type:",
    ticketData.ticketType.toUpperCase(),
    formY + 20
  );

  // Email
  drawFormField("Enter your email *", ticketData.email, formY + 40);

  // Quantity
  drawFormField("Ticket for:", ticketData.quantity.toString(), formY + 55);

  // Special Request
  if (ticketData.specialRequest) {
    pdf.setFontSize(10);
    pdf.setTextColor(115, 155, 155);
    pdf.text("Special request?", formX, formY + 80);

    pdf.setFontSize(12);
    pdf.setTextColor(255, 255, 255);
    const splitText = pdf.splitTextToSize(ticketData.specialRequest, formWidth);
    pdf.text(splitText, formX, formY + 85);
  }

  // Tear line
  pdf.setDrawColor(36, 160, 181);
  pdf.setLineDashPattern([2, 2], 0);
  pdf.line(x + 20, y + height - 30, x + width - 20, y + height - 30);

  // Ticket number
  pdf.setFontSize(10);
  pdf.setTextColor(115, 155, 155);
  pdf.text("TF25-XXXXXX", 105, y + height - 15, { align: "center" });

  return pdf;
};
