export interface TicketFormData {
  name: string;
  email: string;
  avatarUrl: string;
  specialRequest?: string;
  ticketType: "REGULAR" | "VIP" | "VVIP";
  ticketCount: number;
}
