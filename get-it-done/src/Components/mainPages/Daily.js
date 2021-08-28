import React, { useState } from "react";
import EditTasks from "../utilities/EditTasks";
import { useLocation } from "react-router-dom";
const Daily = ({ daily, setDaily, setItem, setTimes, times }) => {
  const location = useLocation();
  let onCheck = e => {
    let editArr = daily.map(item => {
      let update = { ...item, checked: !item.checked };

      if (`${item.id}` === e.target.id) {
        return update;
      } else {
        return item;
      }
    });
    setDaily(editArr);
  };

  let handleSubmit = e => {
    e.preventDefault();

    setTimes(prevState => {
      return [...prevState, 1];
    });
    console.log(e.target);
  };

  let handleChange = () => {
    console.log("Yo momma");
  };

  let onDelete = e => {
    console.log(e.target.id);
    let editArr = daily.filter(item => item.id !== e.target.id);
    setDaily(editArr);
  };

  let onEdit = e => {
    let editArr = daily.map(item => {
      let update = { ...item, toggle: !item.toggle };

      if (`${item.id}` === e.target.id) {
        return update;
      } else {
        return item;
      }
    });
    setDaily(editArr);
  };
  return (
    <div>
      <h1>Daily Tasks</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="number"
            name="start"
            // value={item.time}
            // onChange={handleChange}
            placeholder="Start"
            min="1"
            max="12"
          />
          <select name="am" onChange={handleChange} id="">
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
          <input
            type="number"
            name="end"
            // value={item.minutes}
            // onChange={handleChange}
            placeholder="End"
            min="1"
            max="12"
          />
          <select name="am" onChange={handleChange} id="">
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </select>
          <input type="submit" />
        </div>
      </form>
      <div style={{ border: "2px black solid" }}>
        {daily.map(
          ({ id, task, date, time, color, checked, toggle }, index) => {
            console.log(time);
            return (
              <div key={id}>
                <input
                  type="checkbox"
                  id={id}
                  onChange={onCheck}
                  checked={checked}
                  value={checked}
                />
                {checked === false ? (
                  <label style={{ color: color }}>
                    {task + " " + date + " " + time + " "}
                  </label>
                ) : (
                  <label
                    style={{ color: color, textDecoration: "line-through" }}
                  >
                    {task + " " + date + " " + time + " "}
                  </label>
                )}

                <button onClick={onDelete} id={id}>
                  Delete
                </button>
                <button onClick={onEdit} id={id}>
                  Edit
                </button>
                {toggle ? (
                  <EditTasks
                    item={daily[index]}
                    list={daily}
                    setItem={setItem}
                    setList={setDaily}
                    onEdit={onEdit}
                    location={location}
                  />
                ) : null}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Daily;
