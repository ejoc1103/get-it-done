import React from "react";

const BasicList = ({
  id,
  onCheck,
  checked,
  task,
  date,
  time,
  color,
  important,
  due,
  onDelete,
  onEdit,
}) => {
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
          {task + " " + date + " " + time + " " + important + due}
        </label>
      ) : (
        <label style={{ color: color, textDecoration: "line-through" }}>
          {task + " " + date + " " + time + " "}
        </label>
      )}

      <button onClick={onDelete} id={id}>
        Delete
      </button>
      <button onClick={onEdit} id={id}>
        Edit
      </button>
    </div>
  );
};

export default BasicList;
