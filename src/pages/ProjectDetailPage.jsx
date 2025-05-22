import AddTask from "../components/AddTask";
import { useSelector } from "react-redux";
import Aside from "../components/Aside";

const ProjectDetailPage = () => {
  const currentProject = useSelector((state) => state.project.currentProject);

  // DODO 3) Check what happens on detail page refresh cos it breaks everything
  // DODO 4) Still not clear what happens on toekn refresh cos it just sends infinte requests

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
