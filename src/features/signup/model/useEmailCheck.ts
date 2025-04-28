"use client";
import { emailCheck } from "../api/emailCheck";

export function useEmailCheck() {
  return async (email: string) => {
    const success = await emailCheck({ email });
    if (success) {
      return true;
    } else {
      alert("이미 존재하는 email 입니다.");
    }
  };
}
