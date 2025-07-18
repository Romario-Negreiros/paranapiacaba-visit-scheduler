import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ChevronLeft, ChevronRight, Calendar, Users } from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay, isAfter, startOfToday, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface KioskCalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date | null;
}

// Get availability from localStorage (simulated data - will be replaced with Supabase)
const getAvailableSlots = (date: Date): number => {
  const dateStr = date.toISOString().split('T')[0];
  const availability = JSON.parse(localStorage.getItem('festival-availability') || '{}');
  return availability[dateStr] || 0;
};

export function KioskCalendar({ onDateSelect, selectedDate }: KioskCalendarProps) {
  const [currentWeek, setCurrentWeek] = useState(startOfWeek(new Date()));
  const today = startOfToday();

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i));

  const goToPreviousWeek = () => {
    setCurrentWeek(addDays(currentWeek, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addDays(currentWeek, 7));
  };

  const isDateSelectable = (date: Date) => {
    return !isBefore(date, today);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Button
          variant="outline"
          size="lg"
          onClick={goToPreviousWeek}
          className="h-16 px-6"
        >
          <ChevronLeft className="w-6 h-6 mr-2" />
          Semana Anterior
        </Button>
        
        <h2 className="text-2xl font-bold text-center">
          {format(currentWeek, 'MMM yyyy', { locale: ptBR }).toUpperCase()}
        </h2>
        
        <Button
          variant="outline"
          size="lg"
          onClick={goToNextWeek}
          className="h-16 px-6"
        >
          Próxima Semana
          <ChevronRight className="w-6 h-6 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((date, index) => {
          const isSelectable = isDateSelectable(date);
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const availableSlots = getAvailableSlots(date);
          const isToday = isSameDay(date, today);

          return (
            <Card key={index} className="p-1">
              <Button
                variant={isSelected ? "default" : "ghost"}
                className={`w-full h-32 flex flex-col items-center justify-center gap-2 ${
                  !isSelectable 
                    ? 'opacity-50 cursor-not-allowed' 
                    : isToday 
                    ? 'ring-2 ring-primary ring-offset-2' 
                    : ''
                } ${
                  availableSlots === 0 ? 'bg-destructive/10 text-destructive' : ''
                }`}
                onClick={() => isSelectable && availableSlots > 0 && onDateSelect(date)}
                disabled={!isSelectable || availableSlots === 0}
              >
                <Calendar className="w-6 h-6" />
                <span className="text-lg font-bold">
                  {format(date, 'd', { locale: ptBR })}
                </span>
                <span className="text-sm">
                  {format(date, 'EEE', { locale: ptBR }).toUpperCase()}
                </span>
                <div className="flex items-center gap-1 text-xs">
                  <Users className="w-3 h-3" />
                  <span className={availableSlots === 0 ? 'text-destructive' : 'text-success'}>
                    {availableSlots === 0 ? 'Lotado' : `${availableSlots} vagas`}
                  </span>
                </div>
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}