import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditClick = (todo) => {
    setEditingTodoId(todo.id);
    setEditText(todo.text); // Pre-populate edit field with current text
  };

  const handleSaveClick = () => {
    if (editText) { // Ensure there's actual text before updating
      dispatch(updateTodo({ id: editingTodoId, newText: editText }));
    }
    setEditingTodoId(null);
    setEditText(""); // Reset edit field after saving
  };

  const handleCancelClick = () => {
    setEditingTodoId(null);
    setEditText(""); // Reset edit field on cancellation
  };

  return (
    <>
      <div className=" py-4 px-2 text-xl font-serif text-slate-100 ">Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-gray-700 px-4 py-2 rounded"
            key={todo.id}
          >
            {/* agar editid find toh input field show else edit button show krenge */}
            {editingTodoId === todo.id ? (
              <input
                type="text"
                className="w-full px-2 py-1 border-4 rounded-xxl  border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <div className="text-white text-xl font-serif">{todo.text}</div>
            )}

            <div className="flex items-center">

              {editingTodoId !== todo.id && (
                <button
                  className="text-white bg-blue-500 border-2 rounded-xl py-1 px-4 focus:outline-none hover:bg-blue-600 text-md mr-2"
                  onClick={() => handleEditClick(todo)}
                >
                  Edit
                </button>
              )}

              {editingTodoId === todo.id && (
                <>
                  <button
                    className="text-white bg-green-500 border-2 rounded-xl py-1 px-4 focus:outline-none hover:bg-green-600  text-md mr-2"
                    onClick={handleSaveClick}
                  >
                    Save
                  </button>
                  <button
                    className="text-white bg-red-500 border-2 rounded-xl py-1 px-3 mx-2 focus:outline-none hover:bg-red-600  text-md"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </>
              )}
            
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-2 rounded-xl py-1 px-4 focus:outline-none hover:bg-red-600 text-md"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
