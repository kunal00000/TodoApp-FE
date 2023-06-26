import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  async function getAllTodos() {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "GET",
      });
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function postTodos() {
    try {
      const title = (document.getElementById("title") as HTMLInputElement)
        .value;
      const description = (
        document.getElementById("description") as HTMLInputElement
      ).value;
      const completed = (
        document.getElementById("completed") as HTMLInputElement
      ).value;

      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          completed: completed,
        }),
      });
      const data = await response.json();
      console.log(data);
      getAllTodos();
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteTodo(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      const data = await response.text();
      console.log(data);
      getAllTodos();
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className="card">
      <div className="card-header border-black">Todo List</div>
      <div className="card-body">
        <ul className="list-group">
          {todos.map((todo: any) => (
            <li className="list-group-item" key={todo.id}>
              {todo.title}
              {todo.completed ? (
                <span className="badge bg-success rounded-pill float-end">
                  Completed
                </span>
              ) : (
                <span className="badge bg-danger rounded-pill float-end">
                  Pending
                </span>
              )}
              {todo.description && <p className="mt-2">{todo.description}</p>}
              <button
                onClick={() => {
                  deleteTodo(todo.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <input type="text" id="title" />
      <input type="text" id="description" />
      <select id="completed">
        <option value="true">Completed</option>
        <option value="false">Pending</option>
      </select>

      <button onClick={postTodos}>Post Todo</button>
    </div>
  );
}

export default App;
