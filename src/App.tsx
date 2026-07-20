import React from "react";
import { Header } from "./Components/Header";
import { Hero } from "./Components/Hero";

const App = () => {
  return (
    <>
      <div className="app">
        <Header />
        <Hero/>
      </div>
    </>
  );
};

export default App;
