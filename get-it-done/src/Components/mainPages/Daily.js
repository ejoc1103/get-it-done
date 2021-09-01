//rethink leftover logic
//leftovers = daily
import React, { useState, useEffect } from "react";
import EditTasks from "../utilities/EditTasks";
import { useLocation } from "react-router-dom";
const Daily = ({
  daily,
  setDaily,
  setItem,
  setTimes,
  times,
  scheduleStartEnd,
  setScheduleStartEnd,
  leftOvers,
  setLeftOvers,
}) => {
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
  const [dayToggle, setDayToggle] = useState(true);

  let handleSubmit = e => {
    e.preventDefault();
    let { startNum, endNum, startAm, endAm } = scheduleStartEnd;
    startNum = parseInt(startNum);
    endNum = parseInt(endNum);
    let tempArr = [];
    if (startAm === "pm" && endNum !== 12) {
      startNum = startNum + 12;
    }
    if (endAm === "pm" && endNum !== 12) {
      endNum = endNum + 12;
    }

    if (endNum === 12 && endAm === "am") {
      endNum = 24;
    }

    if (startNum === 12 && startAm === "am") {
      startNum = 24;
    }

    if (startNum < endNum) {
      for (let i = startNum; i <= endNum; i++) {
        tempArr.push(i);
      }
    } else {
      for (let i = startNum; i <= 24; i++) {
        tempArr.push(i);
      }
      for (let i = 1; i <= endNum; i++) {
        tempArr.push(i);
      }
    }

    setTimes(tempArr);
    setDayToggle(false);
  };

  useEffect(() => {
    let temp = daily.filter(({ time, am }) => {
      if (am === "pm" && time !== 12) {
        time = parseInt(time) + 12;
      } else {
        parseInt(time);
      }
      console.log(times + "these are the times");
      console.log(
        time + "    " + typeof time + "   " + times.indexOf(parseInt(time))
      );
      return times.indexOf(parseInt(time)) === -1;
    });
    console.log(temp);
    setLeftOvers(temp);
  }, [daily, setLeftOvers]);

  let handleChange = e => {
    const { name, value } = e.target;
    setScheduleStartEnd(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  let onDelete = e => {
    let editArr = daily.filter(item => item.id !== e.target.id);
    setDaily(editArr);
  };

  let revealScheduleMaker = e => {
    e.preventDefault();
    setDayToggle(true);
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
      {dayToggle ? (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="number"
              name="startNum"
              onChange={handleChange}
              placeholder="Start"
              min="1"
              max="12"
            />
            <select name="startAm" onChange={handleChange} id="start">
              <option value="am">AM</option>
              <option value="pm">PM</option>
            </select>
            <input
              type="number"
              name="endNum"
              onChange={handleChange}
              placeholder="End"
              min="1"
              max="12"
            />
            <select name="endAm" onChange={handleChange} id="end">
              <option value="am">AM</option>
              <option value="pm">PM</option>
            </select>
            <input type="submit" />
          </div>
        </form>
      ) : (
        <form onSubmit={revealScheduleMaker}>
          <button type="submit">Change Times</button>
        </form>
      )}
      <div style={{ border: "2px black solid" }}>
        {leftOvers.length > 0 ? (
          <h2>
            These Items don't fit your schedule. Either change their time or
            your scheduele
          </h2>
        ) : null}

        {leftOvers.length > 0
          ? leftOvers.map(
              (
                { id, task, time, minutes, color, checked, toggle, am },
                index
              ) => {
                return (
                  <div key={id}>
                    <div key={id}>
                      <input
                        type="checkbox"
                        id={id}
                        onChange={onCheck}
                        checked={checked}
                        value={checked}
                      />
                      {checked === false ? (
                        <label
                          style={{ color: color }}
                        >{`${task} - ${time}:${minutes}   `}</label>
                      ) : (
                        <label
                          style={{
                            color: color,
                            textDecoration: "line-through",
                          }}
                        >
                          {`${task} - ${time}:${minutes}   `}
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
                  </div>
                );
              }
            )
          : null}
        {times.map((num, index) => {
          let amSched = "";
          if (num < 12 || num === 24) {
            if (num === 24) {
              num = num - 12;
            }
            amSched = "am";
          } else if (num === 12) {
            amSched = "pm";
          } else {
            num = num - 12;
            amSched = "pm";
          }

          let timeslot = daily.filter(task => {
            let temp;
            if (task.time === `${num}` && task.am === amSched) {
              temp = task;
            }
            return temp;
          });

          let compare = (a, b) => {
            if (a.minutes < b.minutes) {
              return -1;
            }
            if (a.minutes > b.minutes) {
              return 1;
            }
            return 0;
          };

          timeslot.sort(compare);
          return (
            <div key={index}>
              <h2>{num + " " + amSched}</h2>;
              {timeslot.map(
                (
                  { id, task, time, minutes, color, checked, toggle, am },
                  index
                ) => {
                  return (
                    <div key={id}>
                      {`${num}` === time && amSched === am ? (
                        <div key={id}>
                          <input
                            type="checkbox"
                            id={id}
                            onChange={onCheck}
                            checked={checked}
                            value={checked}
                          />
                          {checked === false ? (
                            <label
                              style={{ color: color }}
                            >{`${task} - ${time}:${minutes}   `}</label>
                          ) : (
                            <label
                              style={{
                                color: color,
                                textDecoration: "line-through",
                              }}
                            >
                              {`${task} - ${time}:${minutes}   `}
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
                      ) : null}
                    </div>
                  );
                }
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Daily;
