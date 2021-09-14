import React, { useState } from "react";
import InputArea from "./InputArea";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const EditTasksStyled = styled.div`
  position: fixed;
  width: 420px;
  height: 200px;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -250px;
  padding: 30px;
  background: #f5f5f5;
  border: 5px solid #314e52;

  > h2 {
    text-align: center;
  }

  @media (max-width: 475px) {
    padding: 30px 30px 100px 30px;
  }
`;
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

  let handleCancel = e => {
    e.preventDefault();
    setList(() => {
      const newList = list.map(task => {
        if (task.id === item.id) {
          task = { ...task, toggle: false };
        }
        return task;
      });
      return newList;
    });
  };
  return (
    <EditTasksStyled>
      <h2 style={{ color: item.color }}>
        {pathname !== "/daily"
          ? `${item.task}  ${item.date}  ${item.time}`
          : `${item.task} - ${item.time}:${item.minutes} ${item.am}   `}
      </h2>
      <InputArea
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        item={tempItem}
        buttonType="Change Task"
        toggle={toggle}
        handleCancel={handleCancel}
      />
    </EditTasksStyled>
  );
};

export default EditTasks;
