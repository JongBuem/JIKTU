import type { SignupValidateForm } from "../types";

export function validateSignupForm({
  email,
  password,
  verificationPassword,
}: SignupValidateForm): string | null {
  if (!email || !password) return "이메일과 비밀번호를 모두 입력해주세요.";
  if (password !== verificationPassword)
    return "패스워드가 일치 하지 않습니다.";
  return null;
}
