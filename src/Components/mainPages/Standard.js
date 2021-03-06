import React from 'react';
import EditTasks from '../utilities/EditTasks';
import timeConverter from '../utilities/timeConverter';
import onCheck from '../helpers/onCheck';
import BasicListItem from '../utilities/BasicListItem';
import onDelete from '../helpers/onDelete';
import onEdit from '../helpers/onEdit';
import styled from 'styled-components';
//styling for standard page
const StandardListStyled = styled.div`
  display: grid;
  background-color: #f5f5f5;
  padding: 0;
  max-width: 80%;
  justify-self: center;

  > ul {
    color: #555;
    font-size: 22px;
    padding: 0 !important;
    border: 1px solid #dedede;
  }
  > div {
    display: grid;
    > h1 {
      text-align: center;
    }
  }
`;
const ShowTaskStyled = styled.button`
  background-color: ${({ theme }) => theme.secondaryColor};
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1em;
  justify-self: center;
  border-radius: 30%;
  padding: 15px;
`;
//Receives lists and item creation functions from main state through App.js
const Standard = ({
  standard,
  setStandard,
  setItem,
  showTaskbar,
  setShowTaskbar,
}) => {
  return (
    <StandardListStyled margin={showTaskbar}>
      <div>
        <h1>Standard List</h1>
        <ShowTaskStyled
          onClick={() => {
            setShowTaskbar(prevState => !prevState);
          }}
        >
          {showTaskbar ? 'Hide Create Taskbar' : 'Create a New Task'}
        </ShowTaskStyled>
      </div>
      <div>
        {/* maps over the array that makes up the standard list to show the items on the page */}
        {standard.map(
          ({ id, task, date, time, color, checked, toggle }, index) => {
            let standardTime = '';

            /* timeConverter takes the time which is given in milary style through javascript and makes it standard */

            if (time !== '') {
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
