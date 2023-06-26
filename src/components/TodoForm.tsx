import { useTodos } from "../hooks/useTodos";

function TodoForm() {
  const { data } = useTodos();
  console.log(data);
  return <div>TodoForm hello world I am live</div>;
}

export default TodoForm;
