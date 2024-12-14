import React, { useState } from 'react';

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const editTask = (index, newText) => {
    const updatedTasks = tasks.map((item, i) =>
      i === index ? { ...item, text: newText } : item
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="h-screen w-full bg-gray-800 p-10 flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-700 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-white mb-4">Task Manager</h1>
        <form onSubmit={submitHandler} className="flex gap-4 mb-6">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Enter your task"
            className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Submit
          </button>
        </form>
        <ul className="space-y-4">
          {tasks.map((item, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-4 rounded shadow ${
                item.completed ? "bg-green-500 text-white" : "bg-gray-600 text-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(index)}
                  className="w-5 h-5"
                />
                {item.completed ? (
                  <span className="line-through">{item.text}</span>
                ) : (
                  <span>{item.text}</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const newText = prompt("Edit your task:", item.text);
                    if (newText !== null && newText.trim() !== "") {
                      editTask(index, newText.trim());
                    }
                  }}
                  className="px-2 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
