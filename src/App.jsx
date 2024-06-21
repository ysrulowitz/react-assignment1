import Tasks from "./components/Tasks";
import Login from "./components/LoginPage"
import { useState } from "react";
import { useEffect } from "react";

// const taskList = [{ title: "one", done: false, id: 1, deleted: false }];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [showOnlyDone, setShowOnlyDone] = useState(false);

  async function main() {
    let response = await fetch("http://localhost:3000/tasks");
    setTasks(await response.json())
    console.log(tasks);
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

  const addNewTask = async() => {
    if (newTaskTitle.trim() !== "") {
      const newTask = {
        userId: id,
        title: newTaskTitle,
        done: false,
      };

      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const result = await response.json();
      result.userId = id 
      setTasks((prevTasks) => [...prevTasks, result]);
      setNewTaskTitle("");


      console.log("res",result);
      console.log("tasks",tasks)
    }
  };

  const handleLogin = (userName, userId) => {
    setName(userName);
    setId(userId)
    setIsLoggedIn(true);
  };

  useEffect(() => main(), []); // Empty dependency array ensures this runs only once on mount
  // useEffect(() => {
  //   console.log("tasks updated", tasks);
  // }, [tasks]);
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
            id = {id}
            tasks={tasks.filter((t)=>t.userId === id)}
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
