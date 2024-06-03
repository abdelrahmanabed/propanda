
    // Fetch courses from the server when the component mounts
  export const fetchNewCourses = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/courses`,{ next: { revalidate: 1 } });
        const newCourses = response.json()
        return newCourses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };


    export const fetchCourses = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/courses`,{ next: { revalidate: 1 } });
        const courses = response.json()
        return courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

   export const fetchSingleCourseData = async (id) => {
      try {
        if (id) {
          // Fetch course data
          const courseResponse = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/courses/${id}`,{ next: { revalidate: 1 } });
          const courseData = courseResponse.json();
        return courseData
          // Fetch author data
    
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    export const fetchAuthorData = async (authorId) => {
      try {
        if (id) {
          // Fetch course data
          const authorResponse = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/instructors/${authorId}`,{ next: { revalidate: 1 } });
          const authorData = authorResponse.json();
        return authorData
          // Fetch author data
    
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
