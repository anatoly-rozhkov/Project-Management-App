import { forwardRef, useState } from "react";
import Pagination from "./Pagianation";

const ProjectList = forwardRef(function ProjectList(
  { listItems, currentProject, ...props },
  ref
) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(null);
  const itemsPerPage = 9;

  const handleClick = (index) => {
    // setCurrentProjectIndex(index);
    ref.current(index);
  };

  // Calculate start and end indices
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get current page's items
  const currentItems = listItems.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(listItems.length / itemsPerPage);
  const placeholders = itemsPerPage - currentItems.length;

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="py-2 px-4 mb-4 ml-1">
      <ul className="text-gray-400 text-xl text-white">
        {currentItems.map((obj, index) => (
          <li
            key={index}
            className={`py-2 cursor-pointer hover:text-white ${
              index === currentProject ? "bg-stone-800" : "bg-black"
            }`}
            onClick={() => handleClick(index)}
          >
            {obj.title}
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
});

export default ProjectList;
