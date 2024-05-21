'use client'
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const MyCoursesICom = () => {
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

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        // Name validation
        if (formValues.name.length < 3 || formValues.name.length > 30) {
            newErrors.name = 'الاسم يجب ان يكون بين 3 الى 30 حرف';
            valid = false;
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
            newErrors.email = 'بريد الكتروني خاطئ';
            valid = false;
        }

        // Phone validation
       
        setErrors(newErrors);
        return valid;
    };

    const handleChange = (newValue, field) => {
        // Limiting the length of the name field to 30 characters
        if (field === 'name' && newValue.length > 30) {
            newValue = newValue.slice(0, 30);
        }
    
        setFormValues(prevState => ({
            ...prevState,
            [field]: newValue
        }));
    };
    const handleSubmit = async (e, field) => {
        e.preventDefault();

        if (validateForm()) {
            return;
        }

        const newValue = formValues[field];

        // Update the user information in the database
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_PORT}/api/users/${userID}`, {
                [field === 'phone' ? 'phoneNumber' : field]: newValue
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error updating user information:', error);
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
                <li className='w-full '>
                    <div className='flex justify-between'>
                        <span>اسم المستخدم</span>
                        <button onClick={handleToggle} className={`${!editable ? 'max-h-20 p-3' : ' max-h-0 overflow-hidden'}`}>تغيير</button>
                    </div>
                    <form onSubmit={(e) => handleSubmit(e, 'name')}>
                        <input type="text" name="name" value={formValues.name}   onChange={(newValue) => handleChange(newValue, 'name')} readOnly={!editable} className={editable ? 'open' : ''} />
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
                        <input type="email" name="email" value={formValues.email}   onChange={(newValue) => handleChange(newValue, 'email')} readOnly={!editable} className={editable ? 'open' : ''} />
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
  onChange={(newValue) => handleChange(newValue, 'phone')}
  name="phone"     value={formValues.phone}
        country={'eg'}
 readOnly={!editable} className={editable ? 'open' : ''}
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

export default MyCoursesICom;