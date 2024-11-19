import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchResults from "./components/pages/SearchResult";
import Home from "./components/pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
