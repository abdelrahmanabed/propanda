import React from 'react'
import  CryptoJS from 'crypto-js';

const Userbtn = () => {
        const token = Cookies.get('token');
        const secretKey = process.env.JWT_SECRET;
      
        console.log("Token:", token);
        console.log("Encrypted Name from Cookie:", encryptedNameFromCookie);
      
        if (token && encryptedNameFromCookie ) {
          const decryptedName = CryptoJS.AES.decrypt(encryptedNameFromCookie, secretKey).toString(CryptoJS.enc.Utf8);
          console.log("Decrypted Name:", decryptedName);
          setUserName(decryptedName);
      } else {
          console.log("Encrypted name cookie not found.");
      }
  return (
    <button
    onClick={toggleUserNav}
      id="userbtn"
      className={`"h-11 md:h-14 w-fit absolute left-4 top-4 rounded-2xl md:rounded-2xl items-center justify-center gap-2 duration-700 px-2`}
    >
      {userName}
     
    </button>  )
}

export default Userbtn