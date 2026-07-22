import { useState } from "react";

export const AddLinkForm = () => {
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
      tags
    });

    alert("Bookmark saved!");

    setTitle("");
    setUrl("");
    setDescription("");
    setTags("");
  };

  return (
    <form
      className="addLinkForm"
      onSubmit={handleSubmit}
    >
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
        placeholder="Description"
        rows={4}
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
  );
};