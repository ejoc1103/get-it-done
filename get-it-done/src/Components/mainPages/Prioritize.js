import React, { useEffect, useState } from "react";
import EditTasks from "../utilities/EditTasks";
import BasicListItem from "../utilities/BasicListItem";
import { useLocation } from "react-router-dom";
import timeConverter from "../utilities/timeConverter";
import onCheck from "../helpers/onCheck";
import onDelete from "../helpers/onDelete";
import onEdit from "../helpers/onEdit";
import styled from "styled-components";

const PriorityMainStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  @media (max-width: 1000px) {
    grid-template-columns: 0.5fr 3fr 0.5fr;
  }
`;

const PriorityPageStyled = styled.div`
  display: grid;
  padding: 0;
  gap: 20px;
  grid-template-areas:
    "header   header   header header"
    ".      subhead1  . subhead2"
    "subhead3 content content content"
    "subhead4 content content content";

  grid-template-columns: 2fr 6fr 6fr;
  justify-items: center;
  align-items: center;

  @media (max-width: 805px) {
    grid-template-columns: 1fr;
    grid-template-areas:
    "header"
    "content"
`;

const PriorityHeaderStyled = styled.h1`
  grid-area: header;
  text-align: center;
  @media (max-width: 805px) {
    display: none;
  }
`;

const SubHead1Styled = styled.h3`
  grid-area: subhead1;
  text-align: center;
  @media (max-width: 805px) {
    display: none;
  }
`;

const SubHead2Styled = styled.h3`
  grid-area: subhead2;
  text-align: center;
  @media (max-width: 805px) {
    display: none;
  }
`;

const SubHead3Styled = styled.h3`
  grid-area: subhead3;
  text-align: center;
  align-self: center;
  @media (max-width: 805px) {
    display: none;
  }
`;

const SubHead4Styled = styled.h3`
  grid-area: subhead4;
  text-align: center;
  align-self: center;
  @media (max-width: 805px) {
    display: none;
  }
`;

const PriorityModelStyled = styled.div`
  display: grid;
  gap: 10px;
  grid-area: content;
  grid-template-areas:
    "list1 list2"
    "list3 list4";
  justify-content: center;
  @media (max-width: 805px) {
    grid-template-areas:
      "subhead1"
      "list1"
      "subhead2"
      "list2"
      "subhead3"
      "list3"
      "subhead4"
      "list4";
  }
`;

const SmallScreenSubhead1 = styled.h2`
  display: none;
  @media (max-width: 805px) {
    display: grid;
    grid-area: subhead1;
    text-align: center;
  }
`;
const SmallScreenSubhead2 = styled.h2`
  display: none;
  @media (max-width: 805px) {
    display: grid;
    grid-area: subhead2;
    text-align: center;
  }
`;
const SmallScreenSubhead3 = styled.h2`
  display: none;
  @media (max-width: 805px) {
    display: grid;
    grid-area: subhead3;
    text-align: center;
  }
`;
const SmallScreenSubhead4 = styled.h2`
  display: none;
  @media (max-width: 805px) {
    display: grid;
    grid-area: subhead4;
    text-align: center;
  }
`;

const ImportantSoonStyled = styled.ul`
  display: grid;
  border: 5px solid red;
  grid-area: list1;
  min-width: 250px;
  min-height: 250px;
  justify-self: center;
`;

const ImportantNotSoonStyled = styled.ul`
  display: grid;
  border: 5px solid green;
  grid-area: list2;
  min-width: 250px;
  min-height: 250px;
  grid-template-columns: 1fr;
  justify-self: center;
`;

const NotImportantSoon = styled.ul`
  display: grid;
  border: 5px solid blue;
  grid-area: list3;
  min-width: 250px;
  min-height: 250px;
  grid-template-columns: 10px 1fr;
  justify-self: center;
`;

const NotImportantNotSoon = styled.ul`
  display: grid;
  border: 5px solid gray;
  grid-area: list4;
  min-width: 250px;
  min-height: 250px;
  justify-self: center;
`;

const ShowTaskStyled = styled.button`
  width: 70%;
  height: 50px;
  background-color: ${({ theme }) => theme.secondaryColor};
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1em;
  justify-self: center;
  border-radius: 30%;
  padding: 2px;
`;

const Prioritize = ({
  priority,
  setPriority,
  setItem,
  showTaskbar,
  setShowTaskbar,
}) => {
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
    <PriorityMainStyled>
      <div></div>
      <PriorityPageStyled>
        <PriorityHeaderStyled>Importance Model</PriorityHeaderStyled>
        <ShowTaskStyled
          onClick={() => {
            setShowTaskbar(prevState => !prevState);
          }}
        >
          {showTaskbar ? "Hide Create Taskbar" : "Create a New Task"}
        </ShowTaskStyled>

        <SubHead1Styled>Due Soon</SubHead1Styled>
        <SubHead2Styled>Not Due Soon</SubHead2Styled>
        <SubHead3Styled>Important</SubHead3Styled>
        <SubHead4Styled>Not Important</SubHead4Styled>
        <PriorityModelStyled>
          <SmallScreenSubhead1>Important Due Soon</SmallScreenSubhead1>
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
          <SmallScreenSubhead2>Important Not Due Soon</SmallScreenSubhead2>
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
          <SmallScreenSubhead3>Not Important Soon</SmallScreenSubhead3>
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
          <SmallScreenSubhead4>Not Important Not Due Soon</SmallScreenSubhead4>
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
      <div></div>
    </PriorityMainStyled>
  );
};

export default Prioritize;
