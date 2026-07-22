import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

interface SidebarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;

  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const Sidebar = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
}: SidebarProps) => {

  const categories = [
    "All",
    "Cleanser",
    "Serum",
    "Moisturizer",
    "Sunscreen",
    "Toner",
  ];

  return (
    <aside className="sidebar">

      <div className="logo">
        <h2>GlowVault</h2>
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
          {categories.map((category) => (
            <li
              key={category}
              className={
                selectedCategory === category
                  ? "activeTag"
                  : ""
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

      </div>

    </aside>
  );
};