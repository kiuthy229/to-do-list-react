import { useState, useEffect, useReducer } from "react";
import {collection, getDocs, addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore";
import { db } from "../firebase-config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

const List = (props) => {
    const [tasks, setTasks]= useState(props.tasks);
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

    useEffect(()=>{

    },[tasks])

    const deleteTask = async (id) => {
        const taskDoc = doc(db,"tasks", id)
        await deleteDoc(taskDoc);
        forceUpdate()
    }

    const prioritise =async (id) => {
        const taskDoc = doc(db,"tasks", id)
        const newFields ={isPrioritised:true, isDone:false}
        await updateDoc(taskDoc, newFields);
        forceUpdate()
    }

    const notPrioritise =async (id) => {
        const taskDoc = doc(db,"tasks", id)
        const newFields ={isPrioritised:false, isDone:false}
        await updateDoc(taskDoc, newFields);
        forceUpdate()
    }

    const btnDone = async (id) => {
        const taskDoc = doc(db,"tasks", id)
        const newFields ={isDone:true, isPrioritised:false}
        await updateDoc(taskDoc, newFields);
        forceUpdate()
    }

    const btnNotDone = async (id) => {
        const taskDoc = doc(db,"tasks", id)
        const newFields ={isDone:false, isPrioritised:false}
        await updateDoc(taskDoc, newFields);
        forceUpdate()
    }


    return (
        <div id="task-list">
            {tasks && tasks.map((task) =>
            {return <div key={task.id} className="list-item">
                        {task.isPrioritised == true &&
                            <div  className="task-prior">
                                <div className="inner">
                                    <h3>{task.taskName}</h3>
                                </div>
          
                                <button className="star" onClick={()=>notPrioritise(task.id)}>
                                    <FontAwesomeIcon icon={solid('star')} />
                                </button>   
          
                                <button className="inner delete" onClick={() => {deleteTask(task.id)}}>
                                        <FontAwesomeIcon icon={regular('trash-can')} />
                                </button> 
          
                                <button className="inner done" onClick={()=>btnDone(task.id)}>
                                    <FontAwesomeIcon icon={solid('check')}/>
                                </button>   
                            </div>
                        }
                    </div>
            }
            )}

            <h1>Task List</h1>
            {tasks && tasks.map((task) => 
                {return <div key={task.id} className="list-item">       
                            {task.isPrioritised == false && task.isDone == false && task.isPrioritised == false &&  
                                <div className="task-preview">

                                    <div className="inner">
                                        <h3>{task.taskName}</h3>
                                    </div>

                                    <button className="star" onClick={()=>prioritise(task.id)}>
                                        <FontAwesomeIcon icon={regular('star')} color="orange" />
                                    </button>   
                                        

                                    <button className="inner delete" onClick={() => {deleteTask(task.id)}}>
                                        <FontAwesomeIcon icon={regular('trash-can')} />
                                    </button> 

                                    <button className="inner done" onClick={()=>btnDone(task.id)}>
                                        <FontAwesomeIcon icon={solid('check')}/>
                                    </button>   

                                </div>
                            }
                            
                </div>})
            }

            <h1>Done List</h1>
            {tasks && tasks.map((task) => 
                {return <div key={task.id} className="list-item">       
                            {task.isDone == true &&
                                <div className="task-done">

                                    <div className="inner">
                                        <h3>{task.taskName}</h3>
                                    </div>

                                    <button className="star" onClick={()=>prioritise(task.id)}>
                                        <FontAwesomeIcon icon={regular('star')} color="orange" />
                                    </button>   
                                        
                                    <button className="inner delete" onClick={() => {deleteTask(task.id)}}>
                                        <FontAwesomeIcon icon={regular('trash-can')} />
                                    </button> 

                                    <button className="inner done" onClick={()=>btnNotDone(task.id)}>
                                        <FontAwesomeIcon icon={solid("xmark")} />
                                    </button>   

                                </div>
                            }
                            
                </div>})
            }
        </div>
    )
}

export default List;