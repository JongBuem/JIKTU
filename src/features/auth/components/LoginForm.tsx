"use client";

import { useLoginForm } from "../hooks/useLoginForm";
import { useLogin } from "../hooks/useLogin";
import LoginEmailInput from "./LoginEmailInput";
import LoginPasswordInput from "./LoginPasswordInput";
import LoginSubmitButton from "./LoginSubmitButton";

export default function LoginForm() {
  const { email, setEmail, password, setPassword, error, isValid } =
    useLoginForm();
  const login = useLogin();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;
    login(email, password);
  };

  return (
    <form onSubmit={onSubmit} data-testid="form">
      <LoginEmailInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <LoginPasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <LoginSubmitButton />
    </form>
  );
}
