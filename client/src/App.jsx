import { useState } from "react";
import "./styles/colors.css";
import "./styles.css";
import MyAddons from "./components/Pages/MyAddons/MyAddons";

function App() {
  const [user, setUser] = useState(null);

  return <MyAddons user={user} setUser={setUser} />;
}

export default App;