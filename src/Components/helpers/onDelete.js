let onDelete = (e, list, setList) => {
  let editArr = list.filter(item => item.id !== e.target.id);
  setList(editArr);
};

export default onDelete;
