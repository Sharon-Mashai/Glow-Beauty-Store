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

interface FormErrors {
  title?: string;
  url?: string;
  description?: string;
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

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const [showDraftPrompt, setShowDraftPrompt] = useState(
    initialDecision.showPrompt,
  );
  const [pendingDraft, setPendingDraft] = useState<Draft | null>(
    initialDecision.pendingDraft,
  );

  const overlayRef = useRef<HTMLDivElement>(null);

  const validateField = (field: string, value: string): string | undefined => {
    switch (field) {
      case "title":
        if (value.trim() === "") return "Product Title is required";
        return undefined;
      case "url":
        if (value.trim() === "") return "Website URL is required";
        try {
          new URL(value);
        } catch {
          return "Please enter a valid URL";
        }
        return undefined;
      case "description":
        if (value.trim() === "") return "Description is required";
        return undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): FormErrors => {
    return {
      title: validateField("title", title),
      url: validateField("url", url),
      description: validateField("description", description),
    };
  };

  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (
    field: string,
    value: string,
    setter: (v: string) => void,
  ) => {
    setter(value);
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

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

    const formErrors = validateForm();
    setErrors(formErrors);
    setTouched({ title: true, url: true, description: true, tags: true });

    const hasErrors =
      formErrors.title !== undefined ||
      formErrors.url !== undefined ||
      formErrors.description !== undefined;

    if (hasErrors) {
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
    setErrors({});
    setTouched({});
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
        noValidate
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
              onChange={(e) => handleChange("title", e.target.value, setTitle)}
              onBlur={(e) => handleBlur("title", e.target.value)}
              className={errors.title && touched.title ? "inputError" : ""}
              required
            />
            {errors.title && touched.title && (
              <p className="fieldError">{errors.title}</p>
            )}

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
              onChange={(e) => handleChange("url", e.target.value, setUrl)}
              onBlur={(e) => handleBlur("url", e.target.value)}
              className={errors.url && touched.url ? "inputError" : ""}
              required
            />
            {errors.url && touched.url && (
              <p className="fieldError">{errors.url}</p>
            )}

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
              onChange={(e) => handleChange("description", e.target.value, setDescription)}
              onBlur={(e) => handleBlur("description", e.target.value)}
              className={errors.description && touched.description ? "inputError" : ""}
              required
            />
            {errors.description && touched.description && (
              <p className="fieldError">{errors.description}</p>
            )}

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
