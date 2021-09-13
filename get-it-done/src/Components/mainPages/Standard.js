import React from "react";
import EditTasks from "../utilities/EditTasks";
import { useLocation } from "react-router-dom";
import timeConverter from "../utilities/timeConverter";
import onCheck from "../helpers/onCheck";
import BasicListItem from "../utilities/BasicListItem";
import onDelete from "../helpers/onDelete";
import onEdit from "../helpers/onEdit";
import styled from "styled-components";

const StandardListStyled = styled.div`
  display: grid;
  min-height: 200px;
  background-color: #f5f5f5;
  width: 600px;
  margin: 0 auto;
  padding: 0;

  > ul {
    color: #555;
    font-size: 22px;
    padding: 0 !important;
    width: 500px;
    font-family: courier, monospace;
    border: 1px solid #dedede;
  }
  > h1 {
    text-align: center;
  }
`;

const Standard = ({ standard, setStandard, setItem }) => {
  const location = useLocation();

  return (
    <StandardListStyled>
      <h1>Standard List</h1>
      <div>
        {standard.map(
          ({ id, task, date, time, am, color, checked, toggle }, index) => {
            let standardTime = "";
            if (time !== "") {
              standardTime = timeConverter(time);
            }

            return (
              <ul key={id}>
                <BasicListItem
                  id={id}
                  task={task}
                  date={date}
                  time={standardTime}
                  color={color}
                  checked={checked}
                  toggle={toggle}
                  onCheck={onCheck}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  list={standard}
                  setList={setStandard}
                />
                {toggle ? (
                  <EditTasks
                    item={standard[index]}
                    list={standard}
                    setItem={setItem}
                    setList={setStandard}
                    onEdit={onEdit}
                    location={location}
                    toggle={toggle}
                  />
                ) : null}
              </ul>
            );
          }
        )}
      </div>
    </StandardListStyled>
  );
};

export default Standard;
