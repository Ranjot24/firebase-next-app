import React from "react";
import ProtectRoute from "../components/ProtectRoute";
import Sidebar from "../components/Sidebar";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }) {
  const isProtectedRoute = !["/login"].includes(router.pathname);

  return (
    <div style={{ display: "flex" }}>
      {isProtectedRoute && <Sidebar />}
      <div style={{ flex: 1 }}>
        {isProtectedRoute ? (
          <ProtectRoute>
            <Component {...pageProps} />
          </ProtectRoute>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </div>
  );
}

export default MyApp;
