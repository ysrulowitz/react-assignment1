import Tasks from "./components/Tasks";
import { useState } from "react";

const taskList = [
  // { title: "one", done: false, id: 1, deleted: false },
];


function App() {

  const [tasks, setTasks] = useState(taskList);

  const updateTasks = (updatedTaskList) => {
    setTasks(updatedTaskList);
  };

const addNewTask = ()=>{
  const inputElement = document.getElementById("new-task")
  const newTaskTitle = inputElement.value.trim()
  if (newTaskTitle !== ""){
    const newTask = {
      title: newTaskTitle,
      done: false,
      id: tasks.length+1,
      deleted: false,
    }
    setTasks([...tasks, newTask])
    inputElement.value = ""
  }
}

  return (
    <div className="todo-container">
      <div className="input-container">
        <input type="text" id="new-task" placeholder="Add a new task" />
        <button className="add-task" onClick={addNewTask}>+</button>
      </div>
      <Tasks taskList={tasks} setTasks={updateTasks}/>
    </div>
  );
}

export default App;
