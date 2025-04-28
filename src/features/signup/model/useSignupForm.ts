"use client";
import { useState } from "react";
import { validateSignupForm } from "../lib/validateForm";

export function useSignupForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [verificationPassword, setVerificationPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const isValid = () => {
    const errorMessage = validateSignupForm({
      email,
      password,
      verificationPassword,
    });
    setError(errorMessage);
    return !errorMessage;
  };
  return {
    email,
    password,
    verificationPassword,
    setEmail,
    setPassword,
    setVerificationPassword,
    error,
    isValid,
  };
}
