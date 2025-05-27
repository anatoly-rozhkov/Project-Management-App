import AddTask from "../components/AddTask";
import { useSelector } from "react-redux";
import Aside from "../components/Aside";

const ProjectDetailPage = () => {
  const currentProject = useSelector((state) => state.project.currentProject);
  
  // DODO 3) Check what happens on detail page refresh cos it breaks everything
  // need to add a feature that would request project details if current project is null
  

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Aside />
      <div className="flex flex-col flex-1 px-8 space-y-6 mt-12">
        <AddTask currentProject={currentProject} />
      </div>
    </div>
  );
};

export default ProjectDetailPage;
