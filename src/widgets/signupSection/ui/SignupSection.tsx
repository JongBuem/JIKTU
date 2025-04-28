import { SignupForm } from "@/features/signup";
import SignupBanner from "./SignupBanner";

export default function SignupSection() {
  return (
    <section style={{ maxWidth: 400, margin: "0 auto" }}>
      <SignupBanner />
      <SignupForm />
    </section>
  );
}
