import React, { forwardRef, useState } from "react";

const TaskList = forwardRef(function TaskList({ listItems, ...props }, ref) {
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
            {obj.title}
            <button onClick={() => handleClick(startIndex + index)}>delete</button>
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

export default TaskList;
