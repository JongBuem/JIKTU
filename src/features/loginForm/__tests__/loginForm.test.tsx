import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../index";

const mockPush = jest.fn();
const mockAlert = jest.fn();
const mockLogin = jest.fn().mockImplementation(async () => {
  mockPush("/dashboard");
});

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("../hooks/useLogin", () => ({
  useLogin: () => mockLogin,
}));

window.alert = mockAlert;

const setup = () => {
  render(<LoginForm />);
  const emailInput = screen.getByTestId("email");
  const passwordInput = screen.getByTestId("password");
  const form = screen.getByTestId("form");
  const button = screen.getByTestId("button");
  const user = userEvent.setup();
  return { emailInput, passwordInput, form, button, user };
};

describe("로그인 화면 렌더링", () => {
  it("이메일 입력창이 렌더링되어야 한다", () => {
    const { emailInput } = setup();
    expect(emailInput).toBeInTheDocument();
  });

  it("비밀번호 입력창이 렌더링되어야 한다", () => {
    const { passwordInput } = setup();
    expect(passwordInput).toBeInTheDocument();
  });

  it("로그인 버튼이 렌더링되어야 한다", () => {
    const { button } = setup();
    expect(button).toBeInTheDocument();
  });

  it("로그인 폼이 렌더링되어야 한다", () => {
    const { form } = setup();
    expect(form).toBeInTheDocument();
  });
});

describe("로그인 입력 동작", () => {
  it("이메일과 비밀번호를 입력할 수 있어야 한다", async () => {
    const { emailInput, passwordInput, user } = setup();

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "1234");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("1234");
  });
});

describe("로그인 유효성 검사", () => {
  beforeEach(() => {
    mockLogin.mockClear();
    mockPush.mockClear();
    mockAlert.mockClear();
  });

  it("이메일과 비밀번호가 비어 있을 경우 에러 메시지를 보여줘야 한다", async () => {
    const { button, user } = setup();
    await user.click(button);

    const errorText = screen.getByText(
      /이메일과 비밀번호를 모두 입력해주세요./i,
    );
    expect(errorText).toBeInTheDocument();
  });

  it("이메일 형식이 올바르지 않을 경우 에러 메시지를 보여줘야 한다", async () => {
    const { emailInput, passwordInput, button, user } = setup();
    await user.type(emailInput, "잘못된이메일형식");
    await user.type(passwordInput, "1234");
    await user.click(button);

    const errorText = screen.getByText(/올바른 이메일 형식을 입력해주세요./i);
    expect(errorText).toBeInTheDocument();
  });

  it("입력값이 모두 비어 있을 경우 로그인 함수가 호출되지 않아야 한다", async () => {
    const { button, user } = setup();
    await user.click(button);
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("이메일 형식이 올바르지 않을 경우 로그인 함수가 호출되지 않아야 한다", async () => {
    const { emailInput, passwordInput, button, user } = setup();
    await user.type(emailInput, "잘못된이메일형식");
    await user.type(passwordInput, "1234");
    await user.click(button);
    expect(mockLogin).not.toHaveBeenCalled();
  });
});

describe.each([
  ["test@example.com", "1234"],
  ["another@user.com", "abcd1234"],
])("로그인 제출 (email: %s)", (email, password) => {
  beforeEach(() => {
    mockLogin.mockClear();
    mockPush.mockClear();
    mockAlert.mockClear();
  });

  it("로그인 버튼 클릭 시 로그인 함수가 호출되어야 한다", async () => {
    const { emailInput, passwordInput, button, user } = setup();
    await user.type(emailInput, email);
    await user.type(passwordInput, password);
    await user.click(button);

    expect(mockLogin).toHaveBeenCalledWith(email, password);
  });

  it("폼 제출 시 로그인 함수가 호출되어야 한다", () => {
    const { emailInput, passwordInput, form } = setup();

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    fireEvent.submit(form);

    expect(mockLogin).toHaveBeenCalledWith(email, password);
  });
});

describe("로그인 성공 및 실패 처리", () => {
  beforeEach(() => {
    mockLogin.mockClear();
    mockPush.mockClear();
    mockAlert.mockClear();
  });

  it("로그인 성공 시 /dashboard로 이동해야 한다", async () => {
    const { emailInput, passwordInput, button, user } = setup();
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "1234");
    await user.click(button);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "1234");
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("로그인 실패 시 alert 창이 떠야 한다", async () => {
    mockLogin.mockImplementationOnce(() => {
      alert("로그인 실패");
    });

    const { emailInput, passwordInput, button, user } = setup();
    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(button);

    expect(mockAlert).toHaveBeenCalledWith("로그인 실패");
  });
});
