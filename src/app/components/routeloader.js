"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PageLoader from "./loader"; 

export default function RouteLoader({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800); 

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <PageLoader />
        </div>
      )}
      {children}
    </>
  );
}
