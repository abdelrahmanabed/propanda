'use client'
import Image from 'next/image';
import Link from 'next/link';
import DeletefromcartIcon from './deletefromcartIcon';

const CourseForCart = (props) => {
 
  
  return (
    <div className={props.className}>
    <Link id='coursecomdivfc' href={props.href} className={`${props.linkcn}`} >
       <div className={`${props.imagedivcn}`}><Image src={`${process.env.NEXT_PUBLIC_PORT}/${props.photo.replace(/\\/g, '/')}`} width={1024} height={1024}  className={`${props.imagecn}`}/>    </div> 
        <div id='cctfc' className={`${props.secdivcn}`}>
          <h1  className={`${props.h1cn}`}>{props.title}</h1>
          <div id='ccttfc' className={`${props.pricedivcn}`}>
            <span className={`${props.authorcn}`}>{props.authorName}</span> 
            <span id='coursecdp'className={`${props.pricecn}`}><span className=' text-xs'>EGP</span>{props.price}</span>            
            
            </div> 
      
        </div>
    </Link> 
 
           <div className={`${props.iconsdivcn}`}> 
          <div>{<DeletefromcartIcon   courseId={props.courseId} className={props.deletecn}/>}</div>
         
</div>     
  </div>
  )
}

export default CourseForCart