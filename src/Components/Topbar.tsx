import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Search01Icon } from "@hugeicons/core-free-icons";

interface TopbarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onAddClick: () => void;
}

export const Topbar = ({
  searchTerm,
  setSearchTerm,
  onAddClick,
}: TopbarProps) => {
  return (
    <header className="topbar">

  <div className="topbarHeader">

    <h1>Saved Bookmarks</h1>

    <div className="topbarRight">

      <div className="searchBox">
        <HugeiconsIcon icon={Search01Icon} />

        <input
          type="text"
          placeholder="Search bookmarks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <button
        className="addBtn"
        onClick={onAddClick}
      >
        <HugeiconsIcon icon={Add01Icon} />
        Add Bookmark
      </button>

    </div>

  </div>

</header>
  );
};