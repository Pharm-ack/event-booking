export const TICKET_TYPES = [
  {
    id: "free",
    name: "REGULAR ACCESS",
    price: 0,
    description: "Basic conference access",
    available: 20,
    total: 52,
  },
  {
    id: "vip",
    name: "VIP ACCESS",
    price: 150,
    description: "Premium conference access",
    available: 20,
    total: 52,
  },
  {
    id: "vvip",
    name: "VVIP ACCESS",
    price: 150,
    description: "Ultimate conference access",
    available: 20,
    total: 52,
  },
] as const

export const EVENT_DETAILS = {
  name: 'Techember Fest "25',
  date: "March 15, 2025",
  time: "7:00 PM",
  location: "04 Rumens road, Ikoyi, Lagos",
  description: "Join us for an unforgettable experience! Secure your spot now.",
}

