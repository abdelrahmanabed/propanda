import { Suspense, lazy } from "react";
const Hero = lazy(() => import('./components/hero'))
import Carousel from "./components/Slider"
import NewCourseContainer from './components/NewCourseContainer'
import Loading from "./components/loading";
import Slider from "./components/Slider";
import InstructorsAvatar from "./components/InstructorsAvatar";
import SliderLoad from './components/SliderLoad'
import ContainerLoad from './components/ContainerLoader'
export default function Home() {
  return (
    <main className="">
      <div className="">
 <Hero/>
   <Suspense fallback={<div className="p-3"><SliderLoad/></div>}> <NewCourseContainer api="popularCourses" label="الدورات الاكثر شهرة"/></Suspense>  
   <Suspense fallback={<div className="p-3"><SliderLoad/></div>}>    <NewCourseContainer api="newCourses" label="دورات مضافة حديثا"/></Suspense> 
<InstructorsAvatar/>
 </div>
    </main>
  );
}
