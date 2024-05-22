'use client'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const InfoCom = () => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPN, setUserPN] = useState('');
    const [userID, setUserID] = useState('');
    const [editable, setEditable] = useState(false); // State to track if fields are editable
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const handlePhoneChange = (value) => {
        setFormValues((prevData) => ({
            ...prevData,
            phone: value,
        }));
    };
    useEffect(() => {
        const encryptedName = Cookies.get('encryptedName');
        const encryptedEmail = Cookies.get('encryptedEmail');
        const encryptedPN = Cookies.get('encryptedPN');
        const encryptedID = Cookies.get('encryptedUserId');

        if (encryptedName) {
            // Decrypt the encrypted name if the cookie exists
            const decryptedName = CryptoJS.AES.decrypt(encryptedName, `${process.env.NEXT_PUBLIC_JWT_SECRET}`).toString(CryptoJS.enc.Utf8);
            setUserName(decryptedName);
            const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, `${process.env.NEXT_PUBLIC_JWT_SECRET}`).toString(CryptoJS.enc.Utf8);
            setUserEmail(decryptedEmail);
            const decryptedPN = CryptoJS.AES.decrypt(encryptedPN, `${process.env.NEXT_PUBLIC_JWT_SECRET}`).toString(CryptoJS.enc.Utf8);
            setUserPN(decryptedPN);
            const decryptedID = CryptoJS.AES.decrypt(encryptedID, `${process.env.NEXT_PUBLIC_JWT_SECRET}`).toString(CryptoJS.enc.Utf8);
            setUserID(decryptedID);
            setFormValues({
                name: decryptedName,
                email: decryptedEmail,
                phone: decryptedPN
            });
        } else {
            // Handle missing cookie (e.g., set default name or display error message)
            console.log("Encrypted name cookie not found.");
        }
    }, []); // Empty dependency array to ensure this effect runs only once

    const handleToggle = () => {
        setEditable(!editable); // Toggle the editable state
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleCancel = () => {
        setFormValues({
            name: userName,
            email: userEmail,
            phone: userPN
        });
        setErrors({
            name: '',
            email: '',
            phone: ''
        });
        setEditable(false); // Set editable state back to false after canceling
    };



 
    const handleSubmit = async (e, field) => {
        e.preventDefault();

       
        const newValue = formValues[field];

        // Update the user information in the database
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userID}`, {
                [field === 'phone' ? 'phoneNumber' : field]: newValue
            });
            console.log(response.data);
            setErrors(prevState => ({
                ...prevState,
                [field]: ''
            }));
        } catch (error) {
            console.error('Error updating user information:', error); if (error.response && error.response.data && error.response.data.message) {
                setErrors(prevState => ({
                    ...prevState,
                    [field]: error.response.data.message
                }));
            }
            return;
        }

        // Update the cookie with the new encrypted value
        // Update the cookie with the new encrypted value
const encryptedValue = CryptoJS.AES.encrypt(newValue, `${process.env.NEXT_PUBLIC_JWT_SECRET}`).toString();
Cookies.set(`encrypted${field === 'phone' ? 'PN' : field.charAt(0).toUpperCase() + field.slice(1)}`, encryptedValue);

        
        // Update the state with the new decrypted value
        switch (field) {
            case 'name':
                setUserName(newValue);
                break;
            case 'email':
                setUserEmail(newValue);
                break;
            case 'phone':
                setUserPN(newValue);
                break;
            default:
                break;
        }
        setEditable(false); // Set editable state back to false after submitting
    };

    return (
        <div id='infocomp' className='infocomp w-full backdrop-blur-xl'>
          
          
            <ul className='p-3 gap-3 flex flex-col h-fit '>
                <span className=' p-5'>المعلومات الشخصية</span>
                <li className='w-full '>
                    <div className='flex justify-between'>
                        <span>اسم المستخدم</span>
                        <button onClick={handleToggle} className={`${!editable ? 'max-h-20 p-3' : ' max-h-0 overflow-hidden'}`}>تغيير</button>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e, 'name')}>
                        <input     onChange={handleChange}  type="text" name="name" value={formValues.name}   readOnly={!editable} className={editable ? 'open' : ''} />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                        <button type="submit" disabled={!editable} className={editable ? 'max-h-20 p-3' : ' max-h-0 overflow-hidden'}>حفظ</button>
                        <button type="button" disabled={!editable} onClick={handleCancel}  className={`${editable ? 'max-h-20 p-3' :  ' max-h-0 overflow-hidden'} cancel`}>الغاء</button>
                    </form>
                </li>
                <li className='w-full '>
                    <div className='flex justify-between'>
                        <span>البريد الالكتروني</span>
                        <button onClick={handleToggle} className={`${!editable ? 'max-h-20 p-3' : ' max-h-0 overflow-hidden'}`}>تغيير</button>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e, 'email')}>
                        <input     onChange={handleChange}  type="email" name="email" value={formValues.email}  readOnly={!editable} className={editable ? 'open' : ''} />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                        <button type="submit" disabled={!editable} className={editable ? 'max-h-20 p-3' : ' max-h-0 overflow-hidden'}>حفظ</button>
                        <button type="button" disabled={!editable} onClick={handleCancel}  className={`${editable ? 'max-h-20 p-3' :  ' max-h-0 overflow-hidden'} cancel`}>الغاء</button>
                    </form>
                </li>
                <li className='w-full '>
                    <div className='flex justify-between'>
                        <span>رقم الهاتف</span>
                        <button onClick={handleToggle} className={`${!editable ? 'max-h-20 p-3' : ' max-h-0 overflow-hidden'}`}>تغيير</button>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e, 'phone')}>
                        <div className="flex items-center">
                        <PhoneInput

                           value={formValues.phone}
                       country={'eg'}
                        readOnly={!editable} className={editable ? 'open' : ''}
                        autoFormat={true}
                        containerClass={` gap-3 flex max-h-20 relative ${ !editable&& " bg-transparent"}`}
                        inputClass=' rounded-3xl h-full'
                        dropdownClass=' absolute left-0 rounded-2xl '
                        buttonClass=' rounded-2xl  bg-transparent absolute '
                        inputStyle={{ padding: "12px", paddingLeft:"70px", height:"100%", position:"relative", width:"100%", } } 
                        buttonStyle={{ top:"50%", transform: "translatey(-50%)", border: "none", background:"transparent", borderRadius: "18px" , width :"fit-content", height: "fit-content", display:"flex" , justifyContent:"left", left:"0", position: "absolute"} }
                        dropdownStyle={{ minWidth : "300px", borderRadius:"18px", top:"100%"}}
                        onChange={handlePhoneChange}

/>
                        </div>
                        {errors.phone && <p className="text-red-500">{errors.phone}</p>}
                        <button type="submit" disabled={!editable} className={editable ? 'max-h-20 p-3' : ' max-h-0 overflow-hidden'}>حفظ</button>
                        <button type="button" disabled={!editable} onClick={handleCancel} className={`${editable ? 'max-h-20 p-3' :  ' max-h-0 overflow-hidden'} cancel`}>الغاء</button>
                    </form>
                </li>
            </ul>
        </div>
    );
};

export default InfoCom;