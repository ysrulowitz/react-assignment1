import "./style.css";
import Task from "./Task";
import { useState } from "react";



export default function Tasks(props) {

const {tasks, setTasks} = props


  const deleteTask = async(id) => {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "delete",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({userId: props.id})
      });

      const result = await response.json();
      console.log(result);

    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, deleted: true } : task))
    );
  };

  const doneTask = async(id) => {

    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({userId: props.id})
      });

      const result = await response.json();
      console.log(result);

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
