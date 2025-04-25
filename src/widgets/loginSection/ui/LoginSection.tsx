import { LoginForm } from "@/features/loginForm";
import { SignupForm } from "@/features/signupForm";
import LoginBanner from "./LoginBanner";
import LoginNotice from "./LoginNotice";

export default function LoginSection() {
  return (
    <section style={{ maxWidth: 400, margin: "0 auto" }}>
      <LoginBanner />
      <LoginForm />
      <LoginNotice />
      <SignupForm />
    </section>
  );
}
