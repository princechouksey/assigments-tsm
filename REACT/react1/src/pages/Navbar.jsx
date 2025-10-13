import { Link } from "react-router-dom";


// A simple navigation component
function Navbar() {
  return (
    <nav className="flex items-center justify-center ">
      <ul className="flex items-center justify-center gap-10 h-10 ">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;