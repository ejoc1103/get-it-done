import React, { useState } from "react";
import InputArea from "./InputArea";
import { useLocation } from "react-router-dom";

const EditTasks = ({ item, setList, list, toggle }) => {
  console.log(toggle);
  const { pathname } = useLocation();
  const [tempItem, setTempItem] = useState({
    id: item.id,
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

  let handleSubmit = e => {
    e.preventDefault();
    console.log(item);
    if (tempItem.task === "") {
      alert("You did not enter a task please fill this section");
      return;
    }

    if (pathname === "/daily") {
      if (tempItem.time === "") {
        alert("You need to fill in a time for your task please try again");
        return;
      }

      if (tempItem.minutes === "") {
        tempItem.minutes = e.target.minutes.value;
      }
      if (tempItem.am === "") {
        tempItem.am = e.target.am.value;
      }

      for (let i = 0; i < list.length; i++) {
        if (
          `${tempItem.time}:${tempItem.minutes}` ===
          `${list[i].time}:${list[i].minutes}`
        ) {
          alert(
            "You already have a task scheduled at this time please try again"
          );
          return;
        }
      }
    }

    if (pathname === "/priority") {
      if (tempItem.important === "") {
        tempItem.important = e.target.important.value;
      }
      if (tempItem.due === "") {
        console.log(e.target.due.value);
        tempItem.due = e.target.due.value;
      }
    }

    setList(() => {
      const newList = list.map(task => {
        if (task.id === item.id) {
          task = tempItem;
        }
        return task;
      });
      return newList;
    });
  };

  let handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setTempItem(prevItem => {
      return { ...prevItem, [name]: value };
    });
  };

  return (
    <InputArea
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      item={tempItem}
      buttonType="Change Task"
      toggle={toggle}
    />
  );
};

export default EditTasks;
