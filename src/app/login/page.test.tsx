import { fireEvent, render, screen } from "@testing-library/react";
import Logtin from "./page";

const setup = () => {
  render(<Logtin />);
  const emailInput = screen.getByTestId("email");
  const passwordInput = screen.getByTestId("password");

  const form = screen.getByTestId("login-form");
  return { emailInput, passwordInput, form };
};

test("renders to emailInput element to document", () => {
  const { emailInput } = setup();

  //input element 가 돔에 있는지 체크
  expect(emailInput).toBeInTheDocument();
});

test("renders to passwordInput element to document", () => {
  const { passwordInput } = setup();

  //input element 가 돔에 있는지 체크
  expect(passwordInput).toBeInTheDocument();
});

test("renders to add form element to document", () => {
  const { form } = setup();

  expect(form).toBeTruthy();
});

test("로그인 입력 필드에 값을 입력할 수 있어야 한다", async () => {
  const { emailInput, passwordInput } = setup();
  // 또는 name 속성 기반으로 찾고 싶다면
  // const emailInput = screen.getByDisplayValue((_, el) => el.getAttribute("name") === "email");

  fireEvent.change(emailInput, "test@example.com");
  fireEvent.change(passwordInput, "1234");

  //   expect(emailInput).toHaveValue("test@example.com");
  //   expect(passwordInput).toHaveValue("1234");
});
