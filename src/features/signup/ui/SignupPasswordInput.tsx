import type { SignupPasswordInputProps } from "../types";

export default function SignupPasswordInput({
  value,
  onChange,
}: SignupPasswordInputProps) {
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
