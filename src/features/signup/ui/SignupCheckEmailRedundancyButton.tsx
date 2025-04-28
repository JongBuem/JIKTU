import type { SignupCheckEmailRedundancyButtonProps } from "../types";

export default function SignupCheckEmailRedundancyButton({
  onClick,
}: SignupCheckEmailRedundancyButtonProps) {
  return (
    <button
      type="button"
      data-testid="checkEmailRedundancyButton"
      onClick={onClick}
    >
      확인
    </button>
  );
}
