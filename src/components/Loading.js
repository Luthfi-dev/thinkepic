// components/Loading.js

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);

    // Cleanup the event listeners
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  }, [router.events]);

  return (
    <div>
      {isLoading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <div className="content">{children}</div>
      )}
    </div>
  );
};

export default Layout;
