import { useState, useEffect } from "react";
import { Sidebar } from "./Components/Sidebar";
import { Topbar } from "./Components/Topbar";
import { BookmarkGrid } from "./Components/BookmarkGrid";
import { AddLinkForm } from "./Components/AddLinkForm";
import { DeleteModal } from "./Components/DeleteModal";

import { links as initialLinks } from "./data/links";
import type { Link } from "./types/Link";

const App = () => {
  // Form Drawer
  const [showForm, setShowForm] = useState(false);

  // Edit Bookmark
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  // Search
  const [searchTerm, setSearchTerm] = useState("");

  // Sidebar Category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<number | null>(null);

  // Bookmarks
  const [links, setLinks] = useState<Link[]>(() => {
    const savedLinks = localStorage.getItem("bookmarks");

    if (savedLinks) {
      return JSON.parse(savedLinks);
    }

    return initialLinks;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(links));
  }, [links]);

  // Add / Update
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

  // Open Delete Modal
  const deleteLink = (id: number) => {
    setLinkToDelete(id);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = () => {
    if (linkToDelete !== null) {
      setLinks(
        links.filter((link) => link.id !== linkToDelete)
      );
    }

    setLinkToDelete(null);
    setShowDeleteModal(false);
  };

  // Edit
  const editLink = (link: Link) => {
    setEditingLink(link);
    setShowForm(true);
  };

  // Search + Category Filter
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

        <DeleteModal
          show={showDeleteModal}
          onCancel={() => {
            setShowDeleteModal(false);
            setLinkToDelete(null);
          }}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
};

export default App;