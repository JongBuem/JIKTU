import { LoginPayload } from "../types/auth";

export async function loginApi(payload: LoginPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (e) {
    console.error("로그인 API 에러", e);
    return false;
  }
}
