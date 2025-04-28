import type { SignupValidate } from "../types";
import { validateEmail } from "./validateEmail";

export function validateSignupForm({
  email,
  password,
  verificationPassword,
}: SignupValidate): string | null {
  if (!email || !password) return "이메일과 비밀번호를 모두 입력해주세요.";
  if (password !== verificationPassword)
    return "패스워드가 일치 하지 않습니다.";
  if (!validateEmail(email)) return "올바른 이메일 형식을 입력해주세요.";
  return null;
}
