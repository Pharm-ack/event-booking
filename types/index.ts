export interface TicketFormData {
  step: number
  ticketType: "free" | "vip" | "vvip"
  quantity: number
  fullName: string
  email: string
  avatarUrl: string
  specialRequest?: string
}

export interface TicketType {
  id: "free" | "vip" | "vvip"
  name: string
  price: number
  description: string
  available: number
  total: number
}

