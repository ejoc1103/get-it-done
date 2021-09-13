import React, { useState, useEffect } from "react";
import EditTasks from "../utilities/EditTasks";
import BasicListItem from "../utilities/BasicListItem";
import { useLocation } from "react-router-dom";
import onCheck from "../helpers/onCheck";
import onDelete from "../helpers/onDelete";
import onEdit from "../helpers/onEdit";
import styled from "styled-components";

const DailyPageStyled = styled.div`
  display: grid;
  justify-content: center;
  min-height: 200px;
  width: 600px;
  margin: 0 auto;
  padding: 0;
  grid-template-columns: 1fr;
  gap: 5px;

  > h1 {
    text-align: center;
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
    background: #f2a154;
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
  background: #f2a154;
  font-size: 1.5em;
  margin: 5px;
  padding: 0 5px;
`;

const ChangeTimesStyled = styled.form`
  justify-self: end;
  > button {
    background: #f2a154;
    font-size: 1em;
  }
`;

const CancelButtonStyled = styled.button`
  background: #f2a154;
  font-size: 1.5em;
`;

const DailyScheduleStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  border: 3px dashed #314e52;
  background-color: #f5f5f5;
  width: 100%;
`;

const HourBlockStyled = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
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
}) => {
  const location = useLocation();

  const [dayToggle, setDayToggle] = useState(true);

  const [edit, setEdit] = useState(false);

  let handleSubmit = e => {
    e.preventDefault();
    let { startNum, endNum, startAm, endAm } = scheduleStartEnd;

    startNum = parseInt(startNum);
    endNum = parseInt(endNum);
    let tempArr = [];
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

  useEffect(() => {
    console.log("Did this get hit?");
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

  let handleChange = e => {
    const { name, value } = e.target;

    setScheduleStartEnd(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  let revealScheduleMaker = e => {
    e.preventDefault();
    setDayToggle(true);
    setEdit(true);
  };

  return (
    <DailyPageStyled>
      <h1>Daily Tasks</h1>
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
            {edit ? (
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
                        location={location}
                        toggle={toggle}
                      />
                    ) : null}
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
                                location={location}
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
