import { TodoSchema, Todo } from "@/types/todo";

export async function getAllTodos() {
  try {
    const response = await fetch("http://localhost:3000/todos", {
      method: "GET",
    });

    const data = (await response.json()) satisfies Todo;
    const todosArray = TodoSchema.array().parse(data);
    return todosArray as Todo[];
  } catch (err) {
    console.error(err);
  }
}

export async function getTodoByID(id: number) {
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`);
    const data = await response.json();
    const parsedTodo = TodoSchema.parse(data);
    return parsedTodo;
  } catch (err) {
    console.error(err);
  }
}

export async function postTodos(todo: Todo) {
  // Todo should be parsed while taking input
  try {
    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo.title,
        description: todo.description,
        status: todo.status,
      }),
    });

    const postedTodo = await response.json();
    return postedTodo; // Todo added
  } catch (err) {
    console.error(err);
  }
}

export async function updateTodoByID(newTodo: Todo) {
  // Todo should be parsed while taking input
  try {
    const response = await fetch(`http://localhost:3000/todos/${newTodo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: newTodo.title,
        description: newTodo.description,
        status: newTodo.status,
      }),
    });

    const updatedTodo = await response.json();
    return updatedTodo;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteTodo(id: number) {
  try {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });
    const data = await response.text();
    console.log(data); // Deleted
  } catch (err) {
    console.error(err);
  }
}
