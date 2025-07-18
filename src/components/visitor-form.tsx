import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { VirtualKeyboard } from "./ui/virtual-keyboard";
import { User, Mail, CreditCard, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface VisitorFormProps {
  selectedDate: Date;
  onSubmit: (formData: FormData) => void;
  onBack: () => void;
}

interface FormData {
  name: string;
  cpf: string;
  celular: string;
  email: string;
}

export function VisitorForm({ selectedDate, onSubmit, onBack }: VisitorFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    cpf: "",
    celular: "",
    email: "",
  });
  const [activeField, setActiveField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateCPF = (cpf: string): boolean => {
    // Remove all non-numeric characters
    const numbers = cpf.replace(/\D/g, "");

    if (numbers.length !== 11) return false;

    // Check if all digits are the same
    if (/^(\d)\1{10}$/.test(numbers)) return false;

    // Validate CPF algorithm
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers[i]) * (10 - i);
    }
    let digit1 = 11 - (sum % 11);
    if (digit1 > 9) digit1 = 0;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers[i]) * (11 - i);
    }
    let digit2 = 11 - (sum % 11);
    if (digit2 > 9) digit2 = 0;

    return parseInt(numbers[9]) === digit1 && parseInt(numbers[10]) === digit2;
  };

  const formatCPF = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[1-9]{2}9\d{8}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFieldFocus = (fieldName: string) => {
    setActiveField(fieldName);
  };

  const handleKeyPress = (key: string) => {
    if (!activeField) return;

    setFormData((prev) => {
      const newData = { ...prev };
      if (activeField === "cpf") {
        const currentNumbers = prev.cpf.replace(/\D/g, "");
        if (currentNumbers.length < 11) {
          newData.cpf = formatCPF(currentNumbers + key);
        }
      } else if (activeField === "name") {
        newData.name = prev.name + key;
      } else if (activeField === "email") {
        newData.email = prev.email + key.toLowerCase();
      } else if (activeField === "celular") {
        const currentNumbers = prev.celular.replace(/\D/g, "");
        if (currentNumbers.length < 11) {
          newData.celular = currentNumbers + key;
          if (newData.celular.length === 11) {
            newData.celular = newData.celular.replace(/(\d{2})(\d{5})(\d{4})/, "$1 $2-$3");
          }
        }
      }
      return newData;
    });

    // Clear error when user starts typing
    if (errors[activeField]) {
      setErrors((prev) => ({ ...prev, [activeField]: "" }));
    }
  };

  const handleBackspace = () => {
    if (!activeField) return;

    setFormData((prev) => ({
      ...prev,
      [activeField]: prev[activeField].slice(0, -1),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres";
    }

    if (!formData.cpf) {
      newErrors.cpf = "CPF é obrigatório";
    } else if (!validateCPF(formData.cpf)) {
      newErrors.cpf = "CPF inválido";
    }

    if (!formData.celular) {
      newErrors.celular = "Celular é obrigatório";
    }

    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Check for duplicate CPF (simulated - will be replaced with Supabase query)
      const existingBookings = JSON.parse(localStorage.getItem("festival-bookings") || "[]");
      const duplicateCPF = existingBookings.find((booking: any) => booking.cpf === formData.cpf.replace(/\D/g, ""));

      if (duplicateCPF) {
        setErrors({ cpf: "CPF já possui agendamento" });
        return;
      }

      onSubmit(formData);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-4">Dados do Visitante</CardTitle>
          <p className="text-xl text-muted-foreground">
            Agendamento para {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-lg font-semibold">
              Nome Completo
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                id="name"
                value={formData.name}
                onFocus={() => handleFieldFocus("name")}
                readOnly
                className={`h-16 text-xl pl-12 cursor-pointer ${errors.name ? "border-destructive" : ""}`}
                placeholder="Toque para digitar seu nome"
              />
            </div>
            {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf" className="text-lg font-semibold">
              CPF
            </Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                id="cpf"
                value={formData.cpf}
                onFocus={() => handleFieldFocus("cpf")}
                readOnly
                className={`h-16 text-xl pl-12 cursor-pointer ${errors.cpf ? "border-destructive" : ""}`}
                placeholder="00000000000"
              />
            </div>
            {errors.cpf && <p className="text-destructive text-sm">{errors.cpf}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg font-semibold">
              Celular
            </Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                id="celular"
                value={formData.celular}
                onFocus={() => handleFieldFocus("celular")}
                readOnly
                className={`h-16 text-xl pl-12 cursor-pointer ${errors.celular ? "border-destructive" : ""}`}
                placeholder="XXXXXXXXXXX"
              />
            </div>
            {errors.celular && <p className="text-destructive text-sm">{errors.celular}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg font-semibold">
              E-mail
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                id="email"
                value={formData.email}
                onFocus={() => handleFieldFocus("email")}
                readOnly
                className={`h-16 text-xl pl-12 cursor-pointer ${errors.email ? "border-destructive" : ""}`}
                placeholder="seu@email.com"
              />
            </div>
            {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
          </div>

          <div className="flex gap-4 pt-6">
            <Button variant="outline" size="lg" onClick={onBack} className="flex-1 h-16 text-lg">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
            <Button onClick={handleSubmit} size="lg" className="flex-1 h-16 text-lg bg-primary hover:bg-primary-hover">
              Confirmar Agendamento
            </Button>
          </div>
        </CardContent>
      </Card>

      <VirtualKeyboard
        isVisible={activeField !== null}
        type={activeField === "name" || activeField === "email" ? "text" : "numeric"}
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
      />

      {activeField && <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setActiveField(null)} />}
    </div>
  );
}
