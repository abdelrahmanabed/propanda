'use client'
import { useEffect, useState } from "react";
import CourseForCart from "./CourseforCart";
import { useCart } from "./CartContext";
import Totalprice from "../cart/components/totalprice";
import { fetchCourses } from "../../helpers/api";



const CartDiv = (props) => {
    const {cartItems} = useCart()
    const [courses, setCourses] = useState([]);



  useEffect(() => {
    // Fetch courses from the server
    const getCourses = async () => {
        try {
            const response = await fetchCourses();
            
            const filteredCourses = response.filter(course => cartItems.includes(course._id));

            setCourses(filteredCourses);
          
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    getCourses();
}, [cartItems]);
  

    return (

      <div id='cartcompdiv' className={` ${props.className}  div backdrop-blur-xl absolute flex  gap-3 flex-col overflow-hidden duration-300 top-20 -left-24 `}> 
        <div className={` flex  gap-3 flex-col overflow-hidden duration-300 relative w-full `}>

      {courses.length>0 ?courses.map((course) => (
          <div key={course._id} 
           className=" w-full ">
              <CourseForCart
              className={"flex w-full fon "}
              imagedivcn="w-20  rounded-3xl h-16 flex items-center justify-center overflow-hidden"
              
              linkcn=" flex gap-2 w-full"
              imagecn=" w-44 h-full"
              secdivcn=" w-full"
              h1cn=" text-xs  w-full"
              pricedivcn="flex w-full items-center justify-between gap-2"
              authorcn="text-xs font-light"
              pricecn="text-xs font-light"
              iconsdivcn=" hidden"
              markcn=""
              deletecn=""
                  href={`/courses/${course._id}`}
                  photo={course.photo}
                  title={course.title}
                  price={course.price}
                  courseId={course._id}
              />
          </div>
      )) : <span>السلة فارغة</span>}

<div className="fixed flex items-center justify-center gap-3 cartNavPrice bottom-0 h-16 m-3 left-0 border  rounded-3xl font-bold "> <span className=" font-normal text-sm">السعر الكلي </span><Totalprice courses={courses}/>
</div>
      </div>
  </div>
  )
}

export default CartDiv