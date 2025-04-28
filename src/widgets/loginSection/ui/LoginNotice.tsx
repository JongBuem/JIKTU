import Link from "next/link";

export default function LoginNotice() {
  return (
    <div
      style={{
        fontSize: "0.875rem",
        color: "#666",
        marginTop: "2rem",
        textAlign: "center",
      }}
    >
      아직 계정이 없으신가요?
      <Link href={"/signup/"} style={{ color: "blue" }}>
        {" "}
        회원가입{" "}
      </Link>
      을 이용하세요.
    </div>
  );
}
