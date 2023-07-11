import { ReactNode } from "react";
import { GenerateBlurbContextProvider } from "@/context/GenerateBlurbContext/Provider";

export default function Layout({ children } : {children: ReactNode}) {
  return (
      <GenerateBlurbContextProvider>
        {children}
      </GenerateBlurbContextProvider>
  )
}