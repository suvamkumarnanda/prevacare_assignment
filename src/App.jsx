import React from "react";
import FeatureShowcase from "./components/FeatureShowcase";

function App() {
  return (
    <div>
      <FeatureShowcase />
      {/* Dummy content for testing sticky scroll */}
      <div className="h-[2000px] bg-gray-100 p-10">
        Scroll down to test sticky + auto advance
      </div>
    </div>
  );
}

export default App;
