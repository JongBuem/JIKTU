"use client";
import { useRouter } from "next/navigation";
import { login } from "../api/login";

export function useLogin() {
  const router = useRouter();

  return async (email: string, password: string) => {
    const success = await login({ email, password });
    if (success) {
      router.push("/dashboard");
    } else {
      alert("로그인 실패");
    }
  };
}
