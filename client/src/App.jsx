import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import MyAddons from "./components/Pages/MyAddons/MyAddons";
import CreateAddon from "./components/Pages/CreateAddon/CreateAddon";

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MyAddons
            user={user}
            setUser={setUser}
            showLogin={showLogin}
            setShowLogin={setShowLogin}
          />
        }
      />
      <Route
        path="/myAddons"
        element={
          <MyAddons
            user={user}
            setUser={setUser}
            showLogin={showLogin}
            setShowLogin={setShowLogin}
          />
        }
      />

      <Route
        path="/createAddon"
        element={
          <CreateAddon
            user={user}
            setUser={setUser}
            showLogin={showLogin}
            setShowLogin={setShowLogin}
          />
        }
      />
    </Routes>
  );
}

export default App;