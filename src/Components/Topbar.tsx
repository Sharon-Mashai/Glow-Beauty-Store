import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";

interface TopbarProps {
  onAddClick: () => void;
}

export const Topbar = ({ onAddClick }: TopbarProps) => {
  return (
    <div className="topbar">
      <h1>Saved Bookmarks</h1>

      <button
        className="addBtn"
        onClick={onAddClick}
      >
        <HugeiconsIcon icon={Add01Icon} />
        Add Bookmark
      </button>
    </div>
  );
};