export interface LoginEmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface LoginPasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface LoginSubmitButtonProps {
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}
