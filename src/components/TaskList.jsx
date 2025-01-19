import React, { forwardRef, useState } from "react";
import Pagination from "./Pagianation";

const TaskList = forwardRef(function TaskList({ listItems, ...props }, ref) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
  const placeholders = itemsPerPage - currentItems.length;

  const goToPage = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <div className="bg-stone-100 bg-stone-200 w-[90%] mx-auto rounded-md space-y-4 pt-4 pb-4">
      <ul className="space-y-5">
        {currentItems.map((obj, index) => (
          <div key={index} className="flex justify-between items-center px-4">
            <li className="font-bold">{obj.title}</li>
            <button onClick={() => handleClick(startIndex + index)}>
              Clear
            </button>
          </div>
        ))}
        {Array.from({ length: placeholders }).map((_, index) => (
          <div key={`placeholder-${index}`} className="px-4 cursor-default">
            <li>&nbsp;</li>
          </div>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
        fullLength={true}
      />
    </div>
  );
});

export default TaskList;
