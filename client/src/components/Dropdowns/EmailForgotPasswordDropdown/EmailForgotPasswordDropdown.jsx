import { useState } from "react";
import "../EmailLoginDropdown/EmailLoginDropdown.css";

const API_BASE_URL = "http://localhost:5000";

const EmailForgotPasswordDropdown = ({ onBack, onClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to process forgot password request.");
      }

      setMessage(
        data.message ||
          "If an account with that email exists, password reset instructions have been sent."
      );
      setEmail("");
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="dropdown-menu" onSubmit={handleSubmit}>
      <button
        type="button"
        className="close-button"
        onClick={onBack}
        aria-label="Back to sign in"
      >
        ←
      </button>

      <h2>Forgot Password</h2>

      <p>
        Enter the email tied to your account and we&apos;ll help you reset your
        password.
      </p>

      <label htmlFor="forgot-password-email">Email</label>
      <input
        id="forgot-password-email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      {error && <p className="status-message error-message">{error}</p>}
      {message && <p className="status-message success-message">{message}</p>}

      <button className="submit-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Reset Instructions"}
      </button>

      <button
        type="button"
        className="text-button"
        onClick={onClose}
        style={{ alignSelf: "center", marginTop: "0.25rem" }}
      >
        Close
      </button>
    </form>
  );
};

export default EmailForgotPasswordDropdown;