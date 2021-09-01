//Error in time showing on standard page
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
  times,
  setLeftOvers,
}) {
  const location = useLocation();
  let show = true;
  if (location.pathname === "/daily" && times.length === 0) {
    show = false;
  }
  //if task is "" error fill in task
  let handleSubmit = e => {
    e.preventDefault();
    if (item.task === "") {
      alert("You did not enter a task please fill this section");
      return;
    }
    for (let i = 0; i < daily.length; i++) {
      if (
        `${item.time}:${item.minutes}` ===
        `${daily[i].time}:${daily[i].minutes}`
      ) {
        alert(
          "You already have a task scheduled at this time please try again"
        );
        return;
      }
    }
    if (location.pathname === "/") {
      setStandard([...standard, item]);
    } else if (location.pathname === "/daily") {
      if (item.time === "") {
        alert("You need to fill in a time for your task please try again");
        return;
      }

      setDaily([...daily, item]);
    } else {
      //use to fix am issue
      if (item.important === "") {
        item.important = e.target.important.value;
      }
      if (item.due === "") {
        item.important = e.target.due.value;
      }
      setPriority([...priority, item]);
    }
    setItem({
      id: uuidv4(),
      task: "",
      date: "",
      time: "",
      minutes: "",
      am: "am",
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
    <>
      {show ? (
        <InputArea
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          item={item}
          buttonType="Add Task"
        />
      ) : null}
    </>
  );
}

export default CreateTask;
