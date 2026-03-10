// Renders the matching child route of a parent route or nothing if no child route matches.


import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./navbar";

function Layout() {
  const token = localStorage.getItem("token");

  // if not logged in redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;