import type { SignupSubmitButtonProps } from "../types";

export default function SignupSubmitButton({
  onClick,
}: SignupSubmitButtonProps) {
  return (
    <button data-testid="button" onClick={onClick}>
      확인
    </button>
  );
}
