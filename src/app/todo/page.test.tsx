import { fireEvent, render, screen } from "@testing-library/react";
import Todo from "./page";

const setup = () => {
  render(<Todo />);
  //getByPlaceholderText 를 사용하여 add To do placehdoler가 있는 input를 가져온다
  const inputEl = screen.getByPlaceholderText("add To do");

  //추가 버튼을 가져온다
  const addButton = screen.getByText("추가");
  return { inputEl, addButton };
};

test("renders to input element to document", () => {
  const { inputEl } = setup();

  //input element 가 돔에 있는지 체크
  expect(inputEl).toBeInTheDocument();
});

test("renders to add Button element to document", () => {
  const { addButton } = setup();

  //추가 버튼이 있는지 체크 한다
  expect(addButton).toBeTruthy();
});

test("submit to todo Add Button empty value input element", () => {
  const { inputEl, addButton } = setup();

  //fireEvent 를 이용하여 input 엘리먼트에 value를 변경해준다
  fireEvent.change(inputEl, { target: { value: "" } });
  //그리고 추가 버튼에 매팅되어있는 onClick 이벤트를 실행한다
  fireEvent.click(addButton);

  //fireEvent 를 이용하여 input 엘리먼트에 value를 변경해준다
  fireEvent.change(inputEl, { target: { value: "test" } });
  //그리고 추가 버튼에 매팅되어있는 onClick 이벤트를 실행한다
  fireEvent.click(addButton);

  //만약 value가 빈값이면 todo가 추가되면 안되기때문에 todo-item의 갯수를 확인한다
  const todoItems = screen.queryAllByTestId("todo-item");
  expect(todoItems.length).toBe(1);
});

test("submit to todo Add button no empty value input element", () => {
  const { inputEl, addButton } = setup();

  //다시 input의 value를 수정하고 추가버튼을 클릭한다
  fireEvent.change(inputEl, { target: { value: "todo1" } });
  fireEvent.click(addButton);

  //돔에 방금 추가한 todo1이 있는지 확인하다
  const todo1Text = screen.getByText("todo1");
  expect(todo1Text).toBeInTheDocument();
});

test("renders to success button in document", () => {
  const { inputEl, addButton } = setup();
  fireEvent.change(inputEl, { target: { value: "todo1" } });
  fireEvent.click(addButton);

  //돔에 todo가 추가되고 완료 버튼도 같이 추가가 되었는지 확인한다
  const submitBtn = screen.queryAllByTestId("todo-submit");
  expect(submitBtn.length).toBe(1);
});

test("renders to delete button in document", () => {
  const { inputEl, addButton } = setup();
  fireEvent.change(inputEl, { target: { value: "todo1" } });
  fireEvent.click(addButton);

  //돔에 todo가 추가되고 삭제 버튼도 같이 추가가 되었는지 확인한다
  const deleteBtn = screen.queryAllByTestId("todo-delete");
  expect(deleteBtn.length).toBe(1);
});

test("click to todo success button", () => {
  const { inputEl, addButton } = setup();
  fireEvent.change(inputEl, { target: { value: "todo1" } });
  fireEvent.click(addButton);

  const submitBtn = screen.queryAllByTestId("todo-submit");
  fireEvent.click(submitBtn[0]);
  const success = screen.queryAllByTestId("todo-success");
  expect(success.length).toBe(1);
});

test("click to todo delete button", () => {
  const { inputEl, addButton } = setup();
  fireEvent.change(inputEl, { target: { value: "todo1" } });
  fireEvent.click(addButton);

  const deleteBtn = screen.queryAllByTestId("todo-delete");
  fireEvent.click(deleteBtn[0]);
  const todoItemsDe = screen.queryAllByTestId("todo-item");
  expect(todoItemsDe.length).toBe(0);
});
