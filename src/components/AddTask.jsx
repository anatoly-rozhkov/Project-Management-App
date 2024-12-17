import { forwardRef, useState } from "react";
import TaskList from "./TaskList";


const AddTask = forwardRef(function AddTask({  project, ...props }, ref) {    
    const [tasks, setTasks] = useState(project.tasks);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (props.onSubmit) {
            const formData = new FormData(ref.current);
            const dataObject = Object.fromEntries(formData.entries());
        
            props.onSubmit(dataObject); 
            setTasks([...tasks, dataObject])
        }
    };
    
    
    return (
        <>
         <div>
            <h2>{project.title}</h2>
            <p>{project.date}</p>
            <p>{project.description}</p>
         </div>
         <form ref={ref} onSubmit={handleSubmit}>
            <div>
                <button type="submit" className="w-full bg-stone-500 text-white px-4 py-2 rounded-md hover:bg-stone-700 transition duration-300">
                     Add Task
                </button>
            </div>
            <div className="mb-4">
                 <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Tasks</label>
                 <input id="title" type="text" name="title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"></input>
            </div>
         </form>
         <TaskList listItems={tasks} />
        </>
    );
})

export default AddTask