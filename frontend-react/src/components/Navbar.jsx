import { Link } from "react-router-dom";
import "../styles/Website.css";

function Navbar() {
  return (
    <nav className="nav">
      <h2>Spicy Bite</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;