import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Save to localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved) setTodos(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearAll = () => {
    setTodos([]);
  };

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">
        <h1>📝 To-Do List</h1>

        <div className="input-group">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task..."
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />

        <div className="footer">
          <p>
            Completed: {completedCount} / {todos.length}
          </p>
          <button onClick={clearAll} className="clear-btn">
            Clear All
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="mode-btn">
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
