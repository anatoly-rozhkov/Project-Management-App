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

  const capitalizeTitle = (title) => {
    return title.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="space-y-6">
      <div className="w-[90%] mx-auto space-y-3">
        <h2 className="text-4xl font-bold text-stone-700">
          {capitalizeTitle(project.title)}
        </h2>
        <p className="text-stone-400">{formatDate(project.date)}</p>
        <p>{project.description}</p>
      </div>
      <div className="h-1 bg-stone-200 w-[90%] mx-auto"></div>
      <form className="w-[90%] mx-auto" ref={ref} onSubmit={handleSubmit}>
        <div className="space-y-3">
          <label
            htmlFor="title"
            className="block text-gray-700 text-2xl font-bold"
          >
            Tasks
          </label>
          <div className="flex space-x-2">
            <input
              id="title"
              type="text"
              name="title"
              className="w-80 px-4 py-2 bg-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
            ></input>
            <button 
              className="px-4"
              type="submit"
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
      <TaskList listItems={project.tasks} ref={taskIndexRef} />
    </div>
  );
});

export default AddTask;
