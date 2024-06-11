import { Tajawal } from "next/font/google";
import "./globals.css";

import Header from "./components/header";
import Footer from "./components/Footer";
import { VideoProvider } from "./courses/components/VideoContext"; // Update the import path as necessary
import { CartProvider } from "./components/CartContext";
import { Suspense } from "react";
import { UserProvider } from "./components/UserContext";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});
export const metadata = {
  title: "Propanda",
  description: "Propanda Online Learning Platform",
};

export default function RootLayout({ children }) {
  return (
    <html dir="rtl" lang="ar">

      <body  className={tajawal.className}>
        <UserProvider>
   <VideoProvider>
<CartProvider>
 <div id="thecontainer" className=" relative mx-auto">
   <Header/>

<div id="maincontainer" className=" relative mx-auto">
        {children}</div>   
        <Footer/></div></CartProvider></VideoProvider></UserProvider>
        <div class="background">
        <div class="background">
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
   <span></span>
</div>  
</div>
      </body>

    </html>
  );
}
