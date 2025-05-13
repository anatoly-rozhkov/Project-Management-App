import logo from "../../public/logo.png";
import React from "react";
import AddProject from "../components/AddProject";
import AddTask from "../components/AddTask";
import ProjectList from "../components/ListComponents/ProjectList";
import deleteItem from "../components/methods/DeleteMethod";

const ProjectsPage = () => {
  const [editorState, setEditorState] = React.useState("startingState");
  const createProejectRef = React.useRef();
  const [projects, setProjects] = React.useState([]);
  const [currentProject, setCurrentProject] = React.useState(null);

  function handleAddNewProjectClick() {
    setEditorState("projectCreationState");
  }

  async function handleProjectDeleteClick(projectId) {
    setEditorState("startingState");
    await deleteItem(`projects/${projectId}/`);
    setCurrentProject(null);
  }

  function handleEditorState() {
    if (editorState === "startingState") {
      setEditorState("projectCreationState");
    }
  }

  const handleProjectSubmit = (selectedProject) => {
    // Set current project, open task editor
    setCurrentProject(selectedProject);
    setEditorState("taskCreationState");
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
            <AddTask projectId={currentProject["id"]} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectsPage;
