'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState()
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userPhone, setUserPhone] = useState()
    const [loggedIn , setLoggedIn] = useState(false)
    useEffect(() => {
        const token = Cookies.get('token');
   if(token)  {   const token = Cookies.get('token');
        const encryptedName = Cookies.get('encryptedName');
        const encryptedEmail = Cookies.get('encryptedEmail');
        const encryptedPN = Cookies.get('encryptedPN');
        const encryptedID = Cookies.get('encryptedUserId');
        if (encryptedID && token){
            const decryptedId = CryptoJS.AES.decrypt(encryptedID, `${process.env.NEXT_PUBLIC_JWT_SECRET}`).toString(CryptoJS.enc.Utf8);
            const decodedToken = jwt.decode(token);
            const decodedUserId = decodedToken.userId;
            if(decodedUserId === decryptedId ){
                setLoggedIn(true)
            }
            setUserId(decryptedId)
          }
          const decryptedName = CryptoJS.AES.decrypt(encryptedName, `${process.env.NEXT_PUBLIC_JWT_SECRET}`).toString(CryptoJS.enc.Utf8);
            setUserName(decryptedName);
            const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, `${process.env.NEXT_PUBLIC_JWT_SECRET}`).toString(CryptoJS.enc.Utf8);
            setUserEmail(decryptedEmail);
            const decryptedPN = CryptoJS.AES.decrypt(encryptedPN, `${process.env.NEXT_PUBLIC_JWT_SECRET}`).toString(CryptoJS.enc.Utf8);
            setUserPhone(decryptedPN);}
    }, [userId]);
    
    const handleLogout = () => {
        const cookieKeys = Object.keys(Cookies.get());
        cookieKeys.forEach((key) => {
          Cookies.remove(key);
          localStorage.clear();

        });


      
        
         window.location.reload()
      };
  
    
    return (
        <UserContext.Provider value={{ userEmail, userId, userName, userPhone, loggedIn, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};


