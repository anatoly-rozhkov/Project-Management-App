import logo from "../../public/logo.png";
import Aside from "../components/Aside";
import { useNavigate } from "react-router-dom";

const ProjectsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Aside />
      <div className="w-3/4 flex flex-col items-center justify-center gap-4 p-4 overflow-y-auto h-full">
        <img src={logo} alt="Notepad with a pen" className="w-32 h-auto" />
        <h2 className="text-stone-600 text-xl font-bold">
          No Project Selected
        </h2>
        <p className="text-stone-500">
          Select a project or get started with a new one
        </p>
        <button
          onClick={() => navigate("/projects/create")}
          className="px-4 py-2 bg-stone-800 text-stone-400 font-semibold hover:bg-stone-500 rounded-md transition-all duration-300"
        >
          Create new project
        </button>
      </div>
    </div>
  );
};

export default ProjectsPage;
