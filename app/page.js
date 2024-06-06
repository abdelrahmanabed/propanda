import { Suspense } from "react";
import Hero from "./components/hero";
import Carousel from "./components/Slider"
import NewCourseContainer from './components/NewCourseContainer'
import Loading from "./components/loading";
import Slider from "./components/Slider";

export default function Home() {
  return (
    <main className="">
      <div className="">
      <Hero/>
<NewCourseContainer/>

 </div>
    </main>
  );
}
