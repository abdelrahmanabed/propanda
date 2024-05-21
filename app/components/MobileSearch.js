import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios'; // Import Axios
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MobileSearch = (props) => {
    const [searchValue, setSearchValue] = useState('');
    const [seeIt, setSeeIt] = useState( true);
    const searchRef = useRef(null); // Ref for the search container

    const [searchResults, setSearchResults] = useState([]);
    const inputRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (inputRef.current && !inputRef.current.contains(event.target)) &&
                (searchRef.current && !searchRef.current.contains(event.target))
            ) {
                setSeeIt(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    const handleInputChange = async (event) => {
        const value = event.target.value;
        setSearchValue(value);
        try {
            const response = await axios.get(`${process.env.PORT}/api/courses`);
            const courses = response.data;
            const filteredCourses = courses.filter(course => {
                return course.title.toLowerCase().includes(value.toLowerCase());
            });
            setSearchResults(filteredCourses);
        } catch (error) {
            console.error('Error searching courses:', error);
            // Handle error (e.g., display a message)
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/courses/${searchValue}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching courses:', error);
            // Handle error (e.g., display a message)
        }
    };

    const handleItemClick = (courseId) => {
        // Redirect to the course page using React Router or window.location.href
        // Example: window.location.href = `/courses/${courseId}`;
    };
    const handleShowResults = () => {

                router.push(`/search?search=${searchValue}`);
    };

    return (
        <div className=' relative w-full'>
            <button  id='searchbtn'  className={`open absolute duration-300 top-1/2 -translate-y-1/2 right-1.5 rounded-2xl w-11 h-11 flex justify-center items-center ${props.className}`}>
                <FaSearch className="text-2xl" />
            </button>
            <input
                            ref={inputRef}
                onFocus={()=>setSeeIt(true)}
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                className={` searchinput rounded-2xl border-none duration-500 bg-gray-200 text-gray-700 ${props.sClassName} w-full h-14 pr-16`}
                placeholder="Search"
            />
            { searchValue && seeIt&& (
                <div ref={searchRef}  id='searchMR' className=' absolute  flex flex-col gap-3 top-full backdrop-blur-xl mt-3 p-3 w-full'>
                    {searchResults.length > 0 ? (
                        <ul className=' max-h-1/2 flex flex-col gap-2 w-full'>
                            {searchResults.map(course => (
                                <li className=' ' key={course._id} onClick={() => handleItemClick(course._id)}>
                                    <Link className=' h-14 p-2 rounded-2xl flex gap-3  items-center' href={"/courses/"+course._id}>
                                        <Image height={1024} width={1024} alt="" className='w-12 h-12 rounded-2xl' src={`${process.env.PORT}/${course.photo.replace(/\\/g, '/')}`}/>
                                        <div className='flex flex-col justify-between  w-full'>
                                            <span className=' text-sm'>{course.title} </span>
                                            <span className=' text-xs'>{course.author.name}</span>
                                        </div>
                                    </Link>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{searchValue}</p>
                    )}

<button onClick={handleShowResults} className='bg-black text-white p-3 rounded-2xl'>عرض النتائج</button>         
       </div>
            )}
        </div>
    );
};

export default MobileSearch;