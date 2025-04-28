"use client";

import { useSignupForm } from "../model/useSignupForm";
import { useEmailCheck } from "../model/useEmailCheck";
import { useSignup } from "../model/useSignup";
import SignupEmailInput from "./SignupEmailInput";
import SignupCheckEmailRedundancyButton from "./SignupCheckEmailRedundancyButton";
import SignupPasswordInput from "./SignupPasswordInput";
import SignupPasswordVerificationInput from "./SignupPasswordVerificationInput";
import SignupSubmitButton from "./SignupSubmitButton";

export default function SignupForm() {
  const emailCheck = useEmailCheck();
  const signup = useSignup();
  const {
    email,
    setEmail,
    password,
    setPassword,
    verificationPassword,
    setVerificationPassword,
    error,
    isEmailValid,
    isValid,
  } = useSignupForm();

  const onEmail = () => {
    if (!isEmailValid()) return;
    emailCheck(email);
  };

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
      <SignupCheckEmailRedundancyButton onClick={onEmail} />
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
