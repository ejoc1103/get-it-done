import React, { useState } from "react";
import InputArea from "./InputArea";
const EditTasks = ({ item, setList, list, setItem }) => {
  const [tempItem, setTempItem] = useState({
    id: item.id,
    task: "",
    date: "",
    time: "",
    color: "red",
    due: "",
    important: "",
    checked: false,
    toggle: false,
  });
  let handleSubmit = e => {
    e.preventDefault();

    setList(() => {
      const newList = list.map(task => {
        if (task.id === item.id) {
          task = tempItem;
        }
        return task;
      });
      return newList;
    });
    // setItem({
    //   id: uuidv4(),
    //   task: "",
    //   date: "",
    //   time: "",
    //   color: "red",
    //   due: "",
    //   important: "",
    //   checked: false,
    //   toggle: false,
    // });
  };

  let handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setTempItem(prevItem => {
      return { ...prevItem, [name]: value };
    });
    // setItem(prevItem => {
    //   return {
    //     ...prevItem,
    //     [name]: value,
    //   };
    // });
    console.log(e.target);
    console.log(tempItem.task);
  };

  return (
    <InputArea
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      item={tempItem}
      buttonType="Change Task"
    />
  );
};

export default EditTasks;
