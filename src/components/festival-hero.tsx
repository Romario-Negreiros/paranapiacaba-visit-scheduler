import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Calendar, MapPin, Clock, Thermometer } from 'lucide-react';
import heroImage from '@/assets/festival-hero.jpg';
import activitiesImage from '@/assets/festival-activities.jpg';

interface FestivalHeroProps {
  onStartBooking: () => void;
}

export function FestivalHero({ onStartBooking }: FestivalHeroProps) {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Festival de Inverno
          </h1>
          <h2 className="text-4xl md:text-5xl font-semibold text-secondary mb-6">
            Paranapiacaba
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Venha viver a magia do inverno na histórica vila ferroviária de Paranapiacaba
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src={heroImage} 
            alt="Festival de Inverno de Paranapiacaba" 
            className="w-full h-96 md:h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Uma experiência única no coração da Serra do Mar
            </h3>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Período</h3>
              <p className="text-muted-foreground">Junho a Setembro</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <MapPin className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Local</h3>
              <p className="text-muted-foreground">Vila de Paranapiacaba</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Horário</h3>
              <p className="text-muted-foreground">9h às 17h</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <Thermometer className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Clima</h3>
              <p className="text-muted-foreground">8°C a 18°C</p>
            </CardContent>
          </Card>
        </div>

        {/* Activities Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-12 items-center">
          <div>
            <h3 className="text-4xl font-bold mb-6 text-primary">
              Atrações e Atividades
            </h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-3 flex-shrink-0" />
                <span>Passeios de trem histórico pela Serra do Mar</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-3 flex-shrink-0" />
                <span>Feira de artesanato e produtos locais</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-3 flex-shrink-0" />
                <span>Apresentações culturais e musicais</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-3 flex-shrink-0" />
                <span>Gastronomia típica de inverno</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-3 flex-shrink-0" />
                <span>Visitas guiadas pelo patrimônio histórico</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={activitiesImage} 
              alt="Atividades do Festival" 
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button
            onClick={onStartBooking}
            size="lg"
            className="h-20 px-16 text-2xl font-bold bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent/90 text-white shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <Calendar className="w-8 h-8 mr-4" />
            Agendar Minha Visita
          </Button>
          <p className="text-muted-foreground mt-4 text-lg">
            Toque no botão acima para escolher sua data
          </p>
        </div>
      </div>
    </div>
  );
}