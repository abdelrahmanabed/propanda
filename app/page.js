import { Suspense, lazy } from "react";
const Hero = lazy(() => import('./components/hero'))
import Carousel from "./components/Slider"
import NewCourseContainer from './components/NewCourseContainer'
import Loading from "./components/loading";
import Slider from "./components/Slider";
import InstructorsAvatar from "./components/InstructorsAvatar";

export default function Home() {
  return (
    <main className="">
      <div className="">
     <Suspense fallback={<div className="h-96"><Loading/></div>}> <Hero/></Suspense>
      <NewCourseContainer api="popularCourses" label="الدورات الاكثر شهرة"/>
      <NewCourseContainer api="newCourses" label="دورات مضافة حديثا"/>
<InstructorsAvatar/>
 </div>
    </main>
  );
}
