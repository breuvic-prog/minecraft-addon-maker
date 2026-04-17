import "./CreateAddon.css";
import SiteHeader from "../../SiteHeader/SiteHeader";

const CreateAddon = ({
  user,
  setUser,
  showLogin,
  setShowLogin,
  showSignUp,
  setShowSignUp,
}) => {
  return (
    <>
      <SiteHeader
        user={user}
        setUser={setUser}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        showSignUp={showSignUp}
        setShowSignUp={setShowSignUp}
      />

      <div>
        {user ? (
          <>
            <h1>My Addons</h1>
            <p>Welcome {user.username || user.email}</p>
          </>
        ) : (
          <>
            <h1>Login to create addon</h1>
          </>
        )}
      </div>
    </>
  );
};

export default CreateAddon;