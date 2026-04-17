import "./SiteHeader.css";
import EmailLoginDropdown from "../Dropdowns/EmailLoginDropdown/EmailLoginDropdown";
import EmailSignUpDropdown from "../Dropdowns/EmailSignUpDropdown/EmailSignUpDropdown";
import { useNavigate } from "react-router-dom";

const SiteHeader = ({
  user,
  setUser,
  showLogin,
  setShowLogin,
  showSignUp,
  setShowSignUp,
}) => {
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
    setShowSignUp(false);
  };

  const handleOpenLogin = () => {
    setShowSignUp(false);
    setShowLogin((prev) => !prev);
  };

  const handleOpenSignUp = () => {
    setShowLogin(false);
    setShowSignUp((prev) => !prev);
  };

  const handleCloseAllAuth = () => {
    setShowLogin(false);
    setShowSignUp(false);
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
          <button className="button sign-up-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <button
              className="button login-button"
              onClick={handleOpenLogin}
            >
              Login
            </button>

            <button
              className="button sign-up-button"
              onClick={handleOpenSignUp}
            >
              Sign Up
            </button>

            {(showLogin || showSignUp) && (
              <div className="modal-backdrop" onClick={handleCloseAllAuth}>
                <div
                  className="modal-positioner"
                  onClick={(event) => event.stopPropagation()}
                >
                  {showLogin && (
                    <EmailLoginDropdown
                      user={user}
                      setUser={setUser}
                      onClose={handleCloseAllAuth}
                      onOpenSignUp={() => {
                        setShowLogin(false);
                        setShowSignUp(true);
                      }}
                    />
                  )}

                  {showSignUp && (
                    <EmailSignUpDropdown
                      setUser={setUser}
                      onClose={handleCloseAllAuth}
                      onOpenSignIn={() => {
                        setShowSignUp(false);
                        setShowLogin(true);
                      }}
                    />
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;