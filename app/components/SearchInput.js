import React, { useEffect, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios'; // Import Axios
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SearchInput = (props) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const inputRef = useRef(null);
    const searchRef = useRef(null);

    const router = useRouter();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (inputRef.current && !inputRef.current.contains(event.target)) &&
                (searchRef.current && !searchRef.current.contains(event.target))
            ) {
                setIsSearchVisible(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    useEffect(() => {
        if (isSearchVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchVisible]);
    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);

    };
    const handleInputBlur = () => {
        // Close the search input when it loses focus
        if(!searchValue){setIsSearchVisible(false);
}
    };
    const handleInputChange = async (event) => {
        const value = event.target.value;
        setSearchValue(value);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/courses`);
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



    const handleItemClick = (courseId) => {
        // Redirect to the course page using React Router or window.location.href
        // Example: window.location.href = `/courses/${courseId}`;
    };
    const handleShowResults = () => {
        setIsSearchVisible(false);
                router.push(`/search/data?q=${searchValue}`);
    };

    return (
        <>
            <button id='searchbtn' onClick={toggleSearch} className={`${isSearchVisible ? "open w-11 h-11 right-1.5" : " w-14 h-14 right-0 b"} absolute duration-300 bottom-1/2 translate-y-1/2 rounded-2xl flex justify-center items-center ${props.className}`}>
                <FaSearch className="text-2xl" />
            </button>
            <input
                            ref={inputRef}

             onBlur={handleInputBlur} 
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                className={`searchinput rounded-2xl border-none duration-500 bg-transparent ${props.sClassName} ${isSearchVisible ? "w-full h-14 pr-16" : "w-14 h-14 p-0"}`}
                placeholder={isSearchVisible ? "Search" : ""}
            />
            {isSearchVisible && searchValue && (
                <div ref={searchRef} id='searchR' className=' absolute flex flex-col gap-3 top-full backdrop-blur-xl mt-3 p-3 w-96'>
                    {searchResults.length > 0 ? (
                        <ul className=' max-h-1/2 flex flex-col gap-2 w-full'>
                            {searchResults.map(course => (
                                <li className=' ' key={course._id} onClick={() => handleItemClick(course._id)}>
                                    <Link className=' h-14 p-2 rounded-2xl flex gap-3  items-center' href={"/courses/"+course._id}>
                                        <Image height={1024} width={1024} alt="" className='w-12 h-12 rounded-2xl' src={`${process.env.NEXT_PUBLIC_PORT}/${course.photo.replace(/\\/g, '/')}`}></Image>
                                        <div className='flex flex-col justify-between  w-full'>
                                            <span className=' text-sm'>{course.title} </span>
                                            <span className=' text-xs'>{}</span>
                                        </div>
                                    </Link>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>{searchValue}</p>
                    )}

<button onClick={handleShowResults} className='searchRbtn  p-3 rounded-2xl'>عرض النتائج</button>                </div>
            )}
        </>
    );
};

export default SearchInput;