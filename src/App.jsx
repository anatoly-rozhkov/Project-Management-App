import logo from "../public/logo.png";
import React from "react";
import AddProject from "./components/AddProject";
import AddTask from "./components/AddTask";
import ProjectList from "./components/ListComponents/ProjectList";
import deleteItem from "./components/methods/DeleteMethod";

function App() {
  const [editorState, setEditorState] = React.useState("startingState");
  const createProejectRef = React.useRef();
  // const createTaskRef = React.useRef();
  const [projects, setProjects] = React.useState([]);
  const [currentProject, setCurrentProject] = React.useState(null);

  const handleIndex = (index) => {
    setEditorState("secondaryProjectCreationState");
    // setCurrentIndex(index);
  };
  const projectIndexRef = React.useRef(handleIndex);

  function handleAddNewProjectClick() {
    setEditorState("projectCreationState");
  }

  async function handleProjectDeleteClick(projectId) {
    setEditorState("startingState");
    await deleteItem(`http://127.0.0.1:8000/api/projects/${projectId}/`);
    setCurrentProject(null);

    // setProjects((prevProjects) => {
    //   if (deleteProejctIndex < 0 || deleteProejctIndex >= prevProjects.length) {
    //     console.error("Invalid project index:", deleteProejctIndex);
    //     return prevProjects;
    //   }

    //   const updatedProjects = [
    //     ...prevProjects.slice(0, deleteProejctIndex),
    //     ...prevProjects.slice(deleteProejctIndex + 1),
    //   ];

    //   return updatedProjects;
    // });
  }

  function handleEditorState() {
    if (editorState === "startingState") {
      setEditorState("projectCreationState");
    }
  }

  // const { projects, error } = useFetchProjects();

  const handleProjectSubmit = (selectedProject) => {
    // Set current project, open task editor
    setCurrentProject(selectedProject);
    setEditorState("taskCreationState");
  };

  const handleTaskSubmit = (projectId) => {
    // setProjects((prevProjects) => {
    //   //   if (projectIndex < 0 || projectIndex >= prevProjects.length) {
    //   //     console.error("Invalid project index:", projectIndex);
    //   //     return prevProjects;
    //   //   }
    //     // Create a copy of the projects array
    //     const updatedProjects = [...prevProjects];
    //     // Update the tasks array for the specific project
    //     updatedProjects[projectIndex] = {
    //       ...updatedProjects[projectIndex],
    //       tasks: [task_data, ...updatedProjects[projectIndex].tasks],
    //     };
    //     return updatedProjects;
    //   });
    //   createTaskRef.current.querySelector("#title").value = "";
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <aside className="w-1/4 bg-black text-white pt-16 rounded-tr-xl mt-14">
        <h2 className="text-xl font-bold mb-6 pl-4">YOUR PROJECTS</h2>
        <button
          onClick={handleAddNewProjectClick}
          className="bg-stone-800 text-stone-400 py-2 px-4 rounded mb-4 hover:bg-stone-700 ml-4"
        >
          + Add Project
        </button>
        <ProjectList
          currentProject={currentProject}
          onProjectClick={handleProjectSubmit}
          projects={projects}
          setProjects={setProjects}
        />
      </aside>
      <div
        className={`w-3/4 flex flex-col items-center ${
          editorState === "taskCreationState"
            ? "justify-start"
            : "justify-center"
        } gap-4 p-4 overflow-y-auto h-full`}
      >
        {editorState === "startingState" ? (
          <>
            <img src={logo} alt="Notepad with a pen" className="w-32 h-auto" />
            <h2 className="text-stone-600 text-xl font-bold">
              No Project Selected
            </h2>
            <p className="text-stone-500">
              Select a project or get started with a new one
            </p>
            <button
              onClick={handleEditorState}
              className="px-4 py-2 bg-stone-800 text-stone-400 font-semibold hover:bg-stone-500 rounded-md transition-all duration-300"
            >
              Create new project
            </button>
          </>
        ) : editorState === "projectCreationState" ? (
          <AddProject ref={createProejectRef} onSubmit={handleProjectSubmit} />
        ) : editorState === "secondaryProjectCreationState" ? (
          <div className="w-full">
            <div className="flex justify-end pr-28">
              <button
                onClick={() => handleProjectDeleteClick(currentProject["id"])}
              >
                Delete
              </button>
            </div>
            {/* <AddTask
              projectId={currentProject.id}
              onSubmit={handleTaskSubmit}
              // ref={createTaskRef}
            /> */}
          </div>
        ) : editorState === "taskCreationState" ? (
          <div className="w-full">
            <div className="mx-auto flex justify-end w-[90%]">
              <button
                onClick={() => handleProjectDeleteClick(currentProject["id"])}
              >
                Delete
              </button>
            </div>
            <AddTask
              projectId={currentProject["id"]}
              onSubmit={handleTaskSubmit}
              // ref={createTaskRef}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
