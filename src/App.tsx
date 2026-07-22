import { useState, useEffect } from "react";
import { Sidebar } from "./Components/Sidebar";
import { Topbar } from "./Components/Topbar";
import { BookmarkGrid } from "./Components/BookmarkGrid";
import { AddLinkForm } from "./Components/AddLinkForm";

import { links as initialLinks } from "./data/links";
import type { Link } from "./types/Link";

const App = () => {
  const [showForm, setShowForm] = useState(false);

  const [editingLink, setEditingLink] = useState<Link | null>(null);

  const [links, setLinks] = useState<Link[]>(() => {
    const savedLinks = localStorage.getItem("bookmarks");

    if (savedLinks) {
      return JSON.parse(savedLinks);
    }

    return initialLinks;
  });

  // Save bookmarks whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(links));
  }, [links]);

  // Create + Update
  const saveLink = (link: Link) => {
    if (editingLink) {
      setLinks(
        links.map((item) =>
          item.id === link.id ? link : item
        )
      );

      setEditingLink(null);
    } else {
      setLinks([...links, link]);
    }

    setShowForm(false);
  };

  // Delete
  const deleteLink = (id: number) => {
    setLinks(
      links.filter((link) => link.id !== id)
    );
  };

  // Edit
  const editLink = (link: Link) => {
    setEditingLink(link);
    setShowForm(true);
  };

  return (
    <div className="app">

      <Sidebar />

      <div className="content">

        <Topbar
          onAddClick={() => {
            setEditingLink(null);
            setShowForm(true);
          }}
        />

        <BookmarkGrid
          links={links}
          onDelete={deleteLink}
          onEdit={editLink}
        />

        <AddLinkForm
          show={showForm}
          onClose={() => {
            setShowForm(false);
            setEditingLink(null);
          }}
          onAdd={saveLink}
          editingLink={editingLink}
        />

      </div>

    </div>
  );
};

export default App;