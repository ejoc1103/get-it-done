import React from "react";
import { useLocation } from "react-router-dom";
const BasicList = ({
  id,
  onCheck,
  checked,
  task,
  date,
  time,
  minutes,
  am,
  color,
  onDelete,
  onEdit,
  list,
  setList,
}) => {
  const { pathname } = useLocation();

  // {`${task} - ${time}:${minutes}   `}</label>
  return (
    <div key={id}>
      <input
        type="checkbox"
        id={id}
        onChange={e => {
          onCheck(e, list, setList);
        }}
        checked={checked}
        value={checked}
      />
      {checked === false ? (
        <label style={{ color: color }}>
          {pathname !== "/daily"
            ? `${task}  ${date}  ${time}`
            : `${task} - ${time}:${minutes} ${am}   `}
        </label>
      ) : (
        <label style={{ color: color, textDecoration: "line-through" }}>
          {pathname !== "/daily"
            ? `${task}  ${date}  ${time}`
            : `${task} - ${time}:${minutes} ${am}   `}
        </label>
      )}

      <button
        onClick={(e) => {
          onDelete(e, list, setList);
        }}
        id={id}
      >
        Delete
      </button>
      <button onClick={onEdit} id={id}>
        Edit
      </button>
    </div>
  );
};

export default BasicList;
