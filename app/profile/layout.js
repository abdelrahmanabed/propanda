
import { Suspense } from "react";
import CompOut from "./components/CompOut";

export default function RootLayout({ children }) {

  return (
    <Suspense fallback={<div>load</div>}>
  <CompOut>{children}</CompOut></Suspense>
  );
}