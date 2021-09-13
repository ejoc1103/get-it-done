//Doesnt reload in time change
import React from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import InputArea from "./InputArea";
import styled from "styled-components";

const CreateTaskStyled = styled.div`
  display: grid;
  margin: 120px;

  @media (max-width: 768px) {
    margin-top: 150px;
  }

  @media (max-width: 475px) {
    margin-top: 260px;
    justify-self: center;
  }
`;

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
  toggle,
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

    if (location.pathname === "/") {
      setStandard([...standard, item]);
    } else if (location.pathname === "/daily") {
      if (item.time === "") {
        alert("You need to fill in a time for your task please try again");
        return;
      }
      if (item.minutes === "") {
        item.minutes = e.target.minutes.value;
      }
      if (item.am === "") {
        item.am = e.target.am.value;
      }

      for (let i = 0; i < daily.length; i++) {
        if (
          `${item.time}:${item.minutes}${item.am}` ===
          `${daily[i].time}:${daily[i].minutes}${daily[i].am}`
        ) {
          alert(
            "You already have a task scheduled at this time please try again"
          );
          return;
        }
      }
      setDaily([...daily, item]);
    } else {
      if (item.important === "") {
        item.important = e.target.important.value;
      }
      if (item.due === "") {
        item.due = e.target.due.value;
      }

      setPriority([...priority, item]);
    }
    setItem({
      id: uuidv4(),
      task: "",
      date: "",
      time: "",
      minutes: "",
      am: "",
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
    <CreateTaskStyled>
      {show ? (
        <InputArea
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          item={item}
          buttonType="Add Task"
          toggle={toggle}
        />
      ) : null}
    </CreateTaskStyled>
  );
}

export default CreateTask;
