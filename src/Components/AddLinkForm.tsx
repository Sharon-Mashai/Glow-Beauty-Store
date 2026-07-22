import { useState, useEffect } from "react";
import type { Link } from "../types/Link";

interface AddLinkFormProps {
  show: boolean;
  onClose: () => void;
  onAdd: (link: Link) => void;
  editingLink: Link | null;
}

export const AddLinkForm = ({
  show,
  onClose,
  onAdd,
  editingLink,
}: AddLinkFormProps) => {

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    if (editingLink) {
      setFormData({
        title: editingLink.title,
        url: editingLink.url,
        description: editingLink.description,
        tags: editingLink.tags.join(", "),
      });
    } else {
      setFormData({
        title: "",
        url: "",
        description: "",
        tags: "",
      });
    }
  }, [editingLink]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newLink: Link = {
      id: editingLink ? editingLink.id : Date.now(),
      title: formData.title,
      url: formData.url,
      description: formData.description,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    onAdd(newLink);

    setFormData({
      title: "",
      url: "",
      description: "",
      tags: "",
    });

    onClose();
  };

  return (
    <div className={`formOverlay ${show ? "show" : ""}`}>
      <form className="addLinkForm" onSubmit={handleSubmit}>

        <button
          type="button"
          className="closeBtn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>
          {editingLink ? "Edit Bookmark" : "Add New Bookmark"}
        </h2>

        <input type="text"
          placeholder="Product Title"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
          required
        />

        <input type="url"
          placeholder="Website URL"
          value={formData.url}
          onChange={(e) =>
            setFormData({
              ...formData,
              url: e.target.value,
            })
          }
          required
        />

        <textarea rows={4}
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          required
        />

        <input type="text"  placeholder="Tags (comma separated)"value={formData.tags} onChange={(e) =>
            setFormData({
              ...formData,
              tags: e.target.value,
            })
          }
        />

        <button type="submit">
          {editingLink ? "Update Bookmark" : "Save Bookmark"}
        </button>

      </form>
    </div>
  );
};