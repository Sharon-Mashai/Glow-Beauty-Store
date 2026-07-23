interface SidebarProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const Sidebar = ({
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
        <h2>GlowBeauty</h2>
        <p>FACIAL PRODUCT BOOKMARKS</p>
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