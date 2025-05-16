import ProjectList from "./ListComponents/ProjectList";
import { useNavigate } from "react-router-dom";

const Asside = () => {
    const navigate = useNavigate();

  return (
    <aside className="w-1/4 bg-black text-white pt-16 rounded-tr-xl mt-14">
      <h2 className="text-xl font-bold mb-6 pl-4">YOUR PROJECTS</h2>
      <button
        onClick={() => {navigate("/projects/create");}}
        className="bg-stone-800 text-stone-400 py-2 px-4 rounded mb-4 hover:bg-stone-700 ml-4"
      >
        + Add Project
      </button>
      <ProjectList />
    </aside>
  );
};

export default Asside;
