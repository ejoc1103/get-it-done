import React from "react";

let onCheck = (e, {
  standard,
  setStandard,
  daily,
  setDaily,
  priority,
  setPriority,
}) => {
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

export default onCheck;
