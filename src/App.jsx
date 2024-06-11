// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterDetail from "./CharacterDetail";
import CharacterList from "./CharacterList";
import "./App.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
