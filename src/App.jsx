import logo from "../public/logo.png";
import React from "react";
import AddProject from "./components/AddProject";
import AddTask from "./components/AddTask";
import ProjectList from "./components/ProjectList";

function App() {
  const [editorState, setEditorState] = React.useState("startingState");
  const createProejectRef = React.useRef();
  const createTaskRef = React.useRef();
  const [projects, setProjects] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(null);

  const handleIndex = (index) => {
    setEditorState("secondaryProjectCreationState");
    setCurrentIndex(index);
  };
  const projectIndexRef = React.useRef(handleIndex);

  function handleAddNewProjectClick() {
    setEditorState("projectCreationState");
  }

  function handleEditorState() {
    if (editorState === "startingState") {
      setEditorState("projectCreationState");
    }
  }

  const handleProjectSubmit = (project_data) => {
    setProjects((projects) => [...projects, project_data]);
    setEditorState("taskCreationState");
  };

  const handleTaskSubmit = (task_data, projectIndex) => {
    setProjects((prevProjects) => {
      if (projectIndex < 0 || projectIndex >= prevProjects.length) {
        console.error("Invalid project index:", projectIndex);
        return prevProjects;
      }

      // Create a copy of the projects array
      const updatedProjects = [...prevProjects];

      // Update the tasks array for the specific project
      updatedProjects[projectIndex] = {
        ...updatedProjects[projectIndex],
        tasks: [...updatedProjects[projectIndex].tasks, task_data],
      };

      return updatedProjects;
    });
    createTaskRef.current.querySelector("#title").value = "";
  };

  return (
    <>
      <div className="flex h-screen">
        <aside className="w-1/4 h-[calc(100vh-2.5rem)] bg-black text-white flex flex-col items-center justify-start gap-4 pt-20 p-4 fixed top-20 rounded-tr-xl">
          <h2>YOUR PROJECTS</h2>
          <button
            onClick={handleAddNewProjectClick}
            className="px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-stone-700 text-white hover:bg-stone-800 rounded-md transition-all duration-300"
          >
            + ADD PROJECT
          </button>
          <ProjectList listItems={projects} ref={projectIndexRef} />
        </aside>
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 gap-4 p-4">
          {editorState === "startingState" ? (
            <>
              <img
                src={logo}
                alt="Notepad with a pen"
                className="w-32 h-auto"
              />
              <h2>No Project Selected</h2>
              <p>Select a project or get started with a new one</p>
              <button
                onClick={handleEditorState}
                className="px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 bg-stone-500 text-white hover:bg-stone-700 rounded-md transition-all duration-300"
              >
                Create new project
              </button>
            </>
          ) : editorState === "projectCreationState" ? (
            <AddProject
              ref={createProejectRef}
              onSubmit={handleProjectSubmit}
            />
          ) : editorState === "secondaryProjectCreationState" ? (
            <>
              <AddTask
                ref={createTaskRef}
                projects={projects}
                setProjects={setProjects}
                projectIndex={currentIndex}
                onSubmit={handleTaskSubmit}
              />
            </>
          ) : (
            <>
              <AddTask
                ref={createTaskRef}
                projects={projects}
                setProjects={setProjects}
                projectIndex={projects.length - 1}
                onSubmit={handleTaskSubmit}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
