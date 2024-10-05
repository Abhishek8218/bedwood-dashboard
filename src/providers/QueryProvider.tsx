'use client';


import React from 'react'
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

  const QueryProvider = ({children}: {children:  React.ReactNode}) => {
    const queryClient = new QueryClient()
  return (
    <div>


        <QueryClientProvider client={queryClient}>
         {children}
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    
        
        </div>
  )
}

export default QueryProvider