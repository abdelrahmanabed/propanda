import Image from 'next/image'
import Link from 'next/link'

const Page = () => {
  return (
    <div  className='sm:p-3 p-3 flex flex-col  gap-5 sm:px-8'> 
         <span className=' m-5 mb-0 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl'>تصنيفات الدورات التدريبية</span>
         
    <div id='categoriesdiv' className='p-3 flex flex-col gap-4 '>
    <div className=' grid p-3 sm:hidden mob-grid  grid-cols-3 gap-1  '>
<Link className=' rounded-2xl overflow-hidden' href={"/category/languages"}><Image src="/imgs/lang.png" height={500} width={1000} className='w-full h-full'/></Link>

<Link className=' rounded-2xl overflow-hidden' href={"/category/learning"}><Image src="/imgs/learn.png" height={500} width={1000} className='w-full h-full'/></Link>
        <Link className=' rounded-2xl overflow-hidden' href={"/category/skills"}><Image src="/imgs/skills.png" height={500} width={1000} className='w-full h-full'/></Link>
        <Link className=' rounded-2xl overflow-hidden' href={"/category/programming"}><Image src="/imgs/coding.png" height={500} width={1000} className='w-full h-full'/></Link>
        <Link className=' rounded-2xl overflow-hidden' href={"/category/designing"}><Image src="/imgs/design.png" height={500} width={1000} className='w-full h-full'/></Link>
        <Link className=' rounded-2xl overflow-hidden' href={"/"}><Image src="/imgs/coding.png" height={500} width={1000} className='w-full h-full'/></Link>

<Link className=' rounded-2xl overflow-hidden' href={"/"}><Image src="/imgs/learn.png" height={500} width={1000} className='w-full h-full'/></Link>
<Link className=' rounded-2xl overflow-hidden' href={"/category/healthandsafety"}><Image src="/imgs/hse.png" height={500} width={1000} className='w-full h-full'/></Link>
<Link className=' rounded-2xl overflow-hidden' href={"/category/marketing"}><Image src="/imgs/market.png" height={500} width={1000} className='w-full h-full'/></Link>
  
</div>
      <div className=' gap-2 grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1'>


      <div class=' hidden sm:grid grid-rows-2  gap-2'>
    <div class='grid'>
        <Link className=' rounded-2xl overflow-hidden' href={"/category/languages"}><Image src="/imgs/lang.png" height={500} width={1000} className='w-full h-full'/></Link>
    </div>
    <div class='grid grid-rows-1 grid-cols-2 gap-2'>
        <Link className=' rounded-2xl overflow-hidden' href={"/category/learning"}><Image src="/imgs/learn.png" height={500} width={1000} className='w-full h-full'/></Link>
        <Link className=' rounded-2xl overflow-hidden' href={"/category/skills"}><Image src="/imgs/skills.png" height={500} width={1000} className='w-full h-full'/></Link>
    </div>
</div>

<div class=' hidden sm:grid  '>
   
        <Link className=' rounded-2xl overflow-hidden' href={"/category/programming"}><Image src="/imgs/coding.png" height={500} width={1000} className='w-full h-full'/></Link>
    
  
</div>

<div class=' hidden sm:grid'>
   
        <Link className=' rounded-2xl overflow-hidden' href={"/category/designing"}><Image src="/imgs/design.png" height={500} width={1000} className='w-full h-full'/></Link>
    
  
</div>

<div class=' hidden sm:grid grid-rows-2 grid-cols-2  gap-2'>
    <Link className=' rounded-2xl overflow-hidden' href={"/"}><Image src="/imgs/coding.png" height={500} width={1000} className='w-full h-full'/></Link>

        <Link className=' rounded-2xl overflow-hidden' href={"/"}><Image src="/imgs/learn.png" height={500} width={1000} className='w-full h-full'/></Link>
        <Link className=' rounded-2xl overflow-hidden' href={"/category/healthandsafety"}><Image src="/imgs/hse.png" height={500} width={1000} className='w-full h-full'/></Link>
        <Link className=' rounded-2xl overflow-hidden' href={"/category/marketing"}><Image src="/imgs/market.png" height={500} width={1000} className='w-full h-full'/></Link>
</div>





</div>


    </div></div>
  )
}

export default Page