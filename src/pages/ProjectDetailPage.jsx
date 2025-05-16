import AddTask from "../components/AddTask";
import deleteItem from "../components/methods/DeleteMethod";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProject } from "../stores/projectSlice";
import { useNavigate } from "react-router-dom";
import Aside from "../components/Aside";

const ProjectDetailPage = () => {
  const currentProject = useSelector((state) => state.project.currentProject);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleProjectDeleteClick(projectId) {
    await deleteItem(`projects/${projectId}/`);
    dispatch(setCurrentProject(null));
    navigate("/projects");
  }

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Aside />
      <div className="mx-auto flex justify-end w-[90%]">
        <button onClick={() => handleProjectDeleteClick(currentProject["id"])}>
          Delete
        </button>
      </div>
      <AddTask projectId={currentProject["id"]} />
    </div>
  );
};

export default ProjectDetailPage;
