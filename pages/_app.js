import "../styles/globals.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/";

  return (
    <div style={{ display: "flex" }}>
      {!isLoginPage} {/* Show Sidebar if not on the login page */}
      <main style={{ flex: 1, padding: "20px" }}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
