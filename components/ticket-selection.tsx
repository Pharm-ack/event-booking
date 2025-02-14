"use client";

import { useForm } from "@/contexts/form-context";
import { TICKET_TYPES } from "@/constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TicketSelection() {
  const { formData, updateFormData } = useForm();

  return (
    <div className=" w-full max-w-[700px] p-6 lg:p-12 mx-auto bg-[#041E23] border border-[#0E464F] rounded-[40px]">
      <div className="mb-8 w-full">
        <h1 className="text-3xl font-serif mb-2 text-white">
          Ticket Selection
        </h1>
        <div className="h-1 w-[35%] bg-teal-500"></div>
        <span className="text-gray-400 text-sm mt-2 block">Step 1/3</span>
      </div>

      <Card className="bg-[#08252B] p-[24px] border border-[#0E464F] rounded-[32px] ">
        <div className="flex flex-col gap-[32px]">
          <div className="event-details p-6 text-center">
            <h2 className="text-4xl font-bold text-[#fafafa] mb-4 font-serif">
              Techember Fest ”25
            </h2>
            <p className="text-gray-300 mb-4">
              Join us for an unforgettable experience at [Event Name]! Secure
              your spot now.
            </p>
            <div className="flex flex-col lg:flex-row items-center justify-center text-gray-300 space-x-2">
              <span className="block">📍 [Event Location]</span>
              <span className="mx-2 hidden lg:block">||</span>
              <span className="block">March 15, 2025 | 7:00 PM</span>
            </div>
          </div>

          <div className="flex flex-col gap-[32px] border-t-4 border-t-[#07373F] pt-8">
            <div>
              <label className="block text-sm font-medium text-[#FAFAFA] mb-4">
                Select Ticket Type:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TICKET_TYPES.map((ticket) => (
                  <button
                    key={ticket.id}
                    onClick={() => updateFormData({ ticketType: ticket.id })}
                    className={`p-4 border ${
                      formData.ticketType === ticket.id
                        ? "border-[#197686] bg-[#12464E]"
                        : "border-[#24A0B5] hover:border-teal-500/50"
                    } text-left transition-colors text-[#FAFAFA] rounded-[12px] h-[110px]`}
                  >
                    <div className="text-xl font-bold text-[#FAFAFA]">
                      {ticket.price === 0 ? "Free" : `$${ticket.price}`}
                    </div>
                    <div className="text-sm font-medium ">{ticket.name}</div>
                    <div className="text-xs mt-2">
                      {ticket.available}/{ticket.total}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-[#FAFAFA]">
                Number of Tickets
              </label>
              <Select
                value={String(formData.quantity)}
                onValueChange={(value) =>
                  updateFormData({ quantity: Number(value) })
                }
              >
                <SelectTrigger className="w-full text-[#FAFAFA] bg-transparent border-[#07373F] rounded-[12px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="text-[#FAFAFA] bg-[#08252B] border-[#07373F] ">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col-reverse lg:flex-row gap-6 w-full justify-between pt-4">
              <Button
                variant="outline"
                className="border-[#24A0B5] rounded-[8px] text-[#24A0B5] hover:bg-teal-900/20 flex-1"
                onClick={() => updateFormData({ step: 1 })}
              >
                Cancel
              </Button>
              <Button
                className="bg-[#24A0B5] rounded-[8px] hover:bg-teal-600 flex-1 text-white"
                onClick={() => updateFormData({ step: 2 })}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
