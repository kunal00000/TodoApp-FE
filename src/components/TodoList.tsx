import { useTodo } from "../hooks/useTodo";

function TodoList() {
  const { data } = useTodo(2);
  console.log(data);
  return <div>TodoList</div>;
}

export default TodoList;
