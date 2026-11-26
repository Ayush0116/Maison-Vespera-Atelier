import React, { createContext, useContext, useState, useCallback } from 'react';
import { scrollToSection } from '../utils/scrollToSection.js';

const BookingContext = createContext({
  preselectedData: null,
  requestBooking: () => {},
  clearPreselection: () => {}
});

export function BookingProvider({ children }) {
  const [preselectedData, setPreselectedData] = useState(null);

  const requestBooking = useCallback(({ serviceId, professionalId } = {}) => {
    setPreselectedData({ serviceId, professionalId, timestamp: Date.now() });
    
    // Smooth scroll to booking section
    scrollToSection('booking');

    // Announce preselection politely to assistive tech
    const announcement = document.getElementById('booking-announcer');
    if (announcement) {
      announcement.textContent = "Service selected. Appointment enquiry form focused.";
    }
  }, []);

  const clearPreselection = useCallback(() => {
    setPreselectedData(null);
  }, []);

  return (
    <BookingContext.Provider value={{ preselectedData, requestBooking, clearPreselection }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
