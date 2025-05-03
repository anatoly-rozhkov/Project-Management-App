import { useState, useEffect } from "react";
import Pagination from "./Pagianation";
import api from "../methods/RefreshMethod";

function ProjectList({
  currentProject,
  onProjectClick,
  projects,
  setProjects,
  ...props
}) {
  const limit = 9;

  const [currentPage, setCurrentPage] = useState(1);
  const [listData, setListData] = useState({});
  const [endpoint, setEndpoint] = useState(`projects/?limit=${limit}&offset=0`);

  useEffect(() => {
    api
      .get(endpoint)
      .then((response) => {
        setProjects(response.data["results"]);
        setListData(response.data);
      })
      .catch((error) => console.error(error));
  }, [currentProject, endpoint]);

  const handleClick = (clickedProject) => {
    onProjectClick(clickedProject);
  };

  // Calculate placeholders
  const placeholders = limit - projects;

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-2 px-4 mb-4 ml-1">
      <ul className="text-gray-400 text-xl text-white">
        {projects.map((obj) => (
          <li
            key={obj.id}
            className={`py-2 cursor-pointer hover:text-white ${
              obj.id === currentProject?.id ? "bg-stone-800" : "bg-black"
            }`}
            onClick={() => handleClick(obj)}
          >
            {obj.name}
          </li>
        ))}
        {Array.from({ length: placeholders }).map((_, index) => (
          <li key={`placeholder-${index}`} className="py-2 cursor-default">
            &nbsp;
          </li>
        ))}
      </ul>
      {listData.count > 1 ? (
        <Pagination
          listData={listData}
          setEndpoint={setEndpoint}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          fullLength={false}
        />
      ) : null}
    </div>
  );
}

export default ProjectList;
