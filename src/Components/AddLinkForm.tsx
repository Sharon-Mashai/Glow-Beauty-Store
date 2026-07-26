import { useState, useEffect, useRef, useCallback } from "react";
import type { Link } from "../types/Link";
import "../global.css";

interface AddLinkFormProps {
  show: boolean;
  onClose: () => void;
  onAdd: (link: Link) => void;
  editingLink: Link | null;
}

interface Draft {
  editingId: number | "new";
  title: string;
  url: string;
  description: string;
  tags: string;
  savedAt: number;
}

const DRAFT_STORAGE_KEY = "glowBeauty_formDraft";

const loadDraft = (): Draft | null => {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Draft) : null;
  } catch {
    return null;
  }
};

const saveDraft = (draft: Draft) => {
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    /*  */
  }
};

const clearDraft = () => {
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    /* */
  }
};

const getDefaultValues = (editingLink: Link | null) => ({
  title: editingLink?.title ?? "",
  url: editingLink?.url ?? "",
  description: editingLink?.description ?? "",
  tags: editingLink?.tags.join(", ") ?? "",
});

const hasAnyContent = (v: {
  title: string;
  url: string;
  description: string;
  tags: string;
}) =>
  v.title.trim() !== "" ||
  v.url.trim() !== "" ||
  v.description.trim() !== "" ||
  v.tags.trim() !== "";

const DRAFT_CONTEXT_MATCHES = (
  draft: Draft,
  editingLink: Link | null,
): boolean => {
  const currentId = editingLink?.id ?? "new";
  return draft.editingId === currentId;
};

export default function AddLinkForm({
  show,
  onClose,
  onAdd,
  editingLink,
}: AddLinkFormProps) {
  const defaults = getDefaultValues(editingLink);

  const initialDecision = (() => {
    const draft = loadDraft();
    if (
      show &&
      draft &&
      DRAFT_CONTEXT_MATCHES(draft, editingLink) &&
      hasAnyContent(draft)
    ) {
      const differsFromClean =
        draft.title !== defaults.title ||
        draft.url !== defaults.url ||
        draft.description !== defaults.description ||
        draft.tags !== defaults.tags;
      if (differsFromClean) {
        return { showPrompt: true, pendingDraft: draft, values: defaults };
      }
    }
    return { showPrompt: false, pendingDraft: null, values: defaults };
  })();

  const [title, setTitle] = useState(initialDecision.values.title);
  const [url, setUrl] = useState(initialDecision.values.url);
  const [description, setDescription] = useState(initialDecision.values.description);
  const [tags, setTags] = useState(initialDecision.values.tags);

  const [showDraftPrompt, setShowDraftPrompt] = useState(
    initialDecision.showPrompt,
  );
  const [pendingDraft, setPendingDraft] = useState<Draft | null>(
    initialDecision.pendingDraft,
  );

  const overlayRef = useRef<HTMLDivElement>(null);

  const persistDraftThenClose = useCallback(() => {
    const values = { title, url, description, tags };

    if (hasAnyContent(values)) {
      const draft: Draft = {
        editingId: editingLink?.id ?? "new",
        title,
        url,
        description,
        tags,
        savedAt: Date.now(),
      };
      saveDraft(draft);
    } else {
      clearDraft();
    }

    setShowDraftPrompt(false);
    setPendingDraft(null);
    onClose();
  }, [title, url, description, tags, editingLink, onClose]);

  const handleClose = useCallback(() => {
    setShowDraftPrompt((currentShowPrompt) => {
      if (currentShowPrompt) {
        clearDraft();
      }
      return false;
    });
    setPendingDraft(null);
    persistDraftThenClose();
  }, [persistDraftThenClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

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
    clearDraft();
    setShowDraftPrompt(false);
    setPendingDraft(null);
    onClose();
  };

  const continueDraft = () => {
    if (pendingDraft) {
      setTitle(pendingDraft.title);
      setUrl(pendingDraft.url);
      setDescription(pendingDraft.description);
      setTags(pendingDraft.tags);
    }
    setShowDraftPrompt(false);
    setPendingDraft(null);
  };

  const startFresh = () => {
    const currentDefaults = getDefaultValues(editingLink);
    setTitle(currentDefaults.title);
    setUrl(currentDefaults.url);
    setDescription(currentDefaults.description);
    setTags(currentDefaults.tags);
    clearDraft();
    setShowDraftPrompt(false);
    setPendingDraft(null);
  };

  useEffect(() => {
    if (!show) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [show, handleClose]);

  return (
    <div
      ref={overlayRef}
      className={`formOverlay ${show ? "show" : ""}`}
      onClick={handleOverlayClick}
    >
      <form
        className="addLinkForm"
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        {showDraftPrompt && pendingDraft ? (
          <div className="draftPrompt">
            <h2 style={{ margin: "0 0 8px" }}>
              Pick up where you left off?
            </h2>
            <p className="draftPromptSub">
              You have an unsaved draft for this{" "}
              {pendingDraft.editingId === "new" ? "new bookmark" : "edit"} from{" "}
              {new Date(pendingDraft.savedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              .
            </p>
            <div className="draftPromptButtons">
              <button
                type="button"
                className="draftBtn continueBtn"
                onClick={continueDraft}
              >
                Continue draft
              </button>
              <button
                type="button"
                className="draftBtn freshBtn"
                onClick={startFresh}
              >
                Start fresh
              </button>
            </div>
          </div>
        ) : (
          <>
            <button type="button" className="closeBtn" onClick={handleClose}>
              ✕
            </button>

            <h2>{editingLink ? "Edit Bookmark" : "Add New Bookmark"}</h2>

            <label
              className="formFieldLabel"
              htmlFor="bookmark-title"
            >
              Product Title
            </label>
            <input
              id="bookmark-title"
              type="text"
              placeholder="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label
              className="formFieldLabel"
              htmlFor="bookmark-url"
            >
              Website URL
            </label>
            <input
              id="bookmark-url"
              type="url"
              placeholder="Website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />

            <label
              className="formFieldLabel"
              htmlFor="bookmark-description"
            >
              Description
            </label>
            <textarea
              id="bookmark-description"
              rows={4}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label
              className="formFieldLabel"
              htmlFor="bookmark-tags"
            >
              Tags
            </label>
            <input
              id="bookmark-tags"
              type="text"
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />

            <button type="submit">
              {editingLink ? "Update Bookmark" : "Save Bookmark"}
            </button>
          </>
        )}
      </form>
    </div>
  );
}
