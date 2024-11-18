import { Outlet } from "react-router-dom";
import { useMetadata } from "../../hooks/useMetaData";
import { useAuth } from "../../hooks/useAuth";

const Layout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <nav className="navbar">
        <a href="/">
          <img
            src="https://www.clipartmax.com/png/full/298-2988095_guin%C3%A9e-bissau-banque-populaire-du-maroc.png"
            width={50}
          ></img>
        </a>

        <ul className="navbar-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="history">History</a>
          </li>
          <button onClick={handleLogout} className="logout">
            Se Deconecter
          </button>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
