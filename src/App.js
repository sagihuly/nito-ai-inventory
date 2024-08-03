// src/App.js

import React, { useState, useEffect } from "react";
import NitoAIInventoryManagement from "./NitoAIInventoryManagement";
import YearlySavingsAnalysis from "./components/YearlySavingsAnalysis";
import { generateYearlyData } from "./data/generateYearlyData"; // Adjust the import path as necessary
import "./styles/App.css";
import "./styles/futuristic.css";
import CustomCursor from "./components/CustomCursor";

function App() {
  const [yearlyData, setYearlyData] = useState([]);

  useEffect(() => {
    const data = generateYearlyData();
    setYearlyData(data);
  }, []);

  return (
    <div className="futuristic-app app-container">
      {" "}
      {/* Add app-container class */} {/* Add app-container class */}
      <CustomCursor />
      <NitoAIInventoryManagement />
    </div>
  );
}

export default App;

// <YearlySavingsAnalysis yearlyData={yearlyData} />;
