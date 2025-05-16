import Aside from "../components/Aside";
import AddProject from "../components/AddProject";
import { useDispatch } from "react-redux";
import { setCurrentProject } from "../stores/projectSlice";

const ProjectCreationPage = () => {
  const dispatch = useDispatch();

  const handleProjectSubmit = (selectedProject) => {
    dispatch(setCurrentProject(selectedProject));
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Aside />
      <div className="w-3/4 flex flex-col items-center justify-center gap-4 p-4 overflow-y-auto h-full">
      <AddProject onSubmit={(handleProjectSubmit)} />
      </div>
    </div>
  );
};

export default ProjectCreationPage;
