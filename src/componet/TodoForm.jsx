import React, { useState } from "react";
import { useTodo } from "./contexts/TodoContext";

/**
 * TodoForm component for adding new todos.
 *
 * @returns {JSX.Element} A form for adding new todos.
 */
function TodoForm() {
  /**
   * State hook for managing the todo input.
   */
  const [todo, setTodo] = useState("");

  /**
   * Context hook for accessing the addTodo function from the TodoContext.
   */
  const { addTodo } = useTodo();

  /**
   * Event handler for the form submission.
   *
   * @param {React.FormEvent} e The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo) return;

    /**
     * Adds the new todo to the TodoContext.
     *
     * @param {Object} todo The new todo object with 'todo' and 'completed' properties.
     */
    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <input
        type="text"
        placeholder="What is on your mind"
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
