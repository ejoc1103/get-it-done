import React from "react";

export default function Standard({ standard, setStandard }) {
  let onCheck = e => {
    let editArr = standard.map((item, index) => {
      let update = { ...item, checked: !item.checked };

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
        {standard.length > 0
          ? standard.map(({ id, task, date, time, color, checked }) => {
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
                      {task + " " + date + " " + time + " "}
                    </label>
                  ) : (
                    <label
                      style={{ color: color, textDecoration: "line-through" }}
                    >
                      {task + " " + date + " " + time + " "}
                    </label>
                  )}

                  <button>Delete</button>
                  <button>Edit</button>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
