import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./navbar";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="movie-container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
export default Layout;
