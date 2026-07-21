import React from "react";
import { Topbar } from "./Components/TopBar";
import { Sidebar } from "./Components/Sidebar";


const App = () => {
  return (
    <>
      <div className="app">
        <Topbar/>
        <Sidebar/>
      </div>
    </>
  );
};

export default App;
