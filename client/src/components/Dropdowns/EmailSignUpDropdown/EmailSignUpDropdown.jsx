import { useState } from "react";
import "./EmailSignUpDropdown.css";

const API_BASE_URL = "http://localhost:5000";

const SignUpDropdown = ({ setUser, onBack }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to create account.");
      }

      setUser(data.user);
      setMessage("Account created successfully.");
      setEmail("");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="dropdown-menu" onSubmit={handleSubmit}>
      <button type="button" className="close-button" onClick={onBack} aria-label="Back to sign in">
        ←
      </button>
      <h2>Sign Up</h2>

      <label htmlFor="signup-email">Email</label>
      <input
        id="signup-email"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <label htmlFor="signup-username">Username</label>
      <input
        id="signup-username"
        type="text"
        placeholder="Choose a username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />

      <label htmlFor="signup-password">Password</label>
      <input
        id="signup-password"
        type="password"
        placeholder="Create password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        minLength={8}
        required
      />

      <label htmlFor="signup-confirm-password">Confirm Password</label>
      <input
        id="signup-confirm-password"
        type="password"
        placeholder="Re-enter password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        minLength={8}
        required
      />

      {error && <p className="status-message error-message">{error}</p>}
      {message && <p className="status-message success-message">{message}</p>}

      <button className="submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
};

export default SignUpDropdown;