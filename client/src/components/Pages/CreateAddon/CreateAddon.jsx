import "./CreateAddon.css";
import SiteHeader from "../../SiteHeader/SiteHeader";

const CreateAddon = ({ user, setUser, showLogin, setShowLogin }) => {

  return (
    <>
        <SiteHeader 
          user={user} 
          setUser={setUser} 
          showLogin={showLogin} 
          setShowLogin={setShowLogin}
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
            <h1>Login to create addon</h1>
          </>
        )}
      </div>
    </>
  );
};

export default CreateAddon;