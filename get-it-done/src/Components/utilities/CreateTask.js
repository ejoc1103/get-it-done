import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
function CreateTask({
  standard,
  setStandard,
  priority,
  setPriority,
  daily,
  setDaily,
}) {
  const location = useLocation();
  // Use for setting min and max date
  // const date = new Date();
  // const newdate= (date.getMonth() + 1) + '-' + date.getDate() + '-' +  date.getFullYear();
  // const enddate = (date.getMonth() + 1) + '-' + date.getDate() + '-' +  date.getFullYear() + 10
  const [item, setItem] = useState({
    id: uuidv4(),
    task: "",
    date: "",
    time: "",
    color: "red",
    due: "",
    important: "",
    checked: false,
  });
  //if task is "" error fill in task
  let handleSubmit = e => {
    e.preventDefault();

    if (location.pathname === "/") {
      setStandard([...standard, item]);
    } else if (location.pathname === "/daily") {
      setDaily([...daily, item]);
    } else {
      setPriority([...priority, setPriority]);
    }
    setItem({
      id: uuidv4(),
      task: "",
      date: "",
      time: "",
      color: "red",
      due: "",
      important: "",
      checked: false,
    });
  };

  let handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setItem(prevItem => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* always shows */}
        <input
          name="task"
          value={item.task}
          onChange={handleChange}
          placeholder="Task"
        />
        {/* doesnt show for day planner */}
        {location.pathname !== "/daily" ? (
          <input
            type="date"
            name="date"
            value={item.date}
            onChange={handleChange}
            // min and max dates maybe
            // min= {newdate}
            // max= {enddate}
          />
        ) : null}
        {/* always shows */}
        <input
          type="time"
          name="time"
          value={item.time}
          onChange={handleChange}
          placeholder="Time"
        />
        {/* doesnt show for prority */}
        {location.pathname !== "/prioritize" ? (
          <select name="color" onChange={handleChange} id="">
            <option value="red">High Priority</option>
            <option value="black">Regular Task</option>
            <option value="blue">Low Priority</option>
          </select>
        ) : null}
        {/* only shows for priority */}
        {location.pathname === "/prioritize" ? (
          <>
            <select name="important" onChange={handleChange} id="">
              <option value="important">Important</option>
              <option value="not important">Not Important</option>
            </select>
            <select name="due" onChange={handleChange} id="">
              <option value="due soon">Due Soon</option>
              <option value="not due soon">Not Due Soon</option>
            </select>{" "}
          </>
        ) : null}
        <button type="submit" value="Submit">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;
