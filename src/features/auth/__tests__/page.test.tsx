import { fireEvent, render, screen } from "@testing-library/react";
import Login from "../components/LoginForm";

// 랜더링된 컴포넌트의 각 요소를 확인
// data-testid 특정 요소를 명확하게 지정 가능해서 유지보수 편함
const setup = () => {
  render(<Login />);
  const emailInput = screen.getByTestId("email");
  const passwordInput = screen.getByTestId("password");
  const form = screen.getByTestId("form");
  const button = screen.getByTestId("button");
  return { emailInput, passwordInput, form, button };
};

// fireEvent로 사용자의 이용 흐름을 테스트
// describe 블록으로 논리적으로 그룹화
describe("로그인 입력폼 테스트", () => {
  test("이메일 입력창이 렌더링 되어야 한다", () => {
    const { emailInput } = setup();
    expect(emailInput).toBeInTheDocument(); // ← 더 명확한 매칭
  });

  test("비밀번호 입력창이 렌더링 되어야 한다", () => {
    const { passwordInput } = setup();
    expect(passwordInput).toBeInTheDocument(); // ← 더 명확한 매칭
  });

  test("로그인 버튼이 렌더링 되어야 한다", () => {
    const { button } = setup();
    expect(button).toBeInTheDocument(); // ← 더 명확한 매칭
  });

  test("폼이 렌더링 되어야 한다", () => {
    const { form } = setup();
    expect(form).toBeInTheDocument(); // ← 더 명확한 매칭
  });

  test("입력 필드에 값을 입력할 수 있어야 한다", () => {
    const { emailInput, passwordInput } = setup();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("1234");
  });
});
