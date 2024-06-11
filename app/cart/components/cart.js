'use client'
const CourseForCart = lazy(() => import("../../components/CourseforCart"));
const Totalprice = lazy(() => import("./totalprice"));import { fetchCourses } from "../../helpers/api";
import { Suspense, useEffect, useState, lazy } from "react";
import { useCart } from "../../components/CartContext";
import { useRouter } from "next/navigation";
import Loading from "../../components/loading";
import { useUser } from "../../components/UserContext";
import Image from "next/image";
import { totalPrice } from "./totalprice";
const Cart = () => {
  const router = useRouter()
  const [courses , setCourses] = useState([])
  const { loggedIn} = useUser()

  const [loading , setLoading] = useState(false)
  const[ messageShow,  setMessegeShow] = useState(false)
    const{cartItems} = useCart()
    useEffect(() => {
      setLoading(true)
      const fetchData = async () => {
        const response = await fetchCourses();
        if (response) {
          const courses = response.filter(course => cartItems.includes(course._id));
          setCourses(courses);
          setLoading(false)
        }
      };
  
      fetchData();
    }, [cartItems,loggedIn]);


const handlepay = ()=>{
 if(loggedIn){
  router.push(`/checkout?amount=${totalPrice}`)
 } else{
  setMessegeShow(true)
  router.push(`?logintopay`)
 }

}

    return (

      <div id='cartpage' className={` min-h-96 flex relative p-3 flex-col gap-3   pt-0 mt-3 `}> 
      {messageShow ?
      <div className=" flex justify-center w-full h-96 items-center paylogin ">سجل الدخول لاكمال عملية الشراء</div>
      :
      <>  <span className=" text-xs font-bold">في السلة عدد { cartItems.length} كورس</span>
{ 

<div id={"cartContainer"} className={` ${ courses.length < 1 ?" justify-center items-center":"flex-col md:grid md:grid-cols-2 lg:grid-cols-3 flex-wrap  "} flex flex-1  gap-3 `}>

      { courses.length>0? courses.map((course) => (
          <div key={course._id} 
           className=" w-full    ">
            <Suspense fallback={<div className=" bg-white h-24 w-full flex justify-center items-center"><Loading/></div>}>
              <CourseForCart
              className={"cartpage  relative flex gap-2 items-center"}
              imagedivcn="w-20  rounded-2xl h-16 flex items-center justify-center overflow-hidden"
              
              linkcn=" linkcartpage flex gap-2 p-3 w-full"
              imagecn=" w-44 h-full"
              secdivcn=" w-full flex flex-col"
              h1cn="   w-full flex-1"
              pricedivcn="flex w-full   items-center justify-between gap-2"
              authorcn=" "
              pricecn=" "
              iconsdivcn=" absolute -left-2 -top-2 "
              markcn=" p-3 rounded-2xl"
              deletecn=" p-2 deletecn hover:bg-rose-500 duration-300 drop-shadow-md rounded-2xl"
                  href={`/courses/${course._id}`}
                  photo={course.photo}
                  title={course.title}
                  price={course.price}
                  courseId={course._id}
                 
                  
              /></Suspense>
              
          </div>
      )): loading? <Loading/> :
      <div className=" flex flex-col gap-5 items-center justify-center">
        <Image src='/imgs/emptycart.png' width={500} height={500} className="w-40 pandacart "/>
        <span className=" text-lg font-bold ">لا يوجد اي دورات تعليمية في السلة</span>
        </div> 
      
      
      }


      </div>}{ courses.length>0 &&<div className=" flex flex-col p-3 items-center justify-center gap-3 cartNavPricep bottom-0  left-0 w-full  rounded-2xl font-bold min-h-32 "> 
<span className=" font-normal text-sm">السعر الكلي </span> 
<Totalprice courses={courses}/>
<button onClick={handlepay} id="paybutton" className=" p-3 rounded-2xl w-full md:w-32" >شراء</button>

</div>}</> }
           
  </div>
  )}
export default Cart