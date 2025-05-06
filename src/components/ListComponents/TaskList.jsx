import React, { useState } from "react";
import Pagination from "./Pagianation";
import deleteItem from "../methods/DeleteMethod";

function TaskList({
  listData,
  setEndpoint,
  tasks,
  taskStatus,
  setTaskStatus,
  limit,
  ...props
}) {
  const [currentPage, setCurrentPage] = useState(1);

  async function handleClick(taskId) {
    await deleteItem(`tasks/${taskId}/`);
    setTaskStatus((taskStatus) => taskStatus + 1);
  }

  // Calculate placeholders
  const placeholders = limit - tasks.length;

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-stone-100 bg-stone-200 w-[90%] mx-auto rounded-md space-y-4 pt-4 pb-4">
      <ul className="space-y-5">
        {tasks.map((obj) => (
          <div key={obj.id} className="flex justify-between items-center px-4">
            <li className="font-bold">{obj.name}</li>
            <button onClick={() => handleClick(obj.id)}>Clear</button>
          </div>
        ))}
        {Array.from({ length: placeholders }).map((_, index) => (
          <div key={`placeholder-${index}`} className="px-4 cursor-default">
            <li>&nbsp;</li>
          </div>
        ))}
      </ul>
      <Pagination
        listData={listData}
        setEndpoint={setEndpoint}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
      />
    </div>
  );
}

export default TaskList;
