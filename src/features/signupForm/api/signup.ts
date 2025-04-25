import { SignupPayload } from "../types";

export async function signup(payload: SignupPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (e) {
    console.error("회원가입 API 에러:", e);
    return false;
  }
}
