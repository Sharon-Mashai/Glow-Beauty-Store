import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

interface SidebarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const Sidebar = ({
  searchTerm,
  setSearchTerm,
}: SidebarProps) => {
  return (
    <aside className="sidebar">

      <div className="logo">
        <h2>Glow Beauty</h2>
        <p>FACIAL PRODUCT BOOKMARKS</p>
      </div>

      <div className="searchBox">
        <HugeiconsIcon icon={Search01Icon} />

        <input
          type="text"
          placeholder="Search bookmarks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="tags">
        <h3>CATEGORIES</h3>

        <ul>
          <li>All</li>
          <li>Cleansers</li>
          <li>Serums</li>
          <li>Moisturizers</li>
          <li>Sunscreens</li>
          <li>Toners</li>
        </ul>
      </div>

    </aside>
  );
};