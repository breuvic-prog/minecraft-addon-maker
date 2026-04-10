import "./EmailSignInDropdown.css";


const EmailSignInDropdown = ({ user, setUser }) => {
  
  return (
    <div className="dropdown-menu">
        <button className="close-button">X</button>
        <h2>Sign In</h2>
        <label>Email/Username</label>
        <input type="email" placeholder="Enter email or username"required></input>
        <label>Password</label>
        <input></input>
        <button>Submit</button>
        <a href="https://google.com">Forget your password?</a>
        <p>New?</p>{/*These need to be next to each other*/}
        <a href="https://google.com">Sign Up</a>
    </div>
  );
};

export default EmailSignInDropdown;