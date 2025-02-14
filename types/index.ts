export interface TicketFormData {
  step: number;
  ticketType: "Free" | "VIP" | "VVIP";
  quantity: number;
  fullName: string;
  email: string;
  avatarUrl: string;
  specialRequest?: string;
}

export interface TicketType {
  id: "Free" | "VIP" | "VVIP";
  name: string;
  price: number;
  description: string;
  available: number;
  total: number;
}
