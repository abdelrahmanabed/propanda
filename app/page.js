import { Suspense } from "react";
import Hero from "./components/hero";
import NewCourseContainer from './components/NewCourseContainer'
import Loading from "./components/loading";
export default function Home() {
  return (
    <main className="">
      <div className="">
      <Hero/>
      <Suspense fallback={<Loading/>}> <NewCourseContainer/></Suspense>

      </div>
    </main>
  );
}
