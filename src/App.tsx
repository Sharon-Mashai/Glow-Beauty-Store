import { useState, useEffect } from "react";
import { Sidebar } from "./Components/Sidebar";
import { Topbar } from "./Components/Topbar";
import { BookmarkGrid } from "./Components/BookmarkGrid";
import AddLinkForm from "./Components/AddLinkForm";
import { DeleteModal } from "./Components/DeleteModal";
import type { Link } from "./types/Link";

const App = () => {
  
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
    try {
      const savedLinks = localStorage.getItem("bookmarks");
      return savedLinks ? JSON.parse(savedLinks) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    document.body.style.overflow = showForm ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showForm]);

  // Add / Update
  const saveLink = (link: Link) => {
    setLinks((currentLinks) => {
      if (editingLink) {
        return currentLinks.map((item) => (item.id === link.id ? link : item));
      }

      return [...currentLinks, link];
    });

    setEditingLink(null);
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

  const handleAddBookmark = () => {
    setEditingLink(null);
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
      link.tags.some(
        (tag) => tag.toLowerCase() === selectedCategory.toLowerCase()
      );

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="content">
        <Topbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onAddClick={handleAddBookmark}
        />

        <BookmarkGrid
          links={filteredLinks}
          onDelete={deleteLink}
          onEdit={editLink}
          onAddClick={handleAddBookmark}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
        />

        <AddLinkForm
          key={`${showForm ? "open" : "closed"}-${editingLink?.id ?? "new"}`}
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