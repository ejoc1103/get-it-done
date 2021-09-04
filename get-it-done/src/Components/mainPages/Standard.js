import React from "react";
import EditTasks from "../utilities/EditTasks";
import { useLocation } from "react-router-dom";
import timeConverter from "../utilities/timeConverter";

const Standard = ({ standard, setStandard, setItem }) => {
  const location = useLocation();

  let onCheck = e => {
    let editArr = standard.map(item => {
      let update = { ...item, checked: !item.checked };

      if (`${item.id}` === e.target.id) {
        return update;
      } else {
        return item;
      }
    });
    setStandard(editArr);
  };

  let onDelete = e => {
    let editArr = standard.filter(item => item.id !== e.target.id);
    setStandard(editArr);
  };

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
                <input
                  type="checkbox"
                  id={id}
                  onChange={onCheck}
                  checked={checked}
                  value={checked}
                />
                {checked === false ? (
                  <label style={{ color: color }}>
                    {task + " " + date + " " + standardTime + " "}
                  </label>
                ) : (
                  <label
                    style={{ color: color, textDecoration: "line-through" }}
                  >
                    {task + " " + date + " " + standardTime + " "}
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
