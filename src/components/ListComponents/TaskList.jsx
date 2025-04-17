import React, { useState } from "react";
import Pagination from "./Pagianation";
import deleteItem from "../methods/DeleteMethod";

function TaskList({ listItems, taskStatus, setTaskStatus, ...props }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  async function handleClick(taskIndex) {
    await deleteItem(`http://127.0.0.1:8000/api/tasks/${listItems[taskIndex].id}/`)
    setTaskStatus((taskStatus) => taskStatus + 1);
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
    <div className="bg-stone-100 bg-stone-200 w-[90%] mx-auto rounded-md space-y-4 pt-4 pb-4">
      <ul className="space-y-5">
        {currentItems.map((obj, index) => (
          <div key={obj.id} className="flex justify-between items-center px-4">
            <li className="font-bold">{obj.name}</li>
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
};

export default TaskList;
