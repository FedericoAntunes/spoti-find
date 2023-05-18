import { Routes, Route } from "react-router-dom";

// Components
import Home from "./components/Home";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
