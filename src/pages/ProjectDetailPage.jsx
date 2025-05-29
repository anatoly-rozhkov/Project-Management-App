import AddTask from "../components/AddTask";
import Aside from "../components/Aside";
import { useParams } from "react-router-dom";

const ProjectDetailPage = () => {
  const { projectId } = useParams();

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Aside />
      <div className="flex flex-col flex-1 px-8 space-y-6 mt-12">
        <AddTask currentProjectId={projectId} />
      </div>
    </div>
  );
};

export default ProjectDetailPage;
