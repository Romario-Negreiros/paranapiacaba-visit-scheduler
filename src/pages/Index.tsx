import React, { useState } from 'react';
import { FestivalHero } from '@/components/festival-hero';
import { KioskCalendar } from '@/components/kiosk-calendar';
import { VisitorForm } from '@/components/visitor-form';
import { ConfirmationScreen } from '@/components/confirmation-screen';
import { useKioskTimeout } from '@/hooks/use-kiosk-timeout';
import { bookingStorage } from '@/utils/booking-storage';
import { FormData } from '@/types/booking';

type AppStep = 'hero' | 'calendar' | 'form' | 'confirmation';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('hero');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);

  // Auto-return to home after 2 minutes of inactivity
  useKioskTimeout({
    timeoutMs: 120000, // 2 minutes
    onTimeout: () => setCurrentStep('hero'),
    isActive: currentStep !== 'hero'
  });

  const handleStartBooking = () => {
    setCurrentStep('calendar');
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentStep('form');
  };

  const handleFormSubmit = (formData: FormData) => {
    if (!selectedDate) return;

    const protocol = bookingStorage.generateProtocol();
    const booking = bookingStorage.addBooking({
      name: formData.name,
      cpf: formData.cpf.replace(/\D/g, ''),
      email: formData.email,
      date: selectedDate.toISOString().split('T')[0],
      protocol
    });

    setBookingData({
      ...formData,
      date: selectedDate,
      protocol
    });
    setCurrentStep('confirmation');
  };

  const handleNewBooking = () => {
    setSelectedDate(null);
    setBookingData(null);
    setCurrentStep('calendar');
  };

  const handleGoHome = () => {
    setSelectedDate(null);
    setBookingData(null);
    setCurrentStep('hero');
  };

  const handleBackToCalendar = () => {
    setCurrentStep('calendar');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {currentStep === 'hero' && (
        <FestivalHero onStartBooking={handleStartBooking} />
      )}
      
      {currentStep === 'calendar' && (
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-primary">
              Escolha a Data da Sua Visita
            </h1>
            <p className="text-xl text-muted-foreground">
              Selecione o dia que deseja visitar o Festival de Inverno
            </p>
          </div>
          <KioskCalendar 
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
        </div>
      )}
      
      {currentStep === 'form' && selectedDate && (
        <div className="container mx-auto px-6 py-8">
          <VisitorForm 
            selectedDate={selectedDate}
            onSubmit={handleFormSubmit}
            onBack={handleBackToCalendar}
          />
        </div>
      )}
      
      {currentStep === 'confirmation' && bookingData && (
        <div className="container mx-auto px-6 py-8">
          <ConfirmationScreen 
            bookingData={bookingData}
            onNewBooking={handleNewBooking}
            onGoHome={handleGoHome}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
