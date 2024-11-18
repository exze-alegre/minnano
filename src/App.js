import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route for routing
import Card from "./components/common/Card"; // Example of a component

const App = () => {
  return (
    <div className="App">
      <h1>Welcome to My App</h1>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </div>
  );
};

const Home = () => {
  return <div>Welcome to the Home page!</div>;
};

export default App;
