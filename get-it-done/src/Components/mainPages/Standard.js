import React from "react";
import EditTasks from "../utilities/EditTasks";
import { useLocation } from "react-router-dom";
import timeConverter from "../utilities/timeConverter";
import onCheck from "../helpers/onCheck";
import BasicListItem from "../utilities/BasicListItem";
import onDelete from "../helpers/onDelete";
const Standard = ({ standard, setStandard, setItem }) => {
  const location = useLocation();

  let onEdit = e => {
    let editArr = standard.map(item => {
      let update = { ...item, toggle: !item.toggle };

      if (`${item.id}` === e.target.id) {
        return update;
      } else {
        return item;
      }
    });
    setStandard(editArr);
  };

  return (
    <div>
      <h1>Standard List</h1>
      <div style={{ border: "2px black solid" }}>
        {standard.map(
          ({ id, task, date, time, am, color, checked, toggle }, index) => {
            let standardTime = "";
            if (time !== "") {
              standardTime = timeConverter(time);
            }

            return (
              <div key={id}>
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

export default Standard;
