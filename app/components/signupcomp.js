'use client'

import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie'; 
import PhoneInput from 'react-phone-input-2';
import jwt from 'jsonwebtoken';
import  CryptoJS from 'crypto-js';
import 'react-phone-input-2/lib/style.css'
import { useSearchParams } from 'next/navigation';
import { useCart } from './CartContext';
export default function SignDiv(props) {
  const {cartItems, setCartItems} = useCart()
  const searchParams = useSearchParams()
  const parGet = searchParams.toString()
  console.log( 'sPar', parGet)
  const [lformData, setLformData] = useState({
    email: '',
    password: '',
  });
  const [sinvis, setSinvis] = useState(true);
  const [supvis, setSupvis] = useState(false);
  const [showSignDiv, setShowSignDiv] = useState(true);
  const [cookies, setCookie] = useCookies(['token', 'encryptedUserId', 'encryptedName']);

  const [linputValidity, setLinputValidity] = useState({
    email: true,
    password: true,
  });

  const [lerrorMessages, setlErrorMessages] = useState({
    email: '',
    password: '',})
  const handleCloseClick = () => {
    setShowSignDiv(false);
  };
  const handleclickL = () => {
    setSinvis(true);
    setSupvis(false);
  };
  const handleclickS = () => {
    setSinvis(false);
    setSupvis(true);
  };
  const handlelChange = (e) => {
    const { name, value } = e.target;
    setLformData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setLinputValidity((prevValidity) => ({
      ...prevValidity,
      [name]: e.target.checkValidity(),
    }));
  };
  const handlelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/login`, { ...lformData, cartItems });

      if (response && response.data) {
        console.log('Login successful');

        const { token, encryptedUserId, encryptedName, encryptedEmail,encryptedPN, favCourses, cart } = response.data;

        setCookie('token', token, { path: '/' });
        setCookie('encryptedUserId', encryptedUserId, { path: '/' });
        setCookie('encryptedName', encryptedName, { path: '/' });
        setCookie('encryptedEmail', encryptedEmail, { path: '/' });
        setCookie('encryptedPN', encryptedPN, { path: '/' });

        const decryptedId = CryptoJS.AES.decrypt(encryptedUserId, `${process.env.NEXT_PUBLIC_JWT_SECRET}`).toString(CryptoJS.enc.Utf8);

        const decodedToken = jwt.decode(token);
        const userId = decodedToken.userId;
        localStorage.setItem('cartItems', JSON.stringify(cart || []));

        localStorage.setItem('favcourses', JSON.stringify(favCourses || []));

        if(parGet==="logintopay="){
          window.location.href = '/cart'; 

        } else{        window.location.href = '/'; 
}
        
      } else {
        console.error('Error logging in: Unexpected response format');
      }
    }catch (error) {
      console.error('Error registering user:', error);
      if (error.response) {
        const { data } = error.response;
         if (data.message ) {
          setlErrorMessages(prevErrors => ({ ...prevErrors, password: data.message }));
        }
      }
    }
  };

  const [errorMessages, setErrorMessages] = useState({
    email: '',
    name: '',
    password: '',
    phoneNumber: '',
  });
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    phoneNumber: '', 
  });

  const [inputValidity, setInputValidity] = useState({
    email: true,
    name: true,
    password: true,
    phoneNumber: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setInputValidity((prevValidity) => ({
      ...prevValidity,
      [name]: e.target.checkValidity(),
    }));
  
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      if (value.length < 3 || value.length > 30) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          name: 'الاسم يجب ان يكون بين 3 الى 30 حرف',
        }));
      } else {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          name: '',
        }));
      }
    } else if (name === 'email') {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          email: 'ادخل البريد الالكتروني بشكل صحيح',
        }));
      } else {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          email: '',
        }));
      }
    } else if (name === 'password') {
      if (value.length < 8 || value.length > 30) {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          password: 'كلمة السر يجب ان لا تقل عن 8 احرف',
        }));
      } else {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          password: '',
        }));
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/register`, { ...formData, cartItems });
      console.log('User registered successfully');
  
      const { token, encryptedUserId, encryptedName,encryptedEmail,encryptedPN  } = response.data;
  
      setCookie('token', token, { path: '/' });
      setCookie('encryptedUserId', encryptedUserId, { path: '/' });
      setCookie('encryptedName', encryptedName, { path: '/' });
      setCookie('encryptedEmail', encryptedEmail, { path: '/' });
      setCookie('encryptedPN', encryptedPN, { path: '/' });
      setFormData({
        email: '',
        name: '',
        password: '',
        phoneNumber: '',
      });
      setErrorMessages({
        email: '',
        name: '',
        password: '',
        phoneNumber: '',
      });
      
      if(parGet==="logintopay="){
        window.location.href = '/cart'; 

      } else{        window.location.href = '/'; 
}

} catch (error) {
      console.error('Error registering user:', error);
      if (error.response) {
        const { data } = error.response;
        if (data.message && data.message.includes('بريد')) {
          setErrorMessages(prevErrors => ({ ...prevErrors, email: data.message }));
        } else if (data.message && data.message.includes('الرقم') ) {
          setErrorMessages(prevErrors => ({ ...prevErrors, phoneNumber: data.message }));
        }
      }
    }
  };
  
  return (
    <div id='mainsigndiv' className={`' ${props.className} absolute   left-1/2 -translate-x-1/2    overflow-hidden  duration-500 opacity-0 `}>
    <div id='signdiv' className={`${props.sclassName}  relative  p-4  pt-4 h-full  overflow-hidden  md:rounded-3xl`}>
      <div className='  flex justify-around  p-4   w-full  items-center '>
      <button id='signinbtnlg'  className={`p-4 hidden lg:flex text-xl  `}>تسجيل الدخول</button>
        <button id='signupbtnlg'  className={` hidden text-xl  p-4 lg:flex`}>انشاء حساب جديد</button>
        <button id='signinbtn' onClick={handleclickL} className={` ${sinvis? "signinbtn text-lg  " : " text-xs"} p-4  lg:hidden `}>تسجيل الدخول</button>
        <button id='signupbtn' onClick={handleclickS} className={` ${supvis? "signupbtn text-lg " : " text-xs"} p-4 lg:hidden`}>انشاء حساب جديد</button>
      </div>
      <div className='  flex flex-col lg:flex-row lg:gap-24 lg:after:h-96 after:rounded-full after:absolute after:bg-black after:opacity-20  lg:after:w-1   lg:justify-center lg:px-12 items-center justify-center    '>
        
        <div id='signindiv' className={`${sinvis? " h-80" : "h-0 opacity-0 lg:opacity-100 lg:h-auto"}  md:w-96 w-full duration-500   overflow-hidden`}>

          <form onSubmit={handlelSubmit} className="max-w-md mx-auto mt-4">
            <div className="mb-6">
              <input type="email" id="email" name="email" value={lformData.email} onChange={handlelChange} className={`${!linputValidity.email ? 'invalid' : ''}`} required />
              <label htmlFor="email" className={`${!linputValidity.email ? 'error' : ''}`}>البريد الالكتروني</label>
              <span  className="text-red-500 text-sm">{lerrorMessages.email}</span>
            </div>

            <div className="mb-6">
              <input type="password" id="password" name="password" value={lformData.password} onChange={handlelChange} className={`${!linputValidity.password ? 'invalid' : ''}`} required />
              <label htmlFor="password" >كلمة المرور</label>
              <span  className="text-red-500 text-sm">{lerrorMessages.password}</span>
            </div>
            <div className=' bg  flex-col flex justify-between gap-3 '>
             <Link href='' ><span className=' text-xs' >لا تتذكر كلمة المرور ؟</span></Link>
             <button  type="submit" className="  submit-btn    rounded-2xl w-full p-5">تسجيل الدخول</button>
            </div>
          </form></div>


          <div id='signupdiv' className={` ${supvis ? '' : 'h-0 opacity-0 lg:opacity-100 lg:h-auto'} md:w-96 w-full  overflow-hidden  duration-500  `}>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-4">
              <div className="mb-6">
                <input 
                 onBlur={handleBlur}
                type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`${!inputValidity.name ? 'invalid' : ''}`} required />
                <label htmlFor="name" className={`${!inputValidity.name || errorMessages.name ? 'error' : ''}`}>الاسم</label>
                <span className="text-red-500 text-sm">{errorMessages.name}</span>
              </div>

              <div className="mb-6">
                <input
              onBlur={handleBlur}
                type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`${!inputValidity.email ? 'invalid' : ''}`} required />
                <label htmlFor="email" className={`${!inputValidity.email || errorMessages.email ? 'error' : ''} relative`}>البريد الالكتروني</label>
                <span className="text-red-500 text-sm">{errorMessages.email}</span>
              </div>

              <div className="mb-6">
                <PhoneInput
                  value={formData.phoneNumber}
                  onChange={(value) => setFormData((prevData) => ({ ...prevData, phoneNumber: value }))}
                  className={`${!inputValidity.phoneNumber ? 'invalid' : ''} `}
                  required
                  country={'eg'}

                  autoFormat={true}
                  containerClass=" gap-3 flex h-14 relative"
                  inputClass='p-3 rounded-2xl h-full'
                  dropdownClass=' absolute left-0 rounded-3xl '
                  buttonClass=' rounded-2xl  bg-transparent absolute '
                  inputStyle={{ padding: "12px", paddingLeft:"70px", height:"100%", position:"relative", width:"100%"}}
                  buttonStyle={{ top:"50%", transform: "translatey(-50%)", border: "none", background:"transparent", borderRadius: "18px" , width :"fit-content", height: "fit-content", display:"flex" , justifyContent:"left", left:"0", position: "absolute"} }
                  dropdownStyle={{ minWidth : "300px", borderRadius:"18px", top:"100%"}}
                 
                />
                <label id='phonelabel' htmlFor="phoneNumber" className={`${!inputValidity.phoneNumber || errorMessages.phoneNumber ? 'error' : ''}  `}>رقم الموبايل</label>
                <span className="text-red-500 text-sm">{errorMessages.phoneNumber}</span>
              </div>

              <div className="mb-6">
                <input 
                 onBlur={handleBlur}
                type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={`${!inputValidity.password ? 'invalid' : ''}`} required />
                <label htmlFor="password" className={`${!inputValidity.password || errorMessages.password  ? 'error' : ''}`}>كلمة المرور</label>
                <span className="text-red-500 text-sm">{errorMessages.password}</span>
              </div>

              <button type="submit" className="  submit-btn  py-5 w-full  rounded-2xl mb-4 ">انشاء الحساب</button>
            </form>
          </div>
      </div>
    </div>
    </div>
  );
}