import { useState } from "react";
import "./CreateAddon.css";
import SiteHeader from "../../General/SiteHeader/SiteHeader";

const API_BASE_URL = "http://localhost:5000";

const CreateAddon = ({
  user,
  setUser,
  showLogin,
  setShowLogin,
  showSignUp,
  setShowSignUp,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImage("");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!user) {
      setError("You must be logged in to create an addon.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/addons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          image,
          userId: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create addon.");
      }

      setMessage("Addon created successfully.");
      setName("");
      setDescription("");
      setImage("");
      event.target.reset();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

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

      <div className="create-addon-page">
        {user ? (
          <>
            <p>Signed in as {user.username || user.email}</p>

            <form className="create-addon-form" onSubmit={handleSubmit}>
              <label htmlFor="addon-name">Addon Name</label>
              <input
                id="addon-name"
                type="text"
                placeholder="Enter addon name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />

              <label htmlFor="addon-description">Description</label>
              <textarea
                id="addon-description"
                placeholder="Enter addon description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />

              <label htmlFor="addon-image">Image</label>
              <input
                id="addon-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />

              {image && (
                <div className="image-preview-wrapper">
                  <p>Preview:</p>
                  <img className="image-preview" src={image} alt="Addon preview" />
                </div>
              )}

              {error && <p className="status-message error-message">{error}</p>}
              {message && <p className="status-message success-message">{message}</p>}

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Addon"}
              </button>
            </form>
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