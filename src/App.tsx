import React from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./styles/App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/todos"
        element={
          <React.Fragment>
            <TodoForm />
          </React.Fragment>
        }
      />
      <Route
        path="/todo"
        element={
          <React.Fragment>
            <TodoList />
          </React.Fragment>
        }
      />
      <Route
        path="/"
        element={
          <React.Fragment>
            <TodoForm />
          </React.Fragment>
        }
      />
    </Routes>
  );
}

export default App;
