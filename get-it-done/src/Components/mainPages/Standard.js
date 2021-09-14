import React from "react";
import EditTasks from "../utilities/EditTasks";
import timeConverter from "../utilities/timeConverter";
import onCheck from "../helpers/onCheck";
import BasicListItem from "../utilities/BasicListItem";
import onDelete from "../helpers/onDelete";
import onEdit from "../helpers/onEdit";
import styled from "styled-components";
//styling for standard page
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
    border: 1px solid #dedede;
  }
  > h1 {
    text-align: center;
  }
`;
//Receives lists and item creation functions from main state through App.js
const Standard = ({ standard, setStandard, setItem }) => {
  return (
    <StandardListStyled>
      <h1>Standard List</h1>
      <div>
        {/* maps over the array that makes up the standard list to show the items on the page */}
        {standard.map(
          ({ id, task, date, time, color, checked, toggle }, index) => {
            let standardTime = "";

            /* timeConverter takes the time which is given in milary style through javascript and makes it standard */

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
                {/* when you click edit brings up a modal for editing a task otherwise doesnt show */}
                {toggle ? (
                  <EditTasks
                    item={standard[index]}
                    list={standard}
                    setItem={setItem}
                    setList={setStandard}
                    onEdit={onEdit}
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
