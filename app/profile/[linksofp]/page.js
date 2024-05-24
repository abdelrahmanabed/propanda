import { Suspense } from "react";
import Pslider from "../components/profileSlider";


const Page = () => {


  // Check if the current pathname is a valid path


  return (<Suspense fallback={<div>loading</div>}>
  <Pslider/></Suspense>
  )
}

export default Page;