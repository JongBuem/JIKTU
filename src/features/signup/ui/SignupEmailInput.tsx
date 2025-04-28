import type { SignupEmailInputProps } from "../types";

export default function SignupEmailInput({
  value,
  onChange,
}: SignupEmailInputProps) {
  return <input value={value} onChange={onChange} placeholder="이메일" />;
}
