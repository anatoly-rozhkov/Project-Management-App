import React from "react";

const Pagination = ({
  listData,
  setEndpoint,
  currentPage,
  setCurrentPage,
  limit,
}) => {
  return (
    <div className="flex justify-center space-x-2">
      {/* Previous button */}
      <button
        onClick={() => {
          setEndpoint(listData.previous);
          setCurrentPage((prev) => prev - 1);
        }}
        disabled={currentPage === 1}
        className="px-2 py-1 rounded bg-stone-300 text-black hover:bg-stone-400 disabled:opacity-50"
      >
        &laquo;
      </button>

      {/* Next button */}
      <button
        onClick={() => {
          setEndpoint(listData.next);
          setCurrentPage((prev) => prev + 1);
        }}
        disabled={currentPage === Math.ceil(listData.count / limit)}
        className="px-2 py-1 rounded bg-stone-300 text-black hover:bg-stone-400 disabled:opacity-50"
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
