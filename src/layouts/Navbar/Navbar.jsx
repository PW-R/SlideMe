import { Link } from "react-router-dom"; // Import Link
import "./Navbar.css";

function Navbar({ tab, setTab }) {
  return (
    <div className="navbar-container">
      <Link to="/home"> {/* Added Link import */}
        <button
          className={
            "btn " + (tab === "home" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("home")}
        >
          Home
        </button>
      </Link>

      <Link to="/list"> {/* Added Link import */}
        <button
          className={
            "btn " + (tab === "list" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("list")}
        >
          List
        </button>
      </Link>
    </div>
  );
}

export default Navbar;
