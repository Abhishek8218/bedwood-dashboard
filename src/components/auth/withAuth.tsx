// components/withAuth.tsx
'use client'

import React, { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Define a type for the wrapped component
interface WithAuthProps {
  [key: string]: React.ReactNode; // Specify a different type for additional props
}

// Create a HOC that takes a component and returns an authenticated component
const withAuth = <P extends WithAuthProps>(WrappedComponent: ComponentType<P>) => {
  // Return a new functional component
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const sessionId = Cookies.get('access_token'); // Replace 'session_id' with your cookie name

      if (!sessionId) {
        router.push('/auth/login'); // Redirect to login page if no session
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
