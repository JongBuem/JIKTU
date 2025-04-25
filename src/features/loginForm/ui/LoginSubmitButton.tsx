import type { LoginSubmitButtonProps } from "../types";

export default function LoginSubmitButton({ onClick }: LoginSubmitButtonProps) {
  return (
    <button data-testid="button" type="submit" onClick={onClick}>
      로그인
    </button>
  );
}
