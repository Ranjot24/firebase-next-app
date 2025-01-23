import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    // Navigate to /login only if not already on the /login route
    if (router.pathname !== "/") {
      router.push("/");
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.sidebar}>
        <h3 style={styles.logo}>Dashboard</h3>
        <ul style={styles.menu}>
          <li onClick={() => router.push("/students")} style={styles.menuItem}>Students Page</li>
          <li onClick={handleLogout} style={styles.menuItem}>Logout</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    height: "100vh", // ensures full height for the page
  },
  sidebar: {
    width: "200px",
    backgroundColor: "grey",
    color: "black",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    fontSize: "20px",
    marginBottom: "20px",
    fontWeight: "bold",
  },
  menu: {
    listStyle: "none",
    padding: "0",
    margin: "0",
  },
  menuItem: {
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "white",
    borderRadius: "5px",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.3s",
  },
  menuItemHover: {
    backgroundColor: "black",
  },
};
