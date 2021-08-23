import React, {useState} from "react";
import { useLocation } from "react-router-dom";

function CreateTask({standard, setStandard, priority, setPriority, daily, setDaily}) {
  const location = useLocation();
  // Use for setting min and max date
  // const date = new Date();
  // const newdate= (date.getMonth() + 1) + '-' + date.getDate() + '-' +  date.getFullYear();
  // const enddate = (date.getMonth() + 1) + '-' + date.getDate() + '-' +  date.getFullYear() + 10
  const [item, setItem] = useState({
    task: "",
    date: "",
    time: "",
    color: "black",
    due: "",
    important: ""
  })

  function handleSubmit(e) {

    e.preventDefault();
    if(location.pathname === "/"){
      setItem({
        task : e.target.task.value,
        date : e.target.date.value,
        time : e.target.time.value,
        color : e.target.color.value,
      })
      setStandard([...standard, item])
    } else if(location.pathname === "/daily"){
      setItem({
        task : e.target.task.value,
        time : e.target.time.value,
        color : e.target.color.value,
      })
      setDaily([...daily, item])
    } else {
      setItem({
        task : e.target.task.value,
        date : e.target.date.value,
        time : e.target.time.value,
        due : e.target.due.value,
        important: e.target.important.value
      })
      setPriority([...priority, setPriority])

    }
    // setItem({
    //   task: "",
    //   date: "",
    //   time: "",
    //   color: "",
    //   due: "",
    //   important: ""
    // })
   }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;

    setItem(prevItem => {
        return {
            ...prevItem,
            [name] : value
        };
    });
 }


  return (
    <div>
      <form onSubmit={handleSubmit}>
      {/* always shows */}
        <input
          name="task"
          value={item.task}
          onChange={handleChange}
          placeholder="Task"
        />
        {/* doesnt show for day planner */}
        {location.pathname !== "/daily" ?  
        
        <input
          type="date"
          name="date"
          value= {item.date}
          onChange={handleChange}
          // min and max dates maybe
          // min= {newdate}
          // max= {enddate}
        /> : null
        }
        {/* always shows */}
        <input
        type="time"
          name="time"
          value={item.time}
          onChange={handleChange}
          placeholder="Time"
        />
        {/* doesnt show for prority */}
        {location.pathname !== "/prioritize" ? 
        <select name="color" id="">
          <option value="red">High Priority</option>
          <option value="black">Regular Task</option>
          <option value="blue">Low Priority</option>
        </select> : null
        }
        {/* only shows for priority */}
        {location.pathname === "/prioritize" ? 
        <>
        <select name="important" id="">
          <option value="important">Important</option>
          <option value="not important">Not Important</option>
        </select>
        <select name="due" id="">
          <option value="due soon">Due Soon</option>
          <option value="not due soon">Not Due Soon</option>
        </select> </>: null
        }
        <button type="submit" value="Submit">Add Task</button>
      </form>
    </div>
  );
}

export default CreateTask;
