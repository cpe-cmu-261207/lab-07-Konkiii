import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Home() {
  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    const newTodos = [{ title: todoInput, complete: false }, ...todos];
    setTodos(newTodos);
    setTodoInput("");
  };

  const deleteTodo = (idx) => {
    todos.splice(idx, 1);
    const newTodos = [...todos];
    setTodos(newTodos);
  };

  const markTodo = (idx) => {
    todos[idx].complete = !todos[idx].complete;
    setTodos([...todos]);
  };

  const moveUp = (idx) => {
    if (idx === 0) {
      return;
    } else {
      const temp = [...todos];
      temp[idx] = todos[idx - 1];
      temp[idx - 1] = todos[idx];
      setTodos(temp);
    }
  };

  const moveDown = (idx) => {
    if (idx === todos.length - 1) {
      return;
    } else {
      const temp = [...todos];
      temp[idx] = todos[idx + 1];
      temp[idx + 1] = todos[idx];
      setTodos(temp);
    }
  };

  const onKeyUpHandler = (e) => {
    if (e.key !== "Enter") return;
    const newTodos = [todoInput, ...todos];
    setTodos(newTodos);
    addTodo();
  };

  const saveTodo = () => {
    const todoStr = JSON.stringify(todos);
    localStorage.setItem("Todo List", todoStr);
  };
  useEffect(() => {
    const todoStr = localStorage.getItem("Todo List");
    if (todoStr === null) {
      setTodos([]);
    } else {
      setTodos(JSON.parse(todoStr));
    }
  }, []);

  return (
    <div>
      {/* Entire App container (required for centering) */}
      <div style={{ maxWidth: "700px" }} className="mx-auto">
        {/* App header */}
        <p className="display-4 text-center fst-italic m-4">
          Minimal Todo List <span className="fst-normal">☑️</span>
        </p>
        {/* Input */}
        <input
          className="form-control mb-1 fs-4"
          placeholder="insert todo here..."
          onChange={(e) => setTodoInput(e.target.value)}
          value={todoInput}
          onKeyUp={onKeyUpHandler}
        />

        {/* Todos */}
        <div>
          {todos.map((todo, idx) => (
            <Todo
              title={todo.title}
              complete={todo.complete}
              onDelete={() => deleteTodo(idx)}
              onMark={() => markTodo(idx)}
              onMoveUp={() => moveUp(idx)}
              onMoveDown={() => moveDown(idx)}
              key={idx}
            />
          ))}
        </div>

        {/* summary section */}
        <p className="text-center fs-4">
          <span className="text-primary">All ({todos.length}) </span>
          <span className="text-warning">
            Pending ({todos.filter((x) => x.complete === false).length}){""}
          </span>
          <span className="text-success">
            Completed ({todos.filter((x) => x.complete === true).length})
          </span>
        </p>

        {/* Made by section */}
        <p className="text-center mt-3 text-muted fst-italic">
          made by Pattaraporn Ruensom 640612188
        </p>
      </div>
    </div>
  );
}
