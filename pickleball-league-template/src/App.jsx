import { useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("gh_token")
  );

  return loggedIn ? (
    <Dashboard />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}

export default App;
