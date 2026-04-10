import { useState } from "react";
import "./styles/colors.css";
import "./styles.css"



import MyAddons from "./components/Pages/MyAddons/MyAddons";
import EmailSignInDropdown from "./components/Dropdowns/EmailSignInDropdown/EmailSignInDropdown";

function App() {
  const [user, setUser] = useState(null);

  return (
    <EmailSignInDropdown user={user} setUser={setUser}/>
  );
}

export default App;