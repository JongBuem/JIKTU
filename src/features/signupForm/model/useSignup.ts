"use client";
import { useRouter } from "next/navigation";
import { signup } from "../api/signup";

export function useSignup() {
  const router = useRouter();

  return async (email: string, password: string) => {
    const success = await signup({ email, password });
    if (success) {
      router.push("/dashboard");
    } else {
      alert("회원가입 실패");
    }
  };
}
