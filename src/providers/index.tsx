import { Suspense } from "react";
import QueryProvider from "./QueryProvider";
import RecoilContextProvider from "./RecoilProvider";
import { Toaster } from "react-hot-toast";



export const Providers = ({children}: {children:  React.ReactNode})=> {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <QueryProvider>
      <RecoilContextProvider>
        <Toaster />
        {children}
      </RecoilContextProvider>
    </QueryProvider>
    </Suspense>
  );
}


