import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../components/LoginForm";

const mockPush = jest.fn(); //useRouter.push를 감시할 수 있도록 mock
const mockAlert = jest.fn(); // window.alert mock 처리
const mockLogin = jest.fn().mockImplementation(async () => {
  mockPush("/dashboard");
}); //로그인 성공 시 동작을 흉내냄

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock("../hooks/useLogin", () => ({
  useLogin: () => mockLogin,
}));

window.alert = mockAlert;

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
describe("로그인 환경 테스트", () => {
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
});

describe("로그인 입력폼 테스트", () => {
  test("입력 필드에 값을 입력할 수 있어야 한다", () => {
    const { emailInput, passwordInput } = setup();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("1234");
  });
});

describe("유효성 검사", () => {
  beforeEach(() => {
    mockLogin.mockClear();
    mockPush.mockClear();
    mockAlert.mockClear();
  });

  test("입력값이 없으면 에러 메시지가 표시되어야 한다", () => {
    const { button } = setup();
    fireEvent.click(button);

    const errorText = screen.getByText(
      /이메일과 비밀번호를 모두 입력해주세요./i,
    );
    expect(errorText).toBeInTheDocument();
  });

  test("이메일 형식이 아니면 에러 메시지가 표시되어야 한다", () => {
    const { emailInput, passwordInput, button } = setup();
    fireEvent.change(emailInput, { target: { value: "잘못된이메일형식" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(button);

    const errorText = screen.getByText(/올바른 이메일 형식을 입력해주세요./i);
    expect(errorText).toBeInTheDocument();
  });

  test("빈 입력 상태에서는 login이 호출되지 않아야 한다", () => {
    const { button } = setup();
    fireEvent.click(button);
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test("유효성 실패 시 login이 호출되지 않아야 한다", () => {
    const { emailInput, passwordInput, button } = setup();

    fireEvent.change(emailInput, { target: { value: "잘못된이메일형식" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(button);

    expect(mockLogin).not.toHaveBeenCalled();
  });
});

describe("로그인 제출 동작", () => {
  beforeEach(() => {
    mockLogin.mockClear();
    mockPush.mockClear();
    mockAlert.mockClear();
  });

  test("button 클릭 시 login이 호출되어야 한다", () => {
    const { emailInput, passwordInput, button } = setup();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(button);

    expect(mockLogin).toHaveBeenCalledWith("test@example.com", "1234");
  });

  test("submit 시에도 login이 호출되어야 한다", () => {
    const { emailInput, passwordInput, form } = setup();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });

    fireEvent.submit(form);

    expect(mockLogin).toHaveBeenCalledWith("test@example.com", "1234");
  });
});

describe("로그인 동작", () => {
  beforeEach(() => {
    mockLogin.mockClear();
    mockPush.mockClear();
    mockAlert.mockClear();
  });

  test("로그인 성공 시 '/dashboard'로 이동해야 한다", async () => {
    const { emailInput, passwordInput, button } = setup();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "1234" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "1234");
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  test("로그인 실패 시 alert가 호출되어야 한다", async () => {
    // loginApi가 false를 반환하도록 useLogin도 mock 처리
    mockLogin.mockImplementationOnce(() => {
      alert("로그인 실패");
    });

    const { emailInput, passwordInput, button } = setup();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(button);

    expect(mockAlert).toHaveBeenCalledWith("로그인 실패"); // 사용자의 행동 결과로 alert가 발생했는지 확인
  });
});
