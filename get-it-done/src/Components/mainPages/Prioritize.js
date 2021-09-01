import React, { useEffect, useState } from "react";
import EditTasks from "../utilities/EditTasks";
import BasicListItem from "../utilities/BasicListItem";
import { useLocation } from "react-router-dom";
import timeConverter from "../utilities/timeConverter";
const Prioritize = ({ priority, setPriority, item, setItem }) => {
  const location = useLocation();
  let onCheck = e => {
    let editArr = priority.map(item => {
      let update = { ...item, checked: !item.checked };

      if (`${item.id}` === e.target.id) {
        return update;
      } else {
        return item;
      }
    });
    setPriority(editArr);
  };

  let onDelete = e => {
    e.preventDefault();
    let editArr = priority.filter(item => item.id !== e.target.id);
    setPriority(editArr);
  };

  let onEdit = e => {
    e.preventDefault();
    let editArr = priority.map(item => {
      let update = { ...item, toggle: !item.toggle };

      if (`${item.id}` === e.target.id) {
        return update;
      } else {
        return item;
      }
    });
    setPriority(editArr);
  };
  const [ims, setIms] = useState([]);
  const [imns, setImns] = useState([]);
  const [nims, setNims] = useState([]);
  const [nimns, setNimns] = useState([]);
  useEffect(() => {
    let importantSoon = priority.filter(item => {
      let temp = [];
      if (item.important === "important" && item.due === "due soon") {
        console.log("first If");
        temp.push(item);
      }

      return temp;
    });
    let importantNotSoon = priority.filter(item => {
      let temp = [];

      if (item.important === "important" && item.due === "not due soon") {
        console.log("second if");
        temp.push(item);
      }
      return temp;
    });
    let notImportantSoon = priority.filter(item => {
      let temp = [];
      if (item.important === "not important" && item.due === "due soon") {
        console.log("third if");
        temp.push(item);
      }

      return temp;
    });
    let notImportantNotSoon = priority.filter(item => {
      let temp = [];
      if (item.important === "not important" && item.due === "not due soon") {
        console.log("fourth if");
        temp.push(item);
      }
      return temp;
    });

    setIms(importantSoon);
    setImns(importantNotSoon);
    setNims(notImportantSoon);
    setNimns(notImportantNotSoon);
  }, [priority]);

  return (
    <div>
      <h1>Importance Model</h1>

      <div style={{ border: "2px black solid" }}>
        <h4>Important Due Soon</h4>

        {ims.map(
          (
            { id, task, date, time, color, checked, toggle, important, due },
            index
          ) => {
            let timeValue = timeConverter(time);

            return (
              <div key={id}>
                <BasicListItem
                  id={id}
                  task={task}
                  date={date}
                  time={timeValue}
                  color={color}
                  checked={checked}
                  toggle={toggle}
                  important={important}
                  due={due}
                  onCheck={onCheck}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
                {toggle ? (
                  <EditTasks
                    item={priority[index]}
                    list={priority}
                    setItem={setItem}
                    setList={setPriority}
                    onEdit={onEdit}
                    location={location}
                  />
                ) : null}
              </div>
            );
          }
        )}
        <h4>Important Not Due Soon</h4>
        {imns.map(
          (
            { id, task, date, time, color, checked, toggle, important, due },
            index
          ) => {
            console.log(important);
            let timeValue = timeConverter(time);

            return (
              <div key={id}>
                <BasicListItem
                  id={id}
                  task={task}
                  date={date}
                  time={timeValue}
                  color={color}
                  checked={checked}
                  toggle={toggle}
                  important={important}
                  due={due}
                  onCheck={onCheck}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
                {toggle ? (
                  <EditTasks
                    item={priority[index]}
                    list={priority}
                    setItem={setItem}
                    setList={setPriority}
                    onEdit={onEdit}
                    location={location}
                  />
                ) : null}
              </div>
            );
          }
        )}
        <h4>Not Important Due Soon</h4>
        {nims.map(
          (
            { id, task, date, time, color, checked, toggle, important, due },
            index
          ) => {
            let timeValue = timeConverter(time);

            return (
              <div key={id}>
                <BasicListItem
                  id={id}
                  task={task}
                  date={date}
                  time={timeValue}
                  color={color}
                  checked={checked}
                  toggle={toggle}
                  important={important}
                  due={due}
                  onCheck={onCheck}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
                {toggle ? (
                  <EditTasks
                    item={priority[index]}
                    list={priority}
                    setItem={setItem}
                    setList={setPriority}
                    onEdit={onEdit}
                    location={location}
                  />
                ) : null}
              </div>
            );
          }
        )}
        <h4>Not Important Not Due Soon</h4>
        {nimns.map(
          (
            { id, task, date, time, color, checked, toggle, important, due },
            index
          ) => {
            let timeValue = timeConverter(time);

            return (
              <div key={id}>
                <BasicListItem
                  id={id}
                  task={task}
                  date={date}
                  time={timeValue}
                  color={color}
                  checked={checked}
                  toggle={toggle}
                  important={important}
                  due={due}
                  onCheck={onCheck}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
                {toggle ? (
                  <EditTasks
                    item={priority[index]}
                    list={priority}
                    setItem={setItem}
                    setList={setPriority}
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

export default Prioritize;
