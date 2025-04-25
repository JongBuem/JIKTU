import type { UserNameProps } from "../types";

export default function UserName({ name, fontSize = "1rem" }: UserNameProps) {
  return <span style={{ fontSize, fontWeight: 600 }}>{name}</span>;
}
