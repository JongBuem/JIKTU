import type { SignupSubmitButtonProps } from "../types";

export default function SignupSubmitButton({
  onClick,
}: SignupSubmitButtonProps) {
  return (
    <button data-testid="button" type="submit" onClick={onClick}>
      로그인
    </button>
  );
}
