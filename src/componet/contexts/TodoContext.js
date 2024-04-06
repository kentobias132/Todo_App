import { useContext, createContext } from "react";

export const TodoContex = createContext({
  todos: [
    {
      id: 1,
      todo: "test",
      completed: false,
    },
  ],
  addTodos: (todo) => {},
  deleteTodo: (id) => {},
  isCompleted: (id) => {},
  editTodo: (id, todo) => {},
});

export const TodoProvider = TodoContex.Provider;

export const useTodo = () => {
  return useContext(TodoContex);
};
