interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LoginPasswordInput({ value, onChange }: Props) {
  return (
    <input
      data-testid="password"
      type="password"
      value={value}
      onChange={onChange}
      placeholder="비밀번호"
    />
  );
}
