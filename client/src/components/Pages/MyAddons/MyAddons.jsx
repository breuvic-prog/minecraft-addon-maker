import "./MyAddons.css";
import SiteHeader from "../../SiteHeader/SiteHeader";
import EmailSignInDropdown from "../../Dropdowns/EmailSignInDropdown/EmailSignInDropdown";

const MyAddons = ({ user, setUser, showLogin, setShowLogin }) => {
  return (
    <>
      <SiteHeader
        user={user}
        setUser={setUser}
        onOpenLogin={() => setShowLogin(true)}
      />

      <div>
        {user ? (
          <>
            {/* When the user is signed in */}
            <h1>My Addons</h1>
            <p>Welcome {user.username || user.email}</p>
          </>
        ) : (
          <>
            {/* When the user is NOT signed in */}
            <h1>Login to view addons</h1>

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
    </>
  );
};

export default MyAddons;