import { useState } from "react";
import type { Link } from "../types/Link";
import "../global.css";

interface AddLinkFormProps {
  show: boolean;
  onClose: () => void;
  onAdd: (link: Link) => void;
  editingLink: Link | null;
}

export default function AddLinkForm({
  show,
  onClose,
  onAdd,
  editingLink,
}: AddLinkFormProps) {
  const [title, setTitle] = useState(editingLink?.title ?? "");
  const [url, setUrl] = useState(editingLink?.url ?? "");
  const [description, setDescription] = useState(editingLink?.description ?? "");
  const [tags, setTags] = useState(editingLink?.tags.join(", ") ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      new URL(url); 
    } catch {
      alert("Please enter a valid URL");
      return;
    }

    const newLink: Link = {
      id: editingLink?.id ?? Date.now(), 
      title,
      url,
      description,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    onAdd(newLink);

    
    setTitle("");
    setUrl("");
    setDescription("");
    setTags("");
    onClose();
  };

  return (
    <div className={`formOverlay ${show ? "show" : ""}`}>
      <form className="addLinkForm" onSubmit={handleSubmit}>
        <button type="button" className="closeBtn" onClick={onClose}>
          ✕
        </button>

        <h2>{editingLink ? "Edit Bookmark" : "Add New Bookmark"}</h2>

        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="url"
          placeholder="Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />

        <textarea
          rows={4}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button type="submit">
          {editingLink ? "Update Bookmark" : "Save Bookmark"}
        </button>
      </form>
    </div>
  );
}
