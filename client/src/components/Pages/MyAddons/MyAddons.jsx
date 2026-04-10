import "./MyAddons.css";
import SiteHeader from "../../SiteHeader/SiteHeader";

const MyAddons = ({ user, setUser }) => {
  return (
    <>
      <SiteHeader user={user} setUser={setUser} />

      <div>
        {user ? (
          <>
            <h1>My Addons</h1>
            <p>Welcome {user.name || user.email}</p>
          </>
        ) : (
          <>
            <h1>Login to view addons</h1>
          </>
        )}
      </div>
    </>
  );
};

export default MyAddons;