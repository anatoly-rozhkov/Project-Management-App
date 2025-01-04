import { forwardRef, useState } from "react";

const ProjectList = forwardRef(function ProjectList(
  { listItems, ...props },
  ref
) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleClick = (index) => {
    ref.current(index);
  };

  // Calculate start and end indices
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get current page's items
  const currentItems = listItems.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(listItems.length / itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ul>
        {currentItems.map((obj, index) => (
          <li key={index}>
            <button onClick={() => handleClick(index)}>{obj.title}</button>
          </li>
        ))}
      </ul>
      <div>
        {/* Pagination buttons */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            disabled={currentPage === i + 1}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
});

export default ProjectList;
