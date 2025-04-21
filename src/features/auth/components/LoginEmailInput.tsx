interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginEmailInput({ value, onChange }: Props) {
  return (
    <input
      data-testid="email"
      value={value}
      onChange={onChange}
      placeholder="이메일"
    />
  );
}
