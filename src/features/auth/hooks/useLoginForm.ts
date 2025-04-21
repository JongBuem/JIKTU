import { useState } from "react";

export function useLoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const isValid = (): boolean => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return false;
    }
    // 간단한 이메일 형식 체크
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return false;
    }
    setError(null);
    return true;
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isValid,
  };
}
