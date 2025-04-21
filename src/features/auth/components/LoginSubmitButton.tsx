interface Props {
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export default function LoginSubmitButton({ onClick }: Props) {
  return (
    <button data-testid="button" type="submit" onClick={onClick}>
      로그인
    </button>
  );
}
