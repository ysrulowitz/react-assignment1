import Tasks from "./components/Tasks";
import Login from "./components/LoginPage"
import { useState } from "react";
import { useEffect } from "react";

// const taskList = [{ title: "one", done: false, id: 1, deleted: false }];
let taskList = [];
let userNames = [];



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [tasks, setTasks] = useState(taskList);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showOnlyDone, setShowOnlyDone] = useState(false);

  async function main() {
    let response = await fetch("http://localhost:3000/tasks");
    taskList = await response.json();
    setTasks(taskList)
    console.log(taskList);
  
    let response2 = await fetch("http://localhost:3000/userNames");
    userNames = await response2.json();
    console.log(userNames);
  
  }

  const updateTasks = (updatedTaskList) => {
    setTasks(updatedTaskList);
  };

  const inputChange = (event) => {
    setNewTaskTitle(event.target.value);
  };

  const toggleShowOnlyDone = () => {
    setShowOnlyDone(!showOnlyDone);
  };

  const addNewTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTask = {
        title: newTaskTitle,
        done: false,
        id: tasks.length + 1,
        deleted: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    }
  };

  const handleLogin = (userName) => {
    setName(userName);
    setIsLoggedIn(true);
  };

  useEffect(() => main(), []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      {isLoggedIn ? (
        <div className="todo-container">
          <h1 id="app-title"> To Do App</h1>

          <div className="input-container">
            <input
              type="text"
              id="new-task"
              placeholder="Add a new task"
              onChange={inputChange}
              value={newTaskTitle}
            />
            <button className="add-task" onClick={addNewTask}>
              +
            </button>
          </div>
          <Tasks
            tasks={tasks}
            setTasks={updateTasks}
            showOnlyDone={showOnlyDone}
          />
          <button className="toggleDone" onClick={toggleShowOnlyDone}>
            {showOnlyDone ? "Show All" : "Show Only Done"}
          </button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;
