import "./style.css";
import Task from "./Task";
import { useState } from "react";



export default function Tasks(props) {

const {tasks, setTasks} = props


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

  const filteredTasks = tasks.filter((t)=> !t.deleted && (!props.showOnlyDone || t.done))


  return (
      <div id="todo-list">
        {filteredTasks
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
  );
}
