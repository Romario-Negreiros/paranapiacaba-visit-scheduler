import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, Calendar, User, Mail, Home, RotateCcw, QrCode } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ConfirmationScreenProps {
  bookingData: {
    name: string;
    cpf: string;
    email: string;
    date: Date;
    protocol: string;
  };
  onNewBooking: () => void;
  onGoHome: () => void;
}

export function ConfirmationScreen({ bookingData, onNewBooking, onGoHome }: ConfirmationScreenProps) {
  const handleSupportQR = () => {
    // This would open WhatsApp or show QR code for support
    window.open('https://wa.me/5511999999999?text=Olá, preciso de ajuda com meu agendamento do Festival de Inverno de Paranapiacaba', '_blank');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg border-success border-2">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-20 h-20 text-success" />
          </div>
          <CardTitle className="text-4xl text-success mb-4">
            Agendamento Confirmado!
          </CardTitle>
          <p className="text-xl text-muted-foreground">
            Seu agendamento foi realizado com sucesso
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Protocolo de Agendamento</h3>
              <p className="text-3xl font-mono font-bold text-primary bg-background px-4 py-2 rounded-lg inline-block">
                {bookingData.protocol}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
              <User className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Visitante</p>
                <p className="font-semibold">{bookingData.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-card rounded-lg border">
              <Calendar className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Data da Visita</p>
                <p className="font-semibold">
                  {format(bookingData.date, "dd/MM/yyyy - EEEE", { locale: ptBR })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-card rounded-lg border md:col-span-2">
              <Mail className="w-6 h-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">E-mail de Confirmação</p>
                <p className="font-semibold">{bookingData.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <h4 className="font-semibold text-accent mb-2">Informações Importantes:</h4>
            <ul className="text-sm space-y-1 text-accent-foreground">
              <li>• Chegue 30 minutos antes do horário agendado</li>
              <li>• Traga documento de identidade original</li>
              <li>• O protocolo deve ser apresentado na entrada</li>
              <li>• Em caso de chuva, consulte nossa programação especial</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            <Button
              variant="outline"
              size="lg"
              onClick={handleSupportQR}
              className="h-16 text-lg"
            >
              <QrCode className="w-5 h-5 mr-2" />
              Suporte
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={onNewBooking}
              className="h-16 text-lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Novo Agendamento
            </Button>
            
            <Button
              onClick={onGoHome}
              size="lg"
              className="h-16 text-lg bg-primary hover:bg-primary-hover"
            >
              <Home className="w-5 h-5 mr-2" />
              Tela Inicial
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}