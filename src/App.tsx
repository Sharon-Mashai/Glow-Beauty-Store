import React from "react";
import { Sidebar } from "./Components/Sidebar";
import { Topbar } from "./Components/Topbar";
import { BookmarkGrid } from "./Components/BookmarkGrid";

const App = () => {
  return (
    <div className="app">

      <Sidebar />

      <div className="content">

        <Topbar />

        <BookmarkGrid />

      </div>

    </div>
  );
};

export default App;