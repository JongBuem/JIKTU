import type { SignupPasswordVerificationInputProps } from "../types";

export default function SignupPasswordVerificationInput({
  value,
  onChange,
}: SignupPasswordVerificationInputProps) {
  return (
    <input
      data-testid="password"
      type="password"
      value={value}
      onChange={onChange}
      placeholder="비밀번호"
    />
  );
}
