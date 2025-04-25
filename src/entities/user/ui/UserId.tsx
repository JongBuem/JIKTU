import type { UserIdProps } from "../types";

export default function UserId({ id, fontSize = "1rem" }: UserIdProps) {
  return <span style={{ fontSize, fontWeight: 600 }}>{id}</span>;
}
