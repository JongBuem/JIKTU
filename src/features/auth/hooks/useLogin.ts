import { useRouter } from "next/navigation";
import { loginApi } from "../services/authApi";

export function useLogin() {
  const router = useRouter();

  return async (email: string, password: string) => {
    const success = await loginApi({ email, password });
    if (success) {
      router.push("/dashboard");
    } else {
      alert("로그인 실패");
    }
  };
}
