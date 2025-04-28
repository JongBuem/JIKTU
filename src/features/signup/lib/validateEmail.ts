import type { SignupValidateEmail } from "../types";

export function validateEmail({ email }: SignupValidateEmail): string | null {
  if (!/\S+@\S+\.\S+/.test(email)) return "올바른 이메일 형식을 입력해주세요.";
  return null;
}
