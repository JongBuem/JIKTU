import type { SignupPayload } from "../types";

export function validateSignupForm({
  email,
  password,
}: SignupPayload): string | null {
  if (!email || !password) return "이메일과 비밀번호를 모두 입력해주세요.";
  if (!/\S+@\S+\.\S+/.test(email)) return "올바른 이메일 형식을 입력해주세요.";
  return null;
}
