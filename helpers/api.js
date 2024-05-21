import axios from "axios";

    // Fetch courses from the server when the component mounts
  export const fetchNewCourses = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/courses`);
        const newCourses = response.data
        return newCourses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };


    export const fetchCourses = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/courses`);
        const courses = response.data
        return courses
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

   export const fetchSingleCourseData = async (id) => {
      try {
        if (id) {
          // Fetch course data
          const courseResponse = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/courses/${id}`);
          const courseData = courseResponse.data;
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
          const authorResponse = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/instructors/${authorId}`);
          const authorData = authorResponse.data;
        return authorData
          // Fetch author data
    
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
