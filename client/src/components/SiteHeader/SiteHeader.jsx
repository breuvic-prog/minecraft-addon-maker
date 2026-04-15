import "./SiteHeader.css";
import EmailSignInDropdown from "../Dropdowns/EmailSignInDropdown/EmailSignInDropdown";
import { useNavigate } from "react-router-dom";

const SiteHeader = ({ user, setUser, showLogin, setShowLogin }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMyAddonsClick = () => {
  navigate("/myAddons");
  };

  const handleCreateAddonClick = () => {
  navigate("/createAddon");
  };



  const handleLogout = () => {
    setUser(null);
    setShowLogin(false);
  };

  return (
    <header className="header">
      <button className="logo-button" onClick={handleLogoClick}>
        <img src="/logo.png" alt="MC Addon Maker Logo" className="logo" />
        MC Addon Maker
      </button>

      <nav className="nav-bar">
        <button className="button nav-bar-button" onClick={handleMyAddonsClick}>
          My Addons
        </button>
        <button className="button nav-bar-button" onClick={handleCreateAddonClick}>
          Create Addon
        </button>
        <button className="button nav-bar-button">Help</button>
      </nav>

      <div className="signup-login-frame">
        {user ? (
          <button className="button signup-login-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <button
              className="button signup-login-button"
              onClick={() => setShowLogin((prev) => !prev)}
            >
              Sign In
            </button>

            {showLogin && (
              <EmailSignInDropdown
                user={user}
                setUser={setUser}
                onClose={() => setShowLogin(false)}
              />
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;