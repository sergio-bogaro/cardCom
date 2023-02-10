import { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { ButtonOrLink } from './ButtonOrLink';

interface paginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: any;
}

const Pagination = ({ totalPages, currentPage, handlePageChange }: paginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages > 1) {
    return (
      <div className="mt-4 flex w-fit gap-2 text-black">
        <button
          className="flex items-center rounded-full bg-white p-2 transition-all hover:bg-gray-400 disabled:pointer-events-none disabled:opacity-60"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          <AiOutlineLeft />
        </button>

        {pageNumbers.map((page) => {
          return (
            <button
              className="flex items-center rounded-full bg-white px-3 transition-all hover:bg-gray-400 disabled:pointer-events-none disabled:bg-blue-700"
              disabled={currentPage === page}
              key={'page - ' + page}
              onClick={() => handlePageChange(page)}>
              {page}
            </button>
          );
        })}

        <button
          className="flex items-center rounded-full bg-white p-2 transition-all hover:bg-gray-400 disabled:pointer-events-none disabled:opacity-60"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}>
          <AiOutlineRight />
        </button>
      </div>
    );
  }

  return null;
};

export default Pagination;
