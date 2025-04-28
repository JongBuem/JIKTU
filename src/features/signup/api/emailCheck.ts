import { EmailCheckPayload } from "../types";

export async function emailCheck(payload: EmailCheckPayload): Promise<boolean> {
  try {
    const res = await fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (e) {
    console.error("이메일 확인 API 에러:", e);
    return false;
  }
}
