import { useEffect, useState } from "react";
import "./MyAddons.css";
import SiteHeader from "../../SiteHeader/SiteHeader";

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
        `${API_BASE_URL}/addons/user/${user.id}?includeDeleted=true`
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

  const handleDelete = async (addonId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addons/${addonId}/delete`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to delete addon.");
      }

      fetchAddons();
    } catch (actionError) {
      setError(actionError.message);
    }
  };

  const handleRestore = async (addonId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/addons/${addonId}/restore`, {
        method: "PATCH",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to restore addon.");
      }

      fetchAddons();
    } catch (actionError) {
      setError(actionError.message);
    }
  };

  const activeAddons = addons.filter((addon) => !addon.deleted);
  const deletedAddons = addons.filter((addon) => addon.deleted);

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
            <h1>My Addons</h1>
            <p>Welcome {user.username || user.email}</p>

            {loading && <p>Loading addons...</p>}
            {error && <p className="status-message error-message">{error}</p>}

            {!loading && !error && (
              <>
                <section>
                  <h2>Active Addons</h2>

                  {activeAddons.length === 0 ? (
                    <p>No active addons yet.</p>
                  ) : (
                    <div className="addons-grid">
                      {activeAddons.map((addon) => (
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

                          <button onClick={() => handleDelete(addon.id)}>
                            Delete
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                <section>
                  <h2>Deleted Addons</h2>

                  {deletedAddons.length === 0 ? (
                    <p>No deleted addons.</p>
                  ) : (
                    <div className="addons-grid">
                      {deletedAddons.map((addon) => (
                        <div key={addon.id} className="addon-card deleted-addon-card">
                          {addon.image && (
                            <img
                              className="addon-card-image"
                              src={addon.image}
                              alt={addon.name}
                            />
                          )}

                          <h3>{addon.name}</h3>
                          <p>{addon.description || "No description provided."}</p>

                          <button onClick={() => handleRestore(addon.id)}>
                            Restore
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </>
            )}
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