import { forwardRef } from "react";


const AddTask = forwardRef(function AddTask({  project, ...props }, ref) {    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (props.onSubmit) {
            const formData = new FormData(ref.current);
            const dataObject = Object.fromEntries(formData.entries());
        
            props.onSubmit(dataObject); 
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
            <div className="mb-4" id={"task-name"}>
                 <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Tasks</label>
                 <input id="name" type="text" name="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"></input>
            </div>
         </form>
        </>
    );
})

export default AddTask