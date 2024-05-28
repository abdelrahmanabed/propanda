
import { Suspense } from "react";
import CompOut from "./components/CompOut";
import Loading from "../components/loading";

export default function RootLayout({ children }) {

  return (
    
  <CompOut><Suspense
  
  fallback={<div className=" h-96 flex justify-center items-center my-11"><Loading/></div>}
  >{children}</Suspense></CompOut>
  );
}