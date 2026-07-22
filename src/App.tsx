import { useState } from "react";
import { Sidebar } from "./Components/Sidebar";
import { Topbar } from "./Components/Topbar";
import { BookmarkGrid } from "./Components/BookmarkGrid";
import { AddLinkForm } from "./Components/AddLinkForm";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="app">
      <Sidebar />

      <div className="content">
        <Topbar onAddClick={() => setShowForm(true)} />

        <BookmarkGrid />

        <AddLinkForm
          show={showForm}
          onClose={() => setShowForm(false)}
        />
      </div>
    </div>
  );
};

export default App;