import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const InputAreaStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  > h2 {
    width: 100%;
    background: #f2a154;
    text-align: center;
    padding: 5px 0;
  }
`;

const FormStyled = styled.form`
  display: grid;
  gap: 10px;
  font-size: 1em;

  @media (min-width: 768px) {
    ${({ area }) =>
      area === "/daily"
        ? "grid-template-areas: 'task color' 'time button'"
        : "grid-template-areas: 'task color' 'date time' 'button button'"}
  }
`;

const TaskStyled = styled.input`
  font-size: 1.5em;
`;

const ColorStyled = styled.select`
  font-size: 1.5em;
`;

const DateStyled = styled.input`
  font-size: 1.5em;
`;

const TimeStyled = styled.input`
  font-size: 1.5em;
`;

const DailyTimeStyled = styled.div`
  > input,
  select {
    font-size: 1.5em;
  }
`;

const PrioritzieStyled = styled.div`
  > select {
    font-size: 1.5em;
  }
`;

const ButtonStyled = styled.button`
  display: grid;
  font-size: 1.5em;
  background-color: #f2a154;
  border-radius: 30%;

  @media (min-width: 768px) {
    grid-area: button;
  }
`;

const InputArea = ({
  handleChange,
  handleSubmit,
  item,
  buttonType,
  toggle,
}) => {
  const location = useLocation();
  return (
    <InputAreaStyled toggle={toggle}>
      <h2>{toggle ? "Edit this task" : "Create a New Task"}</h2>
      <FormStyled onSubmit={handleSubmit} area={location.pathname}>
        {/* always shows */}
        <TaskStyled
          name="task"
          value={item.task}
          onChange={handleChange}
          placeholder="Task"
        />
        {/* doesnt show for prority */}
        {location.pathname !== "/prioritize" ? (
          <ColorStyled name="color" onChange={handleChange} id="color">
            <option value="red">High Priority</option>
            <option value="black">Regular Task</option>
            <option value="blue">Low Priority</option>
          </ColorStyled>
        ) : null}
        {/* doesnt show for day planner */}
        {location.pathname !== "/daily" ? (
          <DateStyled
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
          <DailyTimeStyled>
            <input
              type="number"
              name="time"
              value={item.time}
              onChange={handleChange}
              placeholder="Hour"
              min="1"
              max="12"
            />{" "}
            <select
              name="minutes"
              value={item.minutes}
              onChange={handleChange}
              id="mintues"
            >
              <option value="00">0</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>
            <select name="am" onChange={handleChange} id="am">
              <option value="am">AM</option>
              <option value="pm">PM</option>
            </select>
          </DailyTimeStyled>
        ) : (
          <TimeStyled
            type="time"
            name="time"
            value={item.time}
            onChange={handleChange}
            placeholder="Time"
          />
        )}

        {/* only shows for priority */}
        {location.pathname === "/prioritize" ? (
          <PrioritzieStyled>
            <select
              name="important"
              onChange={handleChange}
              id="importance"
              required
            >
              <option value="important">Important</option>
              <option value="not important">Not Important</option>
            </select>
            <select name="due" onChange={handleChange} id="due">
              <option value="due soon">Due Soon</option>
              <option value="not due soon">Not Due Soon</option>
            </select>{" "}
          </PrioritzieStyled>
        ) : null}
        <ButtonStyled type="submit" value="Submit">
          {buttonType}
        </ButtonStyled>
      </FormStyled>
    </InputAreaStyled>
  );
};

export default InputArea;
