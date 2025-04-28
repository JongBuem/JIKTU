import type { LoginPasswordInputProps } from "../types";

export default function LoginPasswordInput({
  value,
  onChange,
}: LoginPasswordInputProps) {
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
