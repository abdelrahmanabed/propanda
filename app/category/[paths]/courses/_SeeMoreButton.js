'use client';

import { useRouter } from 'next/navigation';

const LoadMoreButton = ({ totalPages, category, userId, currentPage }) => {
  const router = useRouter();

  const handlePageClick = async (page) => {
    const url = userId
    ? `${process.env.NEXT_PUBLIC_PORT}/api/courses/category/${category}?userId=${userId}&page=${page}&limit=9`
    : `${process.env.NEXT_PUBLIC_PORT}/api/courses/category/${category}?page=${page}&limit=9`;


      const response = await fetch(url);
      const data = await response.json();
      if (data.courses.length > 0) {
        router.push(`?page=${page}`);
      }
  };

  return (
    <div className="page-indicators justify-center flex gap-2">
    {[...Array(totalPages).keys()].map((_, index) => (
      <button
        key={index + 1}
        onClick={() => handlePageClick(index + 1)}
        className={`page-indicator ${index + 1 === currentPage ? 'active' : ''}`}
      >
        {index + 1}
      </button>
    ))}
  </div>
  );
};

export default LoadMoreButton;
