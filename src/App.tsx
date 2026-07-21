import React from "react";
import { Topbar } from "./Components/TopBar";
import { Sidebar } from "./Components/Sidebar";
import { BookmarkGrid } from "./Components/BookmarkGrid";


const App = () => {
  return (
    <>
      <div className="app">
        <Topbar/>
        <Sidebar/>
        <BookmarkGrid/>
      </div>
    </>
  );
};

export default App;
