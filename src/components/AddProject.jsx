import { forwardRef } from "react";


const AddProject = forwardRef(function AddProject({ ...props }, ref) {    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (props.onSubmit) {
            const formData = new FormData(ref.current);
            const dataObject = Object.fromEntries(formData.entries());
        
            props.onSubmit(dataObject); 
        }
    };
    
    
    return (
        <form ref={ref} onSubmit={handleSubmit} className="w-full max-w-sm mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="mb-4">
                <button type="submit" className="w-full bg-stone-500 text-white px-4 py-2 rounded-md hover:bg-stone-700 transition duration-300">
                    Save
                </button>
                <button type="reset" className="w-full bg-stone-500 text-white px-4 py-2 rounded-md hover:bg-stone-700 transition duration-300">
                    Cancel
                </button>
            </div>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-medium mb-2">TITLE</label>
                <input id="title" type="text" name="title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"></input>
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-medium mb-2">DESCRIPTION</label>
                <input id="description" type="text" name="description" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"></input>
            </div>
            <div className="mb-4">
                <label htmlFor="date" className="block text-gray-700 font-medium mb-2">DUE DATE</label>
                <input id="date" type="date" name="date" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"></input>
            </div>
        </form>
    );
})

export default AddProject