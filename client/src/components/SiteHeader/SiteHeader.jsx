import "./SiteHeader.css";

const SiteHeader = ({ user, setUser, onOpenLogin }) => {
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="header">
      <button className="logo-button">
        <img src="/logo.png" alt="MC Addon Maker Logo" className="logo" />
        MC Addon Maker
      </button>

      <nav className="nav-bar">
        <button className="nav-bar-button">My Addons</button>
        <button className="button nav-bar-button">Create Addon</button>
        <button className="button nav-bar-button">Help</button>
      </nav>

      <div className="signup-login-frame">
        {user ? (
          <button className="button signup-login-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="button signup-login-button" onClick={onOpenLogin}>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;