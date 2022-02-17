import React, { useState, useEffect } from "react";
import EditTasks from "../utilities/EditTasks";
import BasicListItem from "../utilities/BasicListItem";
import onCheck from "../helpers/onCheck";
import onDelete from "../helpers/onDelete";
import onEdit from "../helpers/onEdit";
import styled from "styled-components";
//Styles for Day Planner Page

const DailyPageStyled = styled.div`
  display: grid;
  justify-content: center;
  min-height: 200px;
  width: 600px;
  text-align: center;
  margin: 0 auto;
  margin-top: ${({ margin }) => (margin ? "none" : "12%")};
  padding: 0;
  grid-template-columns: 1fr;
  gap: 5px;
  margin-top: ${({ show }) => (show === true ? "" : "150px")};

  @media (max-width: 900px) {
    margin-top: ${({ margin }) => (margin ? "none" : "18%")};
  }
  @media (max-width: 730px) {
    margin-top: ${({ margin }) => (margin ? "none" : "25%")};
  }
  @media (max-width: 500px) {
    margin-top: ${({ margin }) => (margin ? "none" : "60%")};
  }
`;

const DaySetterStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;

  > h2 {
    width: 100%;
    background: ${({ theme }) => theme.primaryColor};
    text-align: center;
    justify-self: center;
    padding: 5px 0;
  }

  > div {
    justify-self: center;
    > input,
    select {
      font-size: 1.5em;
    }
  }
`;

const SubmitStyled = styled.input`
  background: ${({ theme }) => theme.primaryColor};
  font-size: 1.5em;
  margin: 5px;
  padding: 0 5px;
`;

const ChangeTimesStyled = styled.form`
  justify-self: end;
  > button {
    background: ${({ theme }) => theme.primaryColor};
    font-size: 1em;
  }
`;

const CancelButtonStyled = styled.button`
  background: ${({ theme }) => theme.primaryColor};
  font-size: 1.5em;
`;

const DailyScheduleStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  border: 3px dashed ${({ theme }) => theme.secondaryColor};
  background-color: #f5f5f5;
  width: 100%;
`;

const HourBlockStyled = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
`;

const LeftOversStyled = styled.div`
  background: ${({ theme }) => theme.bodyFontColor};
  > h2 {
    color: white;
  }
`;

const ShowTaskStyled = styled.button`
  width: 40%;
  justify-self: center;
`;

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
  dayToggle,
  setDayToggle,
  showTaskbar,
  setShowTaskbar,
}) => {
  // changes some ui to to make editing times more readable and functional
  const [editTimes, setEditTimes] = useState(false);
  const [show, setShow] = useState(false);

  // on submit of the Setting hours form creates an array of hours based on the data given to show a list of the hours
  // in a person day for their planner
  let handleSubmit = e => {
    e.preventDefault();
    let { startNum, endNum, startAm, endAm } = scheduleStartEnd;
    if (startNum === "" || endNum === "" || startAm === "" || endAm === "") {
      alert("Please fill out all fields before submitting");
      return;
    }
    startNum = parseInt(startNum);
    endNum = parseInt(endNum);

    let tempArr = [];
    //Logic for making sure am and pm are set properly array goes from 1 - 24
    if (startAm === "pm" && startNum !== 12) {
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
    //first for loop works for most users average day
    //second for loop is needed if a person works certain types of overnight schedules
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
    setScheduleStartEnd({
      startNum: "",
      startAm: "am",
      endNum: "",
      endAm: "am",
    });
  };

  // handle change for setting hours form
  let handleChange = e => {
    const { name, value } = e.target;

    setScheduleStartEnd(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  //Shows the set hours form again if a user wishes to edit the hours of their day
  let revealScheduleMaker = e => {
    e.preventDefault();
    setDayToggle(true);
    setEditTimes(true);
  };

  // If a user adds a task for a time that doesn't fit there schedule
  // we make a leftovers list and show them tasks that dont fit here
  useEffect(() => {
    if (times.length > 0) {
      setShow(true);
    }

    let temp = daily.filter(({ time, am }) => {
      if (am === "pm" && time !== 12) {
        time = parseInt(time) + 12;
      } else {
        parseInt(time);
      }

      return times.indexOf(parseInt(time)) === -1;
    });

    setLeftOvers(temp);
  }, [daily, setLeftOvers, dayToggle, times]);

  return (
    <DailyPageStyled show={show} margin={showTaskbar}>
      <div>
        <h1>Daily Tasks</h1>
        {dayToggle ? null : (
          <ShowTaskStyled
            onClick={() => {
              setShowTaskbar(prevState => !prevState);
            }}
          >
            {showTaskbar ? "Hide Create Taskbar" : "Create a New Task"}
          </ShowTaskStyled>
        )}
      </div>
      {dayToggle ? (
        <DaySetterStyled onSubmit={handleSubmit}>
          <h2>Set Hours For Your Day</h2>
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
            <SubmitStyled type="submit" />
            {editTimes ? (
              <CancelButtonStyled onClick={() => setDayToggle(!dayToggle)}>
                Cancel
              </CancelButtonStyled>
            ) : null}
          </div>
        </DaySetterStyled>
      ) : (
        <ChangeTimesStyled onSubmit={revealScheduleMaker}>
          <button type="submit">Change Times</button>
        </ChangeTimesStyled>
      )}
      <div>
        <LeftOversStyled>
          {leftOvers.length > 0 ? (
            <h2>
              These items don't fit your schedule. Either change their time or
              your scheduele if you wish for them to be on the planner.
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
                      <BasicListItem
                        id={id}
                        task={task}
                        time={time}
                        minutes={minutes}
                        am={am}
                        color={color}
                        checked={checked}
                        toggle={toggle}
                        onCheck={onCheck}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        list={daily}
                        setList={setDaily}
                      />
                      {toggle ? (
                        <EditTasks
                          item={leftOvers[index]}
                          list={daily}
                          setItem={setItem}
                          setList={setDaily}
                          onEdit={onEdit}
                          toggle={toggle}
                        />
                      ) : null}
                    </div>
                  );
                }
              )
            : null}
        </LeftOversStyled>
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
            <DailyScheduleStyled key={index}>
              <div>
                <h2>{num + " " + amSched}</h2>;
              </div>
              <HourBlockStyled>
                {timeslot.map(
                  (
                    { id, task, time, minutes, color, checked, toggle, am },
                    index
                  ) => {
                    return (
                      <div key={id}>
                        {`${num}` === time && amSched === am ? (
                          <div key={id}>
                            <BasicListItem
                              id={id}
                              task={task}
                              time={time}
                              minutes={minutes}
                              am={am}
                              color={color}
                              checked={checked}
                              toggle={toggle}
                              onCheck={onCheck}
                              onEdit={onEdit}
                              onDelete={onDelete}
                              list={daily}
                              setList={setDaily}
                            />

                            {toggle ? (
                              <EditTasks
                                item={daily[index]}
                                list={daily}
                                setItem={setItem}
                                setList={setDaily}
                                onEdit={onEdit}
                                toggle={toggle}
                              />
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    );
                  }
                )}
              </HourBlockStyled>
            </DailyScheduleStyled>
          );
        })}
      </div>
    </DailyPageStyled>
  );
};

export default Daily;
