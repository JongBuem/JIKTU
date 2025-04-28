"use client";

import { useSignupForm } from "../model/useSignupForm";
import { useSignup } from "../model/useSignup";
import SignupEmailInput from "./SignupEmailInput";
import SignupPasswordInput from "./SignupPasswordInput";
import SignupPasswordVerificationInput from "./SignupPasswordVerificationInput";
import SignupSubmitButton from "./SignupSubmitButton";
import SignupCheckEmailRedundancyButton from "./SignupCheckEmailRedundancyButton";

export default function SignupForm() {
  const signup = useSignup();
  const {
    email,
    setEmail,
    password,
    setPassword,
    verificationPassword,
    setVerificationPassword,
    error,
    isValid,
  } = useSignupForm();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;
    signup(email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <SignupEmailInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <SignupCheckEmailRedundancyButton onClick={() => console.log("Asd")} />
      <SignupPasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <SignupPasswordVerificationInput
        value={verificationPassword}
        onChange={(e) => setVerificationPassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <SignupSubmitButton onClick={() => onSubmit} />
    </form>
  );
}
