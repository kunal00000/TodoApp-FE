import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  function getAllTodos() {
    fetch("http://localhost:3000/todos", {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  function postTodos() {
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const description = (
      document.getElementById("description") as HTMLInputElement
    ).value;
    const completed = (document.getElementById("completed") as HTMLInputElement)
      .value;

    fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
        completed: completed,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        getAllTodos();
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }

  function deleteTodo(id: number) {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
        getAllTodos();
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
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
