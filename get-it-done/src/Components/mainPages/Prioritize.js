import React, { useEffect, useState } from "react";
import EditTasks from "../utilities/EditTasks";
import BasicListItem from "../utilities/BasicListItem";
import { useLocation } from "react-router-dom";
import timeConverter from "../utilities/timeConverter";
import onCheck from "../helpers/onCheck";
import onDelete from "../helpers/onDelete";
import onEdit from "../helpers/onEdit";
import styled from "styled-components";

const PriorityPageStyled = styled.div`
  display: grid;
  min-height: 200px;
  width: 600px;
  margin: 0 auto;
  padding: 0;
  gap: 20px;
  grid-template-areas:
    "header   header   header"
    ".      subhead1 subhead2"
    "subhead3 content content"
    "subhead4 content content";

  grid-template-columns: 2fr 6fr 6fr;
`;

const PriorityHeaderStyled = styled.h1`
  grid-area: header;
  text-align: center;
`;

const SubHead1Styled = styled.h3`
  grid-area: subhead1;
  text-align: center;
`;

const SubHead2Styled = styled.h3`
  grid-area: subhead2;
  text-align: center;
`;

const SubHead3Styled = styled.h3`
  grid-area: subhead3;
  text-align: center;
  align-self: center;
`;

const SubHead4Styled = styled.h3`
  grid-area: subhead4;
  text-align: center;
  align-self: center;
`;

const PriorityModelStyled = styled.div`
  display: grid;
  gap: 10px;
  grid-area: content;
  grid-template-areas:
    "list1 list2"
    "list3 list4";
  justify-content: center;
`;

const ImportantSoonStyled = styled.ul`
  display: grid;
  border: 5px solid red;
  grid-area: list1;
  width: 250px;
  height: 250px;
  justify-self: center;
`;

const ImportantNotSoonStyled = styled.ul`
  display: grid;
  border: 5px solid green;
  grid-area: list2;
  width: 250px;
  height: 250px;
  grid-template-columns: 1fr;
  justify-self: center;
`;

const NotImportantSoon = styled.ul`
  display: grid;
  border: 5px solid blue;
  grid-area: list3;
  width: 250px;
  height: 250px;
  grid-template-columns: 10px 1fr;
  justify-self: center;
`;

const NotImportantNotSoon = styled.ul`
  display: grid;
  border: 5px solid gray;
  grid-area: list4;
  width: 250px;
  height: 250px;
  justify-self: center;
`;

const Prioritize = ({ priority, setPriority, setItem }) => {
  const location = useLocation();

  const [ims, setIms] = useState([]);
  const [imns, setImns] = useState([]);
  const [nims, setNims] = useState([]);
  const [nimns, setNimns] = useState([]);
  useEffect(() => {
    let importantSoon = priority.filter(item => {
      return item.important === "important" && item.due === "due soon";
    });

    let importantNotSoon = priority.filter(item => {
      return item.important === "important" && item.due === "not due soon";
    });

    let notImportantSoon = priority.filter(item => {
      return item.important === "not important" && item.due === "due soon";
    });

    let notImportantNotSoon = priority.filter(item => {
      return item.important === "not important" && item.due === "not due soon";
    });

    setIms(importantSoon);
    setImns(importantNotSoon);
    setNims(notImportantSoon);
    setNimns(notImportantNotSoon);
  }, [priority]);

  // for creating box
  // transform: rotate(-90deg);
  return (
    <PriorityPageStyled>
      <PriorityHeaderStyled>Importance Model</PriorityHeaderStyled>
      <SubHead1Styled>Due Soon</SubHead1Styled>
      <SubHead2Styled>Not Due Soon</SubHead2Styled>
      <SubHead3Styled>Important</SubHead3Styled>
      <SubHead4Styled>Not Important</SubHead4Styled>
      <PriorityModelStyled>
        <ImportantSoonStyled>
          <div>
            {ims.map(
              (
                { id, task, date, time, checked, toggle, important, due },
                index
              ) => {
                let timeValue = "";

                if (time !== "") {
                  timeValue = timeConverter(time);
                }

                return (
                  <div key={id}>
                    <BasicListItem
                      id={id}
                      task={task}
                      date={date}
                      time={timeValue}
                      checked={checked}
                      toggle={toggle}
                      important={important}
                      due={due}
                      onCheck={onCheck}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      list={priority}
                      setList={setPriority}
                    />
                    {toggle ? (
                      <EditTasks
                        item={priority[index]}
                        list={priority}
                        setItem={setItem}
                        setList={setPriority}
                        onEdit={onEdit}
                        location={location}
                        toggle={toggle}
                      />
                    ) : null}
                  </div>
                );
              }
            )}
          </div>
        </ImportantSoonStyled>
        <ImportantNotSoonStyled>
          {imns.map(
            (
              { id, task, date, time, checked, toggle, important, due },
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
                    checked={checked}
                    toggle={toggle}
                    important={important}
                    due={due}
                    onCheck={onCheck}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    list={priority}
                    setList={setPriority}
                  />
                  {toggle ? (
                    <EditTasks
                      item={priority[index]}
                      list={priority}
                      setItem={setItem}
                      setList={setPriority}
                      onEdit={onEdit}
                      location={location}
                      toggle={toggle}
                    />
                  ) : null}
                </div>
              );
            }
          )}
        </ImportantNotSoonStyled>
        <NotImportantSoon>
          {nims.map(
            (
              { id, task, date, time, checked, toggle, important, due },
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
                    checked={checked}
                    toggle={toggle}
                    important={important}
                    due={due}
                    onCheck={onCheck}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    list={priority}
                    setList={setPriority}
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
        </NotImportantSoon>
        <NotImportantNotSoon>
          {nimns.map(
            (
              { id, task, date, time, checked, toggle, important, due },
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
                    checked={checked}
                    toggle={toggle}
                    important={important}
                    due={due}
                    onCheck={onCheck}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    list={priority}
                    setList={setPriority}
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
        </NotImportantNotSoon>
      </PriorityModelStyled>
    </PriorityPageStyled>
  );
};

export default Prioritize;
