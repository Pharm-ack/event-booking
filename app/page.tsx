"use client";

import { useForm } from "@/contexts/form-context";
import { TicketSelection } from "@/components/ticket-selection";
import { AttendeeDetails } from "@/components/attendee-details";
import { TicketConfirmation } from "@/components/ticket-confirmation";

export default function Home() {
  const { formData } = useForm();

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
      {formData.step === 1 && <TicketSelection />}
      {formData.step === 2 && <AttendeeDetails />}
      {formData.step === 3 && <TicketConfirmation />}
    </div>
  );
}
