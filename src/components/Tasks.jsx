import "./style.css";
import Task from "./Task";
import { useState } from "react";



export default function Tasks(props) {
  const tasks = props.taskList;
  const setTasks = props.setTasks
  const [showOnlyDone, setShowOnlyDone] = useState(false);

  const deleteTask = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, deleted: true } : task))
    );
  };

  const doneTask = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, done: true } : task))
    );
  };

  const toggleShowOnlyDone = () => {
    setShowOnlyDone(!showOnlyDone);
  };

  return (
    <>
      <div id="todo-list">
        {tasks
          .filter((t) => !t.deleted && (!showOnlyDone || t.done))
          .map((t) => (
            <Task
              key={t.id}
              title={t.title}
              done={t.done}
              doneTask ={doneTask}
              id={t.id}
              deleteTask={deleteTask}
            />
          ))}
      </div>
      <button className="toggleDone" onClick={toggleShowOnlyDone}>
        {showOnlyDone ? "Show All" : "Show Only Done"}
      </button>
    </>
  );
}
