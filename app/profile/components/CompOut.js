'use client'
import Link from "next/link";

import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation'
import Cookies from 'js-cookie';

export default function CompOut({ children }) {
    const token = Cookies.get('token');

  const router = useRouter(); // Initialize the useRouter hook
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false);
  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  useEffect(() => {
    // Check if token exists
    if (!token) {
      // Redirect or handle unauthorized access
      router.push("/signin");
    }
  }, []);
  return (
   <> {token? <>  <h1 className="m-8 text-3xl ">اعدادات الحساب</h1>

   <div className="gap-3 md:gap-0  w-full p-3 flex justify-center flex-col md:flex-row h-fit md:flex md:items-center">
     <div id="profilelayout" className={`  `}>
       <button
         onClick={toggleShowMenu}
         className="md:hidden flex w-full p-3 rounded-2xl  gap-3 items-center  text-3xl"
       >
         <IoMenu className="text-3xl" />
         اختر
       </button>
       <ul
         className={`${
           showMenu ? "max-h-96 p-3" : "max-h-0 md:p-3 md:max-h-96 p-0"
         } md:w-40 md:items-center  backdrop-blur-xl flex flex-col gap-3  overflow-hidden duration-300`}
       >
         <li className={` ${
               pathname === "/profile/info"  ? "selected" : ""
             }`}> 
           <Link
             className={`w-full h-12 bg-white ${
               pathname === "/profile/info" ? "selected" : ""
             }
           
             
             `}
             href={"/profile/info"}
             id="profile"
           >
             معلوماتك
           </Link>
         </li>
         <li className={` ${
               pathname === "/profile/security" ? "selected" : ""
             }`}>
           <Link
             className={`${
               pathname === "/profile/security" ? "selected" : ""
             }`}
             href={"/profile/security"}
             id="profile"
           >
             الامان
           </Link>
         </li>
         <li className={` ${
               pathname === "/profile/favourites" ? "selected" : ""
             }`}>
           <Link
             className={`${
               pathname === "/profile/favourites" ? "selected" : ""
             }`}
             href={"/profile/favourites"}
             id="profile"
           >
             تفضيلاتي
           </Link>
         </li>
         <li className={` ${
               pathname === "/profile/myCourses" ? "selected" : ""
             }`}>
           <Link
             className={`${
               pathname === "/profile/myCourses" ? "selected" : ""
             }`}
             href={"/profile/myCourses"}
             id="profile"
           >
             كورساتي
           </Link>
         </li>
         <li className={` ${
               pathname ===  "/profile/payment-options" ? "selected" : ""
             }`}> 
           <Link
             className={`${
               pathname === "/profile/payment-options"
                 ? "selected"
                 : ""
             }`}
             href={"/profile/payment-options"}
             id="profile"
           >
             طريقة الدفع
           </Link>
         </li>
       </ul>
     </div>

     {children}
   </div> </> : "SignDiv" }
    
    
    </>
  );
}