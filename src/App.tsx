import { useState } from "react";
import { Sidebar } from "./Components/Sidebar";
import { Topbar } from "./Components/Topbar";
import { BookmarkGrid } from "./Components/BookmarkGrid";
import { AddLinkForm } from "./Components/AddLinkForm";
import { links as initialLinks } from "./data/links";
import type { Link } from "./types/Link";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  const [links, setLinks] = useState<Link[]>(initialLinks);

  const addLink = (newLink: Link) => {
    setLinks([...links, newLink]);
  };

  return (
    <div className="app">

      <Sidebar />

      <div className="content">

        <Topbar onAddClick={() => setShowForm(true)} />

        <BookmarkGrid links={links} />

        <AddLinkForm
          show={showForm}
          onClose={() => setShowForm(false)}
          onAdd={addLink}
        />

      </div>

    </div>
  );
};

export default App;