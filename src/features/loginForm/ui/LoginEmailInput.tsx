import type { LoginEmailInputProps } from "../types";

export default function LoginEmailInput({
  value,
  onChange,
}: LoginEmailInputProps) {
  return (
    <input
      data-testid="email"
      value={value}
      onChange={onChange}
      placeholder="이메일"
    />
  );
}
