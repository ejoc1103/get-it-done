import React from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import InputArea from "./InputArea";
function CreateTask({
  standard,
  setStandard,
  priority,
  setPriority,
  daily,
  setDaily,
  item,
  setItem,
}) {
  const location = useLocation();
  // Use for setting min and max date
  // const date = new Date();
  // const newdate= (date.getMonth() + 1) + '-' + date.getDate() + '-' +  date.getFullYear();
  // const enddate = (date.getMonth() + 1) + '-' + date.getDate() + '-' +  date.getFullYear() + 10
  //if task is "" error fill in task
  let handleSubmit = e => {
    e.preventDefault();
    if (item.task === "") {
      alert("You did not enter a task please fill this section");
      return;
    }
    if (location.pathname === "/") {
      setStandard([...standard, item]);
    } else if (location.pathname === "/daily") {
      setDaily([...daily, item]);
    } else {
      setPriority([...priority, item]);
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
      toggle: false,
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
    <InputArea
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      item={item}
      buttonType="Add Task"
    />
  );
}

export default CreateTask;
