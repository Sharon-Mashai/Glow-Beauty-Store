import { useState } from "react";

interface AddLinkFormProps {
  show: boolean;
  onClose: () => void;
}

export const AddLinkForm = ({
  show,
  onClose,
}: AddLinkFormProps) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      title,
      url,
      description,
      tags,
    });

    alert("Bookmark Saved!");

    setTitle("");
    setUrl("");
    setDescription("");
    setTags("");

    onClose();
  };

  return (
    <div className={`formOverlay ${show ? "show" : ""}`}>
      <form
        className="addLinkForm"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="closeBtn"
          onClick={onClose}
        >
          ✕
        </button>

        <h2>Add New Bookmark</h2>

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
          Save Bookmark
        </button>
      </form>
    </div>
  );
};