export interface SignupEmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SignupCheckEmailRedundancyButtonProps {
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export interface SignupPasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SignupPasswordVerificationInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SignupSubmitButtonProps {
  onClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}
