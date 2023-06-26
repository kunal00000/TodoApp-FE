import { TodoSchema, Todo } from "../types/todo";

const API_BASE_URL = "http://localhost:3000";

export async function getAllTodos() {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: "GET",
    });

    const data = (await response.json()) satisfies Todo;
    const todosArray = TodoSchema.array().parse(data);
    return todosArray as Todo[];
  } catch (err) {
    return err;
  }
}

export async function getTodoByID(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`);
    const data = await response.json();
    const parsedTodo = TodoSchema.parse(data);
    return parsedTodo;
  } catch (err) {
    return err;
  }
}

export async function postTodos(todo: Todo) {
  // Todo should be parsed while taking input
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
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
    // Todo: Show success Notification
    const postedTodo = await response.json();
    return postedTodo; // Todo added
  } catch (err) {
    return err;
  }
}

export async function updateTodoByID(newTodo: Todo) {
  // Todo should be parsed while taking input
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${newTodo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: newTodo.title,
        description: newTodo.description,
        status: newTodo.status,
      }),
    });
    // Todo: Show success Notification

    const updatedTodo = await response.json();
    return updatedTodo;
  } catch (err) {
    return err;
  }
}

export async function deleteTodo(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    // Todo: Show success Notification
    const data = await response.text();
    console.log(data); // Deleted
  } catch (err) {
    return err;
  }
}
