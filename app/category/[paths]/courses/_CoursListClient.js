'use client';

import { useState } from 'react';
import CourseClient from '../../../components/courseClient';
import SeeMoreButton from './_SeeMoreButton';

const CourseListClient = ({ initialCourses, category, userId }) => {
  const [courses, setCourses] = useState(initialCourses);
  const [page, setPage] = useState(1);

  const handleSeeMore = async () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  return (
    <div>
      {courses.map((course) => (
        <CourseClient
          key={course._id}
          href={`/courses/${course._id}`}
          photo={course.photo}
          title={course.title}
          price={course.price}
          courseId={course._id}
          instructor={course.author.name}
          hasPurchased={course.hasPurchased}
        />
      ))}
      <SeeMoreButton handleSeeMore={handleSeeMore} />
    </div>
  );
};

export default CourseListClient;
