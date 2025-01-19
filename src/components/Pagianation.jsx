import React from "react";

const Pagination = ({ currentPage, totalPages, goToPage }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show the first page
    if (currentPage > 2) {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push("...");
      }
    }

    // Show 1 page before, current, and 1 page after
    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }

    // Always show the last page
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 1 && currentPage + 1 !== totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center space-x-2">
      {/* Previous button */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 rounded bg-stone-300 text-black hover:bg-stone-400 disabled:opacity-50"
      >
        &laquo;
      </button>

      {/* Page numbers */}
      <div className="w-[36%] justify-center flex space-x-2">
      {pageNumbers.map((page, index) =>
        page === "..." ? (
          <span key={page + index} className="px-2 py-1 text-black">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page)}
            disabled={currentPage === page}
            className={`px-2 py-1 rounded ${
              currentPage === page
                ? "bg-stone-500 text-white"
                : "bg-stone-300 text-black hover:bg-stone-400"
            }`}
          >
            {page}
          </button>
        )
      )}
      </div>

      {/* Next button */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 rounded bg-stone-300 text-black hover:bg-stone-400 disabled:opacity-50"
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
