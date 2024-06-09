'use client'
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'

const FilterC = (props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const path = usePathname()
     // Access the router object
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
        currentParams.set('sort', selectedCategory);
        router.push(`${path}?${currentParams.toString()}`);

      };
  return (

<label className='flex flex-col m-3 gap-3 justify-center'>
          <select
           name="sort"
           value={props.value || ''}
           onChange={handleCategoryChange}
          className='custom-select p-3 rounded-2xl border-2' >
            <option value="popular">الاكثر شهرة</option>
            <option value="recent">من الاحدث الى الاقدم</option>       

          </select>
        </label>  )
}
export default FilterC