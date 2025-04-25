import type { UserEmailProps } from "../types";

export default function UserEmail({
  email,
  fontSize = "1rem",
}: UserEmailProps) {
  return <span style={{ fontSize, fontWeight: 600 }}>{email}</span>;
}
