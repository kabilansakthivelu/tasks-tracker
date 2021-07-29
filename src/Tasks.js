import React from "react";
import { FaTimes, FaRegSquare } from "react-icons/fa";
import { useState, useEffect } from "react";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    tasks.map((item) => {
      return completedTaskOnPageLoad(item.id);
    });
  });

  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      let id = localStorage.key(i);
      let task1 = localStorage.getItem(id);
      let task = JSON.parse(task1);
      let obj = {
        id: id,
        task: task.taskName,
        status: task.completedStatus,
      };
      tasks.push(obj);
      setTasks([...tasks]);
    }
  }, []);

  const deletingTask = (id) => {
    localStorage.removeItem(id);
    setTasks(
      tasks.filter((items) => {
        return items.id !== id;
      })
    );
  };

  const completedTaskOnPageLoad = (id) => {
    let test = localStorage.getItem(id);
    let test1 = JSON.parse(test);
    if (test1.completedStatus === "true") {
      document.getElementById(id).style.textDecoration = "line-through";
    }
  };

  const completedTask = (id) => {
    console.log("Hello");
    let test = localStorage.getItem(id);
    let test1 = JSON.parse(test);
    let value1 = test1.taskName;
    if (
      document.getElementById(id).style.textDecoration === "none" &&
      test1.completedStatus === "false"
    ) {
      document.getElementById(id).style.textDecoration = "line-through";
      let completed = "true";
      let value2 = { taskName: value1, completedStatus: completed };
      let value = JSON.stringify(value2);
      localStorage.setItem(id, value);
    } else if (
      document.getElementById(id).style.textDecoration === "" &&
      test1.completedStatus === "false"
    ) {
      document.getElementById(id).style.textDecoration = "line-through";
      let completed = "true";
      let value2 = { taskName: value1, completedStatus: completed };
      let value = JSON.stringify(value2);
      localStorage.setItem(id, value);
    } else if (
      document.getElementById(id).style.textDecoration === "" &&
      test1.completedStatus === "true"
    ) {
      document.getElementById(id).style.textDecoration = "line-through";
      let completed = "true";
      let value2 = { taskName: value1, completedStatus: completed };
      let value = JSON.stringify(value2);
      localStorage.setItem(id, value);
    } else if (
      document.getElementById(id).style.textDecoration === "none" &&
      test1.completedStatus === "true"
    ) {
      document.getElementById(id).style.textDecoration = "line-through";
      let completed = "true";
      let value2 = { taskName: value1, completedStatus: completed };
      let value = JSON.stringify(value2);
      localStorage.setItem(id, value);
    } else {
      let completed = "false";
      let value2 = { taskName: value1, completedStatus: completed };
      let value = JSON.stringify(value2);
      localStorage.setItem(id, value);
      document.getElementById(id).style.textDecoration = "none";
    }
  };

  const submit = () => {
    if (document.getElementById("textArea").value !== "") {
      let key = new Date().getTime().toString();
      let value1 = document.getElementById("textArea").value;
      let completed = "false";
      let value2 = { taskName: value1, completedStatus: completed };
      let value = JSON.stringify(value2);
      localStorage.setItem(key, value);
      document.getElementById("textArea").value = "";
      let obj = {
        id: key,
        task: value1,
        status: completed,
      };
      tasks.push(obj);
      setTasks([...tasks]);
    }
  };

  return (
    <div className="modal">
      <h2 className="header">Tasks To-Do</h2>
      <div className="toAddNew">
        <textarea
          className="textArea"
          id="textArea"
          cols="37"
          rows="2"
          placeholder="Enter your new to-do task..."
        ></textarea>
        <button className="addTask" onClick={submit}>
          Add Task
        </button>
      </div>
      <h3 className="pendingHeader">Pending task/tasks:</h3>
      {localStorage.length === 0 ? (
        <h3 className="noTasks">You have no pending tasks to-do... Enjoy!!!</h3>
      ) : (
        tasks.map((item) => {
          return (
            <p className="taskDetails" id={item.id} key={item.id}>
              <FaRegSquare
                className="doneIcon"
                onClick={() => {
                  completedTask(item.id);
                }}
              />
              {item.task}
              <FaTimes
                className="deleteIcon"
                onClick={() => {
                  deletingTask(item.id);
                }}
              />
            </p>
          );
        })
      )}
    </div>
  );
};

export default Tasks;
