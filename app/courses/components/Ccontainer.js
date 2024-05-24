'use client'
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import {  FaAngleDown, FaTimes,    } from 'react-icons/fa';
import Keenslider from '../../components/Keenslider';

const Ccontainer = () => {
    const [course, setCourse] = useState({});
    const [parts, setParts] = useState([]);
      const [videos, setVideos] = useState([]);
      const [author, setAuthor] = useState();
      const [currentVideo, setCurrentVideo] = useState(null);
      const [currentPart, setCurrentPart] = useState({});
    
      const [viewcontent, setViewContent] = useState(false)
      const [expandedSectionIndex, setExpandedSectionIndex] = useState(-1);
    
      const  {_id} = useParams()

    const [authorName, setAuthorName] = useState("")
    const [authorImage, setAuthorImage] = useState(null)
    const [courseImage, setcourseImage] = useState(null)
    const handleButtonClick = (videoId) => {
        const selectedVideo = videos.find((video) => video._id === videoId);
        if (selectedVideo) {
          setCurrentVideo({...selectedVideo, videoPath: selectedVideo.videoPath});
        }
      };
    const formatDuration = (duration) => {
        const minutes = duration % 60;
        let durationString = `${minutes} دقيقة`;
        if (minutes > 2 && minutes < 11) {
          durationString = `${minutes} دقائق`;
        }
        return durationString;
      };
   
        const handleClosePs =() => {
          setViewContent(false)
        }
        const handleViewPs =() => {
          setViewContent(true)
        }
    const handleViewContent = async (index) => {
        try {
          const videosArray = parts[index].videos;
          setVideos(videosArray);
          setExpandedSectionIndex((prevIndex) => (prevIndex === index ? -1 : index));
        } catch (error) {
          console.error('Error fetching videos for the selected part:', error);
        }
      };
      useEffect(() => {
        const fetchData = async () => {
          try {
            if (_id) {
              const courseResponse = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/courses/${_id}`);
              const courseData = courseResponse.data;
              setCourse(courseData);
              const partsArray = courseData.parts;
              const videosArray = partsArray[0].videos;
              const authorId = courseData.author;
              setParts(partsArray);
              setVideos(videosArray);
              setcourseImage(courseData.photo)
              if (authorId) {
                const authorResponse = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/instructors/${authorId}`);
                const authorData = authorResponse.data;
                setAuthorName(authorData.name);
                setAuthorImage(authorData.photo);
              }
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, [_id, author]);
  return (<> <div id='ccontainer' className='   flex-col flex gap-3 m-3 p-3'>
  <span className='m-3'>محتويات الدورة التعليمية</span>
  {course.parts && course.parts.map((part, index) => (

    <div key={index} id='pcontainer' className='flex flex-col gap-1'>

      <div onClick={() => handleViewContent(index)} id='pt' className=' p-3 flex items-center gap-3 rounded-2xl justify-between'><div className='flex items-center gap-3'><span className="pnumber h-8 w-8 min-w-8 flex justify-center items-center rounded-full">{index+1}</span>  <h1>{part.title}</h1></div>  <FaAngleDown className='faangledown'/></div>
      <ul className={`' ' ${expandedSectionIndex === index ? 'open p-3' : 'max-h-0   overflow-hidden'}   duration-500 flex flex-col lg:grid  lg:grid-cols-2 xl:grid-cols-3 gap-2 rounded-3xl `} id='pul'>
      { part.videos.map((video, videoIndex) => (

      <li key={video._id} id='pli' className=' w-full '>
        <button   onClick={(e) =>{ handleButtonClick(video._id)
        setCurrentPart(part)}
        }  className={` ${expandedSectionIndex === index ? "max-h-96 p-3":"max-h-0   overflow-hidden"} flex flex-col gap-3 duration-500 rounded-2xl w-full ' `}id='pbtn'>
         
        <div className='flex items-start w-full  gap-3'>
          <span className="pnumber h-8 w-8 min-w-8 flex justify-center items-center rounded-full">
            {videoIndex +1}</span>
         <span>{ video.title}</span>
        
         </div>
         <span className=' self-end text-xs'>{formatDuration(video.duration)}</span> </button>
      </li>
  ))}

      
      </ul>

    </div>
  ))}

    </div>  
     {currentVideo && (
    <div id='coursevideosdivbg' className=' fixed backdrop-blur-lg top-0 left-0 w-full h-screen'>
   
     <div id='coursevideosdiv' className='fixed  backdrop-blur-lg duration-500 top-0 left-0 w-full h-screen   flex flex-col text-white p-3  gap-3'>
       <div id='mddiv' className=' w-full h-full  md:flex-row flex-1  flex flex-col text-white md:p-0 p-3  gap-3'>
     <button id='closecoursevideosdiv' className="absolute top-3 right-auto left-3 lg:right-3 lg:left-auto z-50  text-black" onClick={() => setCurrentVideo(null)}><FaTimes className='text-xl '/></button>
   
   
     
        <div id='cvdiv' className=' w-full  lg:mt-12 '> 
          <h1 id='coursevideosdivh1' className=' text-base  lg:absolute top-3 left-1/2 lg:-translate-x-1/2   font-normal '>{currentPart.title}</h1>
   
         <h2 className=' text-xl lg:hidden font-black'>{currentVideo.title}</h2>
         <video className='w-full rounded-2xl'
         src={`${process.env.NEXT_PUBLIC_PORT}/${currentVideo.videoPath.replace(/\\/g, '/')}`}
          controls/>
                <h2 className=' text-xl hidden md:block font-black'>{currentVideo.title}</h2>
                 <p className=' text-sm hidden md:block '>{currentVideo.description? currentVideo.description : "لا يوجد وصف للفيديو"}</p>
                 <p className={`${currentVideo.assignments > 0?" notice":""} text-sm hidden lg:block '`}>{currentVideo.assignments > 0 ? "يوجد مرفقات بعد هذا الفيديو" : "لا يوجد مرفقات بعد الفيديو"}</p>
   
       </div>         
   
       <div id='ovdiv' className=' md:mt-12 p-3 md:min-w-72 lg:min-w-96 md:max-w-72 lg:max-w-96 relative  overflow-y-auto flex-1 md:flex-auto flex flex-col gap-3 '>
    <span >جميع videos هذا الجزء </span>
       {videos.map((video, index) => (
     <button id='ovideobutton'
       key={video._id} 
       onClick={()=>setCurrentVideo(video)} 
       className={`bg-stone-700 relative p-3 rounded-2xl flex lg:flex-col justify-between ${currentVideo && currentVideo._id === video._id ? 'current' : ''}`}
     >
       <div className=' items-center flex gap-3'>
         <span className=' bg-black flex justify-center items-center text-white rounded-full min-w-8 h-8'>{index+1}</span>
         
         <p>{video.title}</p></div>
       
   
       <p className=' lg:self-end self-center '>{formatDuration(video.duration)}</p>
     </button>
   ))}
           
   
       </div>
       <div className={` ${viewcontent? "open max-h-72 w-full ":"w-full h-fit  overflow-hidden  "} relative  md:hidden p-2  w-full flex-col gap-2 flex pinvideodiv justify-center `}>
       <div className=' w-full flex flex-col  gap-3'> 
        <FaTimes onClick={handleClosePs} className={`${viewcontent?"":"hidden"}  w-8 h-8 fatimes absolute left-2 -top-9  '`}/>
   <span className={`text-white thebtn cursor-pointer rounded-full ${viewcontent?"w-fit hidden ":"p-5 "}`} onClick={ handleViewPs} >قائمة الاجزاء</span>
   {viewcontent && 
    
           <Keenslider className=' '>
          {course.parts.map((part, partIndex)=>(
          <button key={partIndex}
          onClick={()=>{
           const video = part.videos[0]
         setCurrentVideo(video)
         setVideos(part.videos)
         setCurrentPart(part)
         }} 
         style={{ maxWidth: "18rem"  }}
         className={`keen-slider__slide   ${currentPart._id === part._id && "current"} gap-2 pinvideo p-3 flex  items-center min-w-fit max-w-72 overflow-hidden  text-wrap  `}>
           <span className=' flex h-8 min-w-8 bg-zinc-500 justify-center items-center text-sm rounded-full '>{partIndex+1}</span>
           <span className='text-sm   max-w-72 '>{part.title}</span>
   
          </button>))}
         </Keenslider>}
          </div>
          </div>
          </div>
          <div className={` open max-h-72 hidden p-3  flex-col gap-5 md:flex  justify-center pinvideodiv      bottom-9 right-3 `}>
     <div className=' flex flex-col gap-3'> 
   <span className={`text-white thebtn rounded-full w-fit `}  >قائمة الاجزاء</span>
    <Keenslider>
           
          {course.parts.map((part, partIndex)=>(
          <button key={partIndex}
          onClick={()=>{
           const video = part.videos[0]
         setCurrentVideo(video)
         setVideos(part.videos)
         setCurrentPart(part)
         }} 
         style={{ maxWidth: "18rem"  }}
         className={`keen-slider__slide   ${currentPart._id === part._id && "current"} gap-2 pinvideo p-3 flex  items-center min-w-fit max-w-72 overflow-hidden  text-wrap  `}>
           <span className=' flex h-8 min-w-8 bg-zinc-500 justify-center items-center text-sm rounded-full '>{partIndex+1}</span>
           <span className='text-sm   max-w-72 '>{part.title}</span>
   
          </button>))}
         </Keenslider>
          </div>
          </div>
          </div>
    </div>
   )}</>
        )
}

export default Ccontainer