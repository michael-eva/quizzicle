import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Start from "./components/Start";
import Gameplay from "./components/Gameplay";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/gameplay" element={<Gameplay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
