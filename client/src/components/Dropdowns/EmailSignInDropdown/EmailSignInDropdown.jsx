import { useState } from "react";
import "./EmailSignInDropdown.css";
import EmailSignUpDropdown from "../EmailSignUpDropdown/EmailSignUpDropdown";

const API_BASE_URL = "http://localhost:5000";

const EmailSignInDropdown = ({ user, setUser }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to sign in.");
      }

      setUser(data.user);
      setMessage("Signed in successfully.");
      setIdentifier("");
      setPassword("");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (user) {
    return (
      <div className="dropdown-menu">
        <h2>Welcome back</h2>
        <p className="status-message success-message">
          Signed in as {user.username || user.email}
        </p>
        <button className="submit-button" onClick={() => setUser(null)}>
          Log Out
        </button>
      </div>
    );
  }

  if (showSignUp) {
    return <EmailSignUpDropdown setUser={setUser} onBack={() => setShowSignUp(false)} />;
  }

  return (
    <form className="dropdown-menu" onSubmit={handleSubmit}>
      <button type="button" className="close-button" aria-label="Close sign in form">
        X
      </button>
      <h2>Sign In</h2>

      <label htmlFor="login-identifier">Email/Username</label>
      <input
        id="login-identifier"
        type="text"
        placeholder="Enter email or username"
        value={identifier}
        onChange={(event) => setIdentifier(event.target.value)}
        required
      />

      <label htmlFor="login-password">Password</label>
      <input
        id="login-password"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      {error && <p className="status-message error-message">{error}</p>}
      {message && <p className="status-message success-message">{message}</p>}

      <button className="submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Signing In..." : "Submit"}
      </button>

      <a href="#">Forgot your password?</a>

      <div className="signup-row">
        <p>New?</p>
        <button type="button" className="text-button" onClick={() => setShowSignUp(true)}>
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default EmailSignInDropdown;