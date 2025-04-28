"use client";
import { useState } from "react";
import { validateSignupForm } from "../lib/validateForm";

export function useLoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const isValid = () => {
    const errorMessage = validateSignupForm({ email, password });
    setError(errorMessage);
    return !errorMessage;
  };
  return { email, password, setEmail, setPassword, error, isValid };
}
