let onEdit = (e, list, setList, pathname) => {
  e.preventDefault();
  let editArr = list.map(item => {
    let update = { ...item, toggle: !item.toggle };

    if (`${item.id}` === e.target.id) {
      return update;
    } else {
      return item;
    }
  });
  setList(editArr);
};

export default onEdit;
