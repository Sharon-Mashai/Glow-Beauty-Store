import { useState, useEffect } from "react";
import { Sidebar } from "./Components/Sidebar";
import { Topbar } from "./Components/Topbar";
import { BookmarkGrid } from "./Components/BookmarkGrid";
import { AddLinkForm } from "./Components/AddLinkForm";

import { links as initialLinks } from "./data/links";
import type { Link } from "./types/Link";

const App = () => {
  // Drawer
  const [showForm, setShowForm] = useState(false);

  // Edit mode
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Bookmarks
  const [links, setLinks] = useState<Link[]>(() => {
    const savedLinks = localStorage.getItem("bookmarks");

    if (savedLinks) {
      return JSON.parse(savedLinks);
    }

    return initialLinks;
  });

  // Save bookmarks to localStorage
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

  // Search
  const filteredLinks = links.filter((link) => {
    const search = searchTerm.toLowerCase();

    return (
      link.title.toLowerCase().includes(search) ||
      link.url.toLowerCase().includes(search) ||
      link.description.toLowerCase().includes(search) ||
      link.tags.some((tag) =>
        tag.toLowerCase().includes(search)
      )
    );
  });

  return (
    <div className="app">
      <Sidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="content">
        <Topbar
          onAddClick={() => {
            setEditingLink(null);
            setShowForm(true);
          }}
        />

        <BookmarkGrid
          links={filteredLinks}
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