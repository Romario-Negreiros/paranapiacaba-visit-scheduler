import { Booking } from '@/types/booking';

const STORAGE_KEY = 'festival-bookings';
const AVAILABILITY_KEY = 'festival-availability';

// Initialize default availability (will be replaced with Supabase)
const initializeAvailability = () => {
  const existing = localStorage.getItem(AVAILABILITY_KEY);
  if (!existing) {
    const dates: Record<string, number> = {};
    // Initialize next 60 days with random availability
    for (let i = 0; i < 60; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      dates[dateStr] = Math.floor(Math.random() * 40) + 10; // 10-50 slots
    }
    localStorage.setItem(AVAILABILITY_KEY, JSON.stringify(dates));
  }
};

export const bookingStorage = {
  // Initialize storage
  init: () => {
    initializeAvailability();
  },

  // Get all bookings
  getBookings: (): Booking[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  // Add new booking
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>): Booking => {
    const bookings = bookingStorage.getBookings();
    const newBooking: Booking = {
      ...booking,
      id: `BOOK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    
    // Update availability
    bookingStorage.decrementAvailability(booking.date);
    
    return newBooking;
  },

  // Check if CPF already has booking
  checkCPFExists: (cpf: string): boolean => {
    const bookings = bookingStorage.getBookings();
    const cleanCPF = cpf.replace(/\D/g, '');
    return bookings.some(booking => booking.cpf === cleanCPF);
  },

  // Get availability for date
  getAvailability: (dateStr: string): number => {
    const availability = JSON.parse(localStorage.getItem(AVAILABILITY_KEY) || '{}');
    return availability[dateStr] || 0;
  },

  // Decrement availability
  decrementAvailability: (dateStr: string): void => {
    const availability = JSON.parse(localStorage.getItem(AVAILABILITY_KEY) || '{}');
    if (availability[dateStr] && availability[dateStr] > 0) {
      availability[dateStr]--;
      localStorage.setItem(AVAILABILITY_KEY, JSON.stringify(availability));
    }
  },

  // Generate protocol number
  generateProtocol: (): string => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    
    let protocol = 'FIP-';
    
    // Add 2 letters
    for (let i = 0; i < 2; i++) {
      protocol += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    
    protocol += '-';
    
    // Add 4 numbers
    for (let i = 0; i < 4; i++) {
      protocol += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    return protocol;
  }
};

// Initialize on import
bookingStorage.init();