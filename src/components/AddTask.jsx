import React from "react";
import TaskList from "./ListComponents/TaskList";
import PostPethod from "./methods/PostMethod";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function AddTask({ projectId, onSubmit, ...props }) {
  const limit = 7;

  const [currentProject, setCurrentProject] = React.useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskStatus, setTaskStatus] = useState(0);

  const [listData, setListData] = useState({});
  const [endpoint, setEndpoint] = useState(
    `http://127.0.0.1:8000/api/tasks/?project=${projectId}&limit=${limit}&offset=0`
  );

  useEffect(() => {
    axios
      .get(endpoint)
      .then((response) => {
        setTasks(response.data["results"]);
        setListData(response.data);
      })
      .catch((error) => console.error(error));
  }, [taskStatus, projectId, endpoint]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/projects/${projectId}/`)
      .then((response) => setCurrentProject(response.data))
      .catch((error) => console.error(error));
  }, [projectId]);

  const submitTask = async (event) => {
    event.preventDefault();

    const title = event.target.elements.title.value;
    await PostPethod("http://127.0.0.1:8000/api/tasks/", {
      name: title,
      project: projectId,
    });

    event.target.reset();
    setTaskStatus((taskStatus) => taskStatus + 1);
  };

  // console.log("{project} this is retrieved project".replace("{project}", project))
  // console.log("{error} if any error".replace("{error}", error))

  // const project = projects[projectIndex];

  // const handleIndex = (taskIndex, currentProjectIndex) => {
  //   setProjects((prevProjects) => {
  //     if (
  //       currentProjectIndex < 0 ||
  //       currentProjectIndex >= prevProjects.length
  //     ) {
  //       console.error("Invalid project index:", currentProjectIndex);
  //       return prevProjects;
  //     }

  //     // Create a copy of the projects array
  //     const updatedProjects = [...prevProjects];

  //     // Get the specific project
  //     const currentProject = updatedProjects[currentProjectIndex];

  //     if (taskIndex < 0 || taskIndex >= currentProject.tasks.length) {
  //       console.error("Invalid task index:", taskIndex);
  //       return prevProjects;
  //     }

  //     // Create a copy of the tasks array without the task at taskIndex
  //     const updatedTasks = [
  //       ...currentProject.tasks.slice(0, taskIndex),
  //       ...currentProject.tasks.slice(taskIndex + 1),
  //     ];

  //     // Update the tasks array for the specific project
  //     updatedProjects[currentProjectIndex] = {
  //       ...currentProject,
  //       tasks: updatedTasks,
  //     };

  //     return updatedProjects;
  //   });
  // };
  // const taskIndexRef = React.useRef((taskIndex) =>
  //   handleIndex(taskIndex, projectIndex)
  // );

  // useEffect(() => {
  //   taskIndexRef.current = (taskIndex) => handleIndex(taskIndex, projectIndex);
  // }, [projectIndex]);

  const capitalizeTitle = (title) => {
    return title.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  if (currentProject) {
    return (
      <div className="space-y-6">
        <div className="w-[90%] mx-auto space-y-3">
          <h2 className="text-4xl font-bold text-stone-700">
            {capitalizeTitle(currentProject.name)}
          </h2>
          <p className="text-stone-400">
            {formatDate(currentProject.due_date)}
          </p>
          <p>{currentProject.description}</p>
        </div>
        <div className="h-1 bg-stone-200 w-[90%] mx-auto"></div>
        <form className="w-[90%] mx-auto" onSubmit={submitTask}>
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
                required
                className="w-80 px-4 py-2 bg-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-500"
              ></input>
              <button className="px-4" type="submit">
                Add Task
              </button>
            </div>
          </div>
        </form>
        <TaskList
          listData={listData}
          setEndpoint={setEndpoint}
          tasks={tasks}
          taskStatus={taskStatus}
          setTaskStatus={setTaskStatus}
          limit={limit}
        />
      </div>
    );
  }
}

export default AddTask;
