import { useState, useEffect } from "react";
import Pagination from "./Pagianation";
import axios from "axios";

function ProjectList({ currentProject, onProjectClick, projects, setProjects, ...props }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/projects/")
      .then((response) => setProjects(response.data["results"]))
      .catch((error) => console.error(error));
  }, [currentProject]);

  const handleClick = (clickedProject) => {
    onProjectClick(clickedProject);
  };

  // Calculate start and end indices
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get current page's items
  const currentItems = projects.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const placeholders = itemsPerPage - currentItems.length;

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-2 px-4 mb-4 ml-1">
      <ul className="text-gray-400 text-xl text-white">
        {projects.map((obj, index) => (
          <li
            key={obj.id}
            className={`py-2 cursor-pointer hover:text-white ${
              index === currentProject ? "bg-stone-800" : "bg-black"
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
      {totalPages > 1 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
          fullLength={false}
        />
      ) : null}
    </div>
  );
};

export default ProjectList;
