import React from "react";
import { useLocation } from "react-router-dom";

const InputArea = ({ handleChange, handleSubmit, item, buttonType }) => {
  const location = useLocation();
  console.log(location.pathname)
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
        {location.pathname === "/daily" ? (
          <div>
            <input
              type="number"
              name="time"
              value={item.time}
              onChange={handleChange}
              placeholder="Hour"
              min="5"
              max="11"
            />{" "}
            <input
              type="number"
              name="minutes"
              value={item.minutes}
              onChange={handleChange}
              placeholder="Minute"
            />
            <select name="am" onChange={handleChange} id="">
              <option value="am">AM</option>
              <option value="pm">PM</option>
            </select>
          </div>
        ) : (
          <input
            type="time"
            name="time"
            value={item.time}
            onChange={handleChange}
            placeholder="Time"
          />
        )}

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
          {buttonType}
        </button>
      </form>
    </div>
  );
};

export default InputArea;
