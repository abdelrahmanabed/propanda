import { Suspense } from "react";
import Hero from "./components/hero";
import NewCourseContainer from "./components/NewCourseContainer";

export default function Home() {
  return (
    <main className="">
      <div className="">
      <Hero/>
      <Suspense fallback={<div>loading</div>}>
        <NewCourseContainer/>
      </Suspense>
      </div>
    </main>
  );
}
