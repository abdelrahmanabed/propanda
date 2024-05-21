"use client"
import { useRouter } from 'next/navigation';

const Buttonforchange = ( props ) => {
    const router = useRouter(); // Access the router object
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        // Push new route with updated category query parameter
        router.push(`?category=${selectedCategory}`);
        
      };
  return (

<label className='flex flex-col m-3 gap-3 justify-center'>
          تصفية حسب القسم
          <select
           name="category"
           value={props.value || ''}
           onChange={handleCategoryChange}
          className='custom-select p-3 rounded-2xl border-2' >
            <option value="">Select category</option>
            <option value="languages">اللغات</option>
            <option value="programming">البرمجة والتكنولوجيا</option>
            <option value="learning">التعلم</option>
            <option value="designing">التصميم</option>
            <option value="hse"> السلامة و الصحة المهنية</option>
            <option value="marketing">التسويق</option>
            <option value="skills">المهارات المكتبية</option>

          </select>
        </label>  )
}

export default Buttonforchange