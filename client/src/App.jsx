import { useState } from "react";
import "./styles/colors.css";
import "./styles.css";
import MyAddons from "./components/Pages/MyAddons/MyAddons";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  return <MyAddons user={user} setUser={setUser} showLogin={showLogin} setShowLogin={setShowLogin}/>;
}

export default App;