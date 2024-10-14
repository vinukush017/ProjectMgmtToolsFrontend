import {
  faChartBar,
  faCog,
  faFolder,
  faHome,
  faLock,
  faSignOut,
  faTasks,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Logo from "../images/viyaan-high-resolution-logo-transparent.png";
import "../styles/Header.css";

const Header = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <img
          src={Logo}
          style={{
            height: "60px",
            width: "60px",
            paddingTop: "5px",
            paddingLeft: "50px",
          }}
        ></img>
      </div>
      {token && (
        <>
          <div className="nav-menu">
            <div className="icon-menu">
              <Link to="/">
                <FontAwesomeIcon icon={faHome} size="2x" />
              </Link>
              <Link to="/messages">
                <FontAwesomeIcon icon={faFolder} size="2x" />
              </Link>
              <Link to="/task">
                <FontAwesomeIcon icon={faTasks} size="2x" />
              </Link>
              <Link to="/charts">
                <FontAwesomeIcon icon={faChartBar} size="2x" />
              </Link>
              <Link to="/settings">
                <FontAwesomeIcon icon={faCog} size="2x" />
              </Link>
            </div>
          </div>
          <div>
            <nav className="nav">
              <div className="dropdown-container" ref={dropdownRef}>
                <button className="profile-button" onClick={toggleDropdown}>
                  <FontAwesomeIcon icon={faUser} />
                </button>
                {isDropdownOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item">
                      <FontAwesomeIcon icon={faUser} />
                      Profile
                    </div>
                    <div className="dropdown-item">
                      <FontAwesomeIcon icon={faTasks} />
                      Tags
                    </div>
                    <div className="dropdown-item">
                      <FontAwesomeIcon icon={faLock} />
                      Privacy
                    </div>
                    <div className="dropdown-item">
                      <FontAwesomeIcon icon={faCog} />
                      Settings
                    </div>
                    <div className="dropdown-item" onClick={handleLogout}>
                      <FontAwesomeIcon icon={faSignOut} />
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
