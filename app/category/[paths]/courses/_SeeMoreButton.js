'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loading from '../../../components/loading';

const LoadMoreButton = ({ totalPages, category, userId, currentPage, sort }) => {
  const router = useRouter();
  const [load, setload] = useState(false)
  const handlePageClick = async (page) => {
    setload(true)
    const url = userId
    ? `${process.env.NEXT_PUBLIC_PORT}/api/courses/category/${category}?userId=${userId}&page=${page}&limit=9&sort=${sort}`
    : `${process.env.NEXT_PUBLIC_PORT}/api/courses/category/${category}?page=${page}&limit=9&sort=${sort}`;


      const response = await fetch(url);
      const data = await response.json();
      if (data.courses.length > 0) {
        router.push(`?page=${page}`);
        setload(false)
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
        {load? <Loading/> :index + 1}
      </button>
    ))}
  </div>
  );
};

export default LoadMoreButton;
