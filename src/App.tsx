import React from "react";
import { Sidebar } from "./Components/Sidebar";
import { Topbar } from "./Components/Topbar";
import { BookmarkGrid } from "./Components/BookmarkGrid";
import { AddLinkForm } from "./Components/AddLinkForm";

const App = () => {
  return (
    <div className="app">

      <Sidebar />

      <div className="content">

        <Topbar />
        
        <AddLinkForm/>

        <BookmarkGrid />

      </div>

    </div>
  );
};

export default App;