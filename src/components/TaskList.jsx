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
    <div className="bg-stone-100 bg-stone-200 w-[90%] mx-auto rounded-md">
      <ul className="space-y-5">
        {currentItems.map((obj, index) => (
          <div className="flex justify-between items-center px-4">
            <li key={index} className="font-bold">
              {obj.title}
            </li>
            <button onClick={() => handleClick(startIndex + index)}>
              Clear
            </button>
          </div>
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
