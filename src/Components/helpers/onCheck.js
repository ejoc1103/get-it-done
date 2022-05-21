let onCheck = (e, list, setList) => {
  console.log(e + "   " + list + "   " + setList);
  let editArr = list.map(item => {
    let update = { ...item, checked: !item.checked };

    if (`${item.id}` === e.target.id) {
      return update;
    } else {
      return item;
    }
  });
  setList(editArr);
};

export default onCheck;
