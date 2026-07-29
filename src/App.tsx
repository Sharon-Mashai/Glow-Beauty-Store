import { useState, useEffect } from "react";
import { Topbar } from "./Components/Topbar";
import { BookmarkGrid } from "./Components/BookmarkGrid";
import AddLinkForm from "./Components/AddLinkForm";
import { DeleteModal } from "./Components/DeleteModal";
import Toast from "./Components/Toast";
import type { Link } from "./types/Link";

interface ToastState {
  message: string;
  type: "success" | "delete";
  visible: boolean;
}

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory] = useState("All");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState>({
    message: "",
    type: "success",
    visible: false,
  });
  const [links, setLinks] = useState<Link[]>(() => {
    try {
      const savedLinks = localStorage.getItem("bookmarks");
      return savedLinks ? JSON.parse(savedLinks) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    document.body.style.overflow = showForm ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showForm]);

  const showToast = (message: string, type: "success" | "delete") => {
    setToast({ message, type, visible: true });
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const saveLink = (link: Link) => {
    const isEditing = editingLink !== null;

    setLinks((currentLinks) => {
      if (editingLink) {
        return currentLinks.map((item) => (item.id === link.id ? link : item));
      }

      return [...currentLinks, link];
    });

    showToast(
      isEditing ? "Bookmark updated successfully!" : "Bookmark saved successfully!",
      "success",
    );

    setEditingLink(null);
    setShowForm(false);
  };

  const deleteLink = (id: number) => {
    setLinkToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (linkToDelete !== null) {
      setLinks(links.filter((link) => link.id !== linkToDelete));
      showToast("Bookmark deleted successfully!", "delete");
    }

    setLinkToDelete(null);
    setShowDeleteModal(false);
  };

  const editLink = (link: Link) => {
    setEditingLink(link);
    setShowForm(true);
  };

  const handleAddBookmark = () => {
    setEditingLink(null);
    setShowForm(true);
  };

  const filteredLinks = links.filter((link) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      link.title.toLowerCase().includes(search) ||
      link.url.toLowerCase().includes(search) ||
      link.description.toLowerCase().includes(search) ||
      link.tags.some((tag) => tag.toLowerCase().includes(search));

    const matchesCategory =
      selectedCategory === "All" ||
      link.tags.some(
        (tag) => tag.toLowerCase() === selectedCategory.toLowerCase(),
      );

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <div className="pageShell">
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
            searchTerm={searchTerm}
          />

          <AddLinkForm
            key={`form-${editingLink?.id ?? "new"}-${showForm ? "open" : "closed"}`}
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

          {toast.visible && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={closeToast}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
