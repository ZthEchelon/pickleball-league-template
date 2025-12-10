import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateSeason from "./components/CreateSeason";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateSeason />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
