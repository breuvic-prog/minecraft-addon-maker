import { useEffect, useState } from "react";
import "./MyAddons.css";
import SiteHeader from "../../General/SiteHeader/SiteHeader";
import SearchArea from "../../General/SearchArea/SearchArea";

const API_BASE_URL = "http://localhost:5000";

const MyAddons = ({
  user,
  setUser,
  showLogin,
  setShowLogin,
  showSignUp,
  setShowSignUp,
}) => {
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAddons = async () => {
    if (!user) {
      setAddons([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/addons/user/${user.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to fetch addons.");
      }

      setAddons(data.addons);
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddons();
  }, [user]);

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


      <div className="my-addons-page">
        {user ? (
          
          <>
          <SearchArea/>
            {loading && <p>Loading addons...</p>}
            {error && <p className="status-message error-message">{error}</p>}

            {!loading && !error && (
              <div className="addons-grid">
                {addons.map((addon) => (
                  <div key={addon.id} className="addon-card">
                    {addon.image && (
                      <img
                        className="addon-card-image"
                        src={addon.image}
                        alt={addon.name}
                      />
                    )}

                    <h3>{addon.name}</h3>
                    <p>{addon.description || "No description provided."}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <h1>Login to view addons</h1>
        )}
      </div>
    </>
  );
};

export default MyAddons;