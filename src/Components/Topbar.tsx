import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";

export const Topbar = () => {
  return (
    <div className="topbar">

      <h1>
        All Bookmarks
        <span>0</span>
      </h1>

      <button className="addBtn">
        <HugeiconsIcon icon={Add01Icon} />
        Add Bookmark
      </button>

    </div>
  );
};