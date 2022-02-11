//Doesnt reload in time change
import React from "react";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import InputArea from "./InputArea";
import styled from "styled-components";

const CreateTaskStyled = styled.div`
  display: ${({ open }) => (open ? "none" : "grid")};
  margin: 120px;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 20%;
  border: 5px solid ${({ theme }) => theme.secondaryColor};
  background: ${({ theme }) => theme.bodyBackgroundColor};
  color: ${({ theme }) => theme.bodyFontColor};
  padding: 5px;
  z-index: 1;

  @media (max-width: 905px) {
    margin-top: 150px;
    justify-self: center;
    align-self: center;
  }

  @media (max-width: 768px) {
    margin-top: 150px;
    top: 25%;
    justify-self: center;
  }

  @media (max-width: 520px) {
    margin-top: 260px;
    top: 25%;
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
  menuOpen,
  showTaskbar,
}) {
  const { pathname } = useLocation();
  //Create tasks doesnt show right away on day planner page
  //this if statement makes that happen
  let show = true;
  if (pathname === "/daily" && times.length === 0) {
    show = false;
  }
  //if task is "" error fill in task
  let handleSubmit = e => {
    e.preventDefault();
    if (item.task === "") {
      alert("You did not enter a task please fill this section");
      return;
    }
    //Each section has certain requirements that need to be met
    //when entering a task these ifs make sure those are entered
    if (pathname === "/") {
      setStandard([...standard, item]);
    } else if (pathname === "/daily") {
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
    // resets item to blank after previous item has been added to list
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
  //handles change on form when entering a new item
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
      {/* shows automatically on every page but daily on daily it shows after the hours are scheduled */}
      {show ? (
        <CreateTaskStyled open={menuOpen}>
          <InputArea
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            item={item}
            buttonType="Add Task"
            toggle={toggle}
          />
        </CreateTaskStyled>
      ) : null}
    </>
  );
}

export default CreateTask;
