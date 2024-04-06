import { useEffect, useState } from "react";

import { TodoProvider } from "./componet/contexts/TodoContext";
import TodoForm from "./componet/TodoForm";
import TodoItem from "./componet/TodoItem";

/**
 * The main component of the application.
 * It manages the state of todos and provides functions to manipulate them.
 * @returns {JSX.Element} The JSX representation of the application.
 */
function App() {
  /**
   * The state of todos.
   * @type {Todo[]}
   */
  const [todos, setTodos] = useState([]);

  /**
   * Adds a new todo to the state.
   * @param {Todo} todo The new todo to be added.
   */
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  /**
   * Deletes a todo from the state.
   * @param {number} id The id of the todo to be deleted.
   */
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  /**
   * Edits a todo in the state.
   * @param {number} id The id of the todo to be edited.
   * @param {Todo} todo The new values for the todo.
   */
  const editTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((eachTodo) => (eachTodo.id === id ? todo : eachTodo))
    );
  };

  /**
   * Toggles the completed status of a todo in the state.
   * @param {number} id The id of the todo to be toggled.
   */
  const isCompleted = (id) => {
    setTodos((prev) =>
      prev.map((eachTodo) =>
        eachTodo.id === id
          ? { ...eachTodo, completed: !eachTodo.completed }
          : eachTodo
      )
    );
  };

  /**
   * UseEffect hook to load todos from local storage on component mount.
   */
  useEffect(() => {
    const todo = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todo);
    }
  }, []);

  /**
   * UseEffect hook to save todos to local storage on state update.
   */
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, editTodo, isCompleted }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
    </TodoProvider>
  );
}

export default App;
