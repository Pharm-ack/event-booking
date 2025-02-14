"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { TicketFormData } from "@/types";

interface FormContextType {
  formData: TicketFormData;
  updateFormData: (data: Partial<TicketFormData>) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const initialFormData: TicketFormData = {
  step: 1,
  ticketType: "Free",
  quantity: 1,
  fullName: "",
  email: "",
  avatarUrl: "",
  specialRequest: "",
};

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<TicketFormData>(initialFormData);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ticketFormData");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem("ticketFormData", JSON.stringify(formData));
    }
  }, [formData, hasMounted]);

  const updateFormData = (data: Partial<TicketFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    localStorage.removeItem("ticketFormData");
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, resetForm }}>
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }
  return context;
}
