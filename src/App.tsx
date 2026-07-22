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

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [links, setLinks] = useState<Link[]>(() => {
    const savedLinks = localStorage.getItem("bookmarks");

    if (savedLinks) {
      return JSON.parse(savedLinks);
    }

    return initialLinks;
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(links));
  }, [links]);

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

  const deleteLink = (id: number) => {
    setLinks(
      links.filter((link) => link.id !== id)
    );
  };

  const editLink = (link: Link) => {
    setEditingLink(link);
    setShowForm(true);
  };

  const filteredLinks = links.filter((link) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      link.title.toLowerCase().includes(search) ||
      link.url.toLowerCase().includes(search) ||
      link.description.toLowerCase().includes(search) ||
      link.tags.some((tag) =>
        tag.toLowerCase().includes(search)
      );

    const matchesCategory =
      selectedCategory === "All" ||
      link.tags.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <Sidebar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
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