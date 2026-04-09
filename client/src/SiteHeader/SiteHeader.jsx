import { Menu, MenuItem, Button } from "@mui/material";
import "./SiteHeader.css";
import "../styles.css";



const SiteHeader = () => {
  return (
    <header className="header">
      <button className="logo-button">
        <img src="/logo.png" alt="MC Addon Maker Logo" className="logo"/>
        MC Addon Maker
      </button>
      <nav className="nav-bar">
        <button className="nav-bar-button">My Addons</button>
        <button className="button nav-bar-button">Create Addon</button>
        <button className="button nav-bar-button">Help</button>
      </nav>
      <div className="signup-login-frame">
        <button className="button signup-login-button">Login</button>
        <button className="button signup-login-button">Sign Up</button>
      </div>

    </header>
  );
};
 


export default SiteHeader;