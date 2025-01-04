import React, { forwardRef, useEffect } from "react";
import TaskList from "./TaskList";

const AddTask = forwardRef(function AddTask(
  { projects, setProjects, projectIndex, ...props },
  ref
) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (props.onSubmit) {
      const formData = new FormData(ref.current);
      const dataObject = Object.fromEntries(formData.entries());

      props.onSubmit(dataObject, projectIndex);
    }
  };

  const project = projects[projectIndex];

  const handleIndex = (taskIndex, currentProjectIndex) => {
    setProjects((prevProjects) => {
      if (
        currentProjectIndex < 0 ||
        currentProjectIndex >= prevProjects.length
      ) {
        console.error("Invalid project index:", currentProjectIndex);
        return prevProjects;
      }

      // Create a copy of the projects array
      const updatedProjects = [...prevProjects];

      // Get the specific project
      const currentProject = updatedProjects[currentProjectIndex];

      if (taskIndex < 0 || taskIndex >= currentProject.tasks.length) {
        console.error("Invalid task index:", taskIndex);
        return prevProjects;
      }

      // Create a copy of the tasks array without the task at taskIndex
      const updatedTasks = [
        ...currentProject.tasks.slice(0, taskIndex),
        ...currentProject.tasks.slice(taskIndex + 1),
      ];

      // Update the tasks array for the specific project
      updatedProjects[currentProjectIndex] = {
        ...currentProject,
        tasks: updatedTasks,
      };

      return updatedProjects;
    });
  };
  const taskIndexRef = React.useRef((taskIndex) =>
    handleIndex(taskIndex, projectIndex)
  );

  useEffect(() => {
    taskIndexRef.current = (taskIndex) => handleIndex(taskIndex, projectIndex);
  }, [projectIndex]);

  return (
    <>
      <div>
        <h2>{project.title}</h2>
        <p>{project.date}</p>
        <p>{project.description}</p>
      </div>
      <form ref={ref} onSubmit={handleSubmit}>
        <div>
          <button
            type="submit"
            className="w-full bg-stone-500 text-white px-4 py-2 rounded-md hover:bg-stone-700 transition duration-300"
          >
            Add Task
          </button>
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Tasks
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
          ></input>
        </div>
      </form>
      <TaskList listItems={project.tasks} ref={taskIndexRef} />
    </>
  );
});

export default AddTask;
