export interface Booking {
  id: string;
  name: string;
  cpf: string;
  email: string;
  date: string;
  protocol: string;
  createdAt: string;
}

export interface FormData {
  name: string;
  cpf: string;
  email: string;
}

export interface AvailabilityData {
  date: string;
  availableSlots: number;
  totalSlots: number;
}