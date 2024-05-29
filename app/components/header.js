"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef, Suspense } from 'react';
import SignDiv from './signupcomp';
import { FiUser } from "react-icons/fi";
import { FiUserPlus } from "react-icons/fi";
import { FaTimes } from 'react-icons/fa'; // Import the close icon
import Cookies from 'js-cookie';
import Usernav from './usernav';
import CryptoJS from 'crypto-js';
import CartBtn from './cartbutton';
import CartDiv from './cartdiv';
import { FaArrowLeft } from "react-icons/fa";
import SearchInput from './SearchInput';
import jwt from 'jsonwebtoken';
import BigNav from './BigNav';
import MobileNav from './MobileNav';
import { usePathname } from 'next/navigation';


const Header = () => {
  const [showSignDiv, setShowSignDiv] = useState(false); // State to control whether SignDiv should be shown or not
  const [showmobnav, setShowMobNav] = useState(false); // State to control whether SignDiv should be shown or not
  const [isHeaderFixed, setIsHeaderFixed] = useState(false); // State to track if the header is fixed or not
  const [showUserNav, setShowUserNav] = useState(false); // State to control whether SignDiv should be shown or not
  const [showCartNav, setShowCartNav] = useState(false); // State to control whether CARTNAV should be shown or not
  const [showEnterCart, setShowEnterCart] = useState(false); // State to control whether SignDiv should be shown or not
  const [userName , setUserName] = useState("")
  const [jwtUserId , setjwtUserId] = useState("")
  const [decryptedUserId , setdecryptedUserId] = useState("")
  const pathname = usePathname();
  const token = Cookies.get('token');
  const unavRef = useRef(null);

    useEffect(() => {
      // You can now use the current URL to detect changes
      const handleRouteChange = () => {
        setShowMobNav(false);
      };
  
      // Example usage with pathname and searchParams
      // Log the URL for demonstration purposes
  
      // Call your handleRouteChange function when pathname or searchParams change
      handleRouteChange();
  
      // Cleanup function is not needed as we're not adding event listeners
    }, [pathname]);
  
  useEffect(() => {
    const token = Cookies.get('token');
    const encryptedNameFromCookie = Cookies.get('encryptedName');
    const encryptedUserId = Cookies.get('encryptedUserId');

  if (encryptedUserId && token){
    const decryptedId = CryptoJS.AES.decrypt(encryptedUserId, `${process.env.NEXT_PUBLIC_JWT_SECRET}`).toString(CryptoJS.enc.Utf8);
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.userId;
    setjwtUserId(userId)
    setdecryptedUserId(decryptedId)
  }
    console.log("Token:", token);
    console.log("Encrypted Name from Cookie:", encryptedNameFromCookie);
  
    if (token && encryptedNameFromCookie ) {
      // Decrypt only if the cookie exists
      const decryptedName = CryptoJS.AES.decrypt(encryptedNameFromCookie, `${process.env.NEXT_PUBLIC_JWT_SECRET}`).toString(CryptoJS.enc.Utf8);
      console.log("Decrypted Name:", decryptedName);
      setUserName(decryptedName);
  } else {
      // Handle missing cookie (e.g., set default name or display error message)
      console.log("Encrypted name cookie not found.");
  }
  }, []);

   useEffect(() => {
        if (showUserNav) {
            document.addEventListener('mousedown', handleClickOutsideUN);
        } else {
            document.removeEventListener('mousedown', handleClickOutsideUN);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutsideUN);
        };
    }, [showUserNav]);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('header');
      
      const headerHeight = header.clientHeight;
      const scrollPosition = window.scrollY;
  
    
      if (scrollPosition > headerHeight) {
        setIsHeaderFixed(true);
      } else {
        setIsHeaderFixed(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClickOutsideUN = (event) => {
    if (unavRef.current && !unavRef.current.contains(event.target)) {
      setShowUserNav(false);
    }
};

 
  const toggleMobNav = () => {
    setShowMobNav(!showmobnav);
  };

  const toggleSignDiv = () => {
    setShowSignDiv(!showSignDiv); 
  };

  const toggleUserNav = () => {
    setShowUserNav(!showUserNav); 
  };
  const toggleCartNav = () => {
    setShowCartNav(!showCartNav); 
  };
  const toggleEnterCart = () => {
    setShowEnterCart(!showEnterCart);
  };
  return (
    <>
    <div  id='abovediv' className={` ${ isHeaderFixed ? "mt-24":""}`}>
    <header id="header" className={` ${isHeaderFixed ? 'bt fixed top-0 left-0  backdrop-blur-lg ' :  "relative  " }  h-18 z-40  p-3 flex justify-between duration-500 items-center`}>

    <div className=' md:hidden duration-500 justify-between gap-2 items-center w-fit '>
      <div className='flex gap-2 '>
      <div id='navtogmob' onClick={toggleMobNav} className={ `${showmobnav? " relative  p-0  gap-0 open " : " gap-0.5 p-2  "} relative duration-300  w-12 flex flex-wrap justify-center items-center rounded-2xl`}> 
        <span className={`${showmobnav? " w-1.5 h-5  -rotate-45 left-3.5 top-2 " : "  w-3.5 h-3.5 left-2 top-2"} absolute  bg-black duration-500   rounded`}></span>
        <span className={`${showmobnav? " w-1.5 h-5 rotate-45 right-3.5 top-2 " : "  w-3.5 h-3.5 right-2 top-2"} absolute bg-black  duration-500   rounded`}></span>
        <span className={`${showmobnav? " w-1.5 h-5 rotate-45 left-3.5 bottom-2 " : "  w-3.5 h-3.5 left-2 bottom-2"} absolute bg-black   duration-500  rounded`}></span>
        <span className={`${showmobnav? " w-1.5 h-5 -rotate-45 right-3.5 bottom-2  " : "  w-3.5 h-3.5 right-2 bottom-2"}  absolute bg-black    duration-500  rounded`}></span>
      

      </div>
      <div id='logodiv' className="logo h-12 rounded-2xl py-2">
       <Link href={"/"}> <Image src="/imgs/prologo1.svg" className='h-8 ' alt="Logo" width={90} height={100} /></Link>
      </div></div>
      <MobileNav className={`${ isHeaderFixed ? "mt-3":""}  ${showmobnav? "  right-0": " -right-full overflow-hidden opacity-0"}`}/>
      </div>

      <div className=' relative hidden md:flex duration-500 justify-between gap-2 items-center w-fit '>
      <div id='logodivm' className="logo  h-14 rounded-2xl p-2">
      <Link href={"/"}>   <Image src="/imgs/prologo1.svg" className='h-10' alt="Logo" width={90} height={100} /></Link>
      </div>

      <div className=" relative flex ">
       <SearchInput/>
        
          
        
      </div>

      <BigNav />

         
        <Link  onMouseEnter={()=>{ if(!showEnterCart && !showCartNav){toggleCartNav()
        toggleEnterCart()}
        }} onMouseLeave={()=>{if(showEnterCart && showCartNav){toggleCartNav()
          toggleEnterCart()}}}  href="/cart" id='lordcbdiv' className={`duration-300 ${showEnterCart? "min-w-56":"min-w-14 xl:min-w-44 "} relative  gap-2 flex h-14  items-center `}>  
       <span className={`${showEnterCart? "max-w-0" : "  max-w-0 xl:max-w-56 xl:pr-3"} text-nowrap duration-300 overflow-hidden  `}> سلة المشتريات</span>
      <div className={`${showEnterCart? "max-w-52 opacity-100 ":"max-w-0  "} text-white duration-300 overflow-hidden `}> 
        <span className={` w-52 text-nowrap `}>اضغط للدخول الى السلة</span></div>
          {!showEnterCart &&  <CartBtn color="#000" className="absolute top-1/2 -translate-y-1/2  xl:left-3 xl:translate-x-0  left-1/2 -translate-x-1/2"/>}
          {showEnterCart && <FaArrowLeft className="absolute left-5  animate-pulse"/> }
        </Link>
        <CartDiv className={ `${showCartNav?"max-h-screen w-96  p-3 opacity-100 pb-24 " :" w-0 max-h-0 p-0 opacity-0  "} ${ isHeaderFixed ? "mt-3":""}`}/>

      </div>
    
    
      <div className="auth flex items-center space-x-4">
      {token && jwtUserId === decryptedUserId ? (
    <button
    onClick={toggleUserNav}
      id="userbtn"
      className={` ${showUserNav? "open":""} h-12 md:h-14 text-sm  w-fit absolute left-4 top-1/2 -translate-y-1/2  rounded-2xl md:rounded-3xl items-center justify-center gap-1 duration-300 `}
    >
      <FiUser  className=' bg-black p-1 rounded-lg text-2xl text-white' />
{userName}
     
    </button>
  ) : (
    <button
      id="regbtn"
      className={`${
        showSignDiv
          ? `" z-40 absolute top-20 showsdx  ${isHeaderFixed ? " top-24 ":" "} open rounded-2xl "`
          : "h-12 md:h-14 w-28 absolute left-4 top-1/2 -translate-y-1/2 rounded-2xl md:rounded-2xl"
      } items-center justify-center gap-2 duration-500 px-2`}
      onClick={toggleSignDiv}
    >
      {showSignDiv ? (
        <FaTimes className="text-2xl" />
      ) : (
        <>
          التسجيل
          <FiUserPlus className="text-md md:text-xl"  />
        </>
      )}
    </button>
  )}
        </div>
        <Suspense fallback={<div className=' h-10 bg-white w-16'></div>}>
        <SignDiv className={`${  showSignDiv ? " p-0 md:p-3 w-full open z-30 opacity-100 md:w-full ":" w-full md:w-auto h-0 " } ${ isHeaderFixed ? "mt-3 md:mt-0  ":""}`} />
        <Usernav ref={unavRef} className={ `${showUserNav?"max-h-96  p-3 opacity-100 " :" max-h-0 p-0 opacity-0  "} ${ isHeaderFixed ? "mt-3":""}`}/></Suspense>
    </header>

    </div>
    </>
  );
};

export default Header;

