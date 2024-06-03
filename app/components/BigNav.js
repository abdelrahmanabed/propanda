import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FaAngleDown } from 'react-icons/fa';

const BigNav = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSub, setIsSub] = useState(false);
    const navRef = useRef(null);

    const toggleSub = () => {
        if(isSub){ setIsSub(false);}
        if(!isSub){ setIsSub(true);}

      };
      const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setIsNavOpen(false);
        }
    };

    useEffect(() => {
        if (isNavOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNavOpen]);
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
      };
  return (
    <nav id='navdiv'  ref={navRef} className="flex relative">
      <button
    
        id='navbtn'
        onClick={toggleNav}
        className={` ${isNavOpen ? 'open' : ''} h-14 rounded-2xl p-2 gap-2 duration-300 items-center relative flex`}
      >
        الدورات التدريبية
        <FaAngleDown className={`text-2xl transform duration-300 ${isNavOpen ? 'rotate-180' : ''}`} />
     
     </button>
      <ul className={`main ${isNavOpen ? 'open' : ''}`}>
        <li >
          <Link href="/courses" className={`${isSub ? "yes":""} first flex justify-between backdrop-blur-xl` }>الاقسام         <FaAngleDown className={` transform`} />
</Link>
          <ul className={`sub`} onMouseEnter={()=> {
            toggleSub()
          }} onMouseLeave={()=>{
            toggleSub()
          }}>
            <li><Link className='backdrop-blur-xl' href="/category/programming">البرمجة و التكنولوجيا</Link></li>
            <li><Link className='backdrop-blur-xl' href="/category/languages">اللغات</Link></li>
            <li><Link className='backdrop-blur-xl' href="/category/designing">التصميم</Link></li>
            <li><Link className='backdrop-blur-xl' href="/category/learning">التعليم</Link></li>
            <li><Link className='backdrop-blur-xl' href="/category/skills">المهارات المكتبية</Link></li>
            <li><Link className='backdrop-blur-xl' href="/category/healthandsafety">الصحة و السلامة المهنية</Link></li>
            <li><Link className='backdrop-blur-xl' href="/category/marketing">التسويق</Link></li>

          </ul>
        </li>
        <li className='second duration-300 '><Link  className='second backdrop-blur-xl' href="/instructors">المدرسين</Link></li>
        <li className='last'><Link className='last backdrop-blur-xl' href="/pathways" >مسارات التعلم</Link></li>
      </ul>
    </nav>
  );
};

export default BigNav;