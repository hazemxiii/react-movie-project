import { Link, useLocation } from "react-router";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        Lab 4
      </Link>
      <ul className="nav-links">
        <li>
          <Link
            to="/"
            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/add-movie"
            className={`nav-link ${
              location.pathname === "/add-movie" ? "active" : ""
            }`}
          >
            Add Movie
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
