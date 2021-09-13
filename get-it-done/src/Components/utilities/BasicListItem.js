import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledListItem = styled.li`
  display: grid;
  gap: 10px;

  list-style: none;
  border-bottom: 1px dotted #ccc;
  text-indent: 25px;
  height: auto;
  padding: 10px;
  text-transform: capitalize;
  grid-template-columns: 5px auto 50px 50px;

  :hover {
    background-color: #f0f0f0;
    transition: all 0.2s;
  }
`;
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
  toggle,
}) => {
  const { pathname } = useLocation();

  return (
    <StyledListItem key={id} listType={pathname}>
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
        onClick={e => {
          onDelete(e, list, setList);
        }}
        id={id}
      >
        Delete
      </button>
      <button
        onClick={e => {
          onEdit(e, list, setList, pathname);
        }}
        id={id}
      >
        {toggle ? "Cancel" : "Edit"}
      </button>
    </StyledListItem>
  );
};

export default BasicList;
