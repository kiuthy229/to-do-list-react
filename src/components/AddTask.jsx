import { useState, useEffect,useReducer } from "react";
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";
import { db } from "../firebase-config";
import List from "./List";


const AddTask = () => {
    const [tasks, setTasks]= useState([]);
    const [newTask, setNewTask] = useState("")
    const [reducerValue, forceUpdate] = useReducer( x=> x+1,0)
    const tasksCollectionRef = collection(db, "tasks");

    useEffect( () => {

      const getTasks = async () => {
          const data = await getDocs(tasksCollectionRef)
          console.log(data.docs);
          setTasks(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
      };

      getTasks();
    }, [reducerValue]);

    const createTask = async (taskName) => {
        try {
          await addDoc(tasksCollectionRef, {taskName: newTask, isPrioritised:false, isDone:false})
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
      }
  
      const create = () => {
        createTask(newTask);
        forceUpdate()
      };
      const createEnter = (newTask) => {
        createTask(newTask);
        forceUpdate()
      };

      const listener = event => {
          if (event.code === "Enter" || event.code === "NumpadEnter") {
            event.preventDefault();
            const addTask = event.target.value;
            createEnter(addTask);
          }
      };

    return(
            <div className="create">
              <div className="inner">
                <input placeholder="Add new task" onChange={(e) => {setNewTask(e.target.value)}} onKeyDown={(e) => listener(e) }/>
              </div>
              <div>
                <button className="create-btn" onSubmit={create}> Create Task</button>
              </div>    
              <List tasks={tasks}/>
            </div>

    );
}
export default AddTask;