import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

export const Sidebar = () => {
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
          placeholder="Search products..."
        />
      </div>

      <div className="tags">
        <h3>CATEGORIES</h3>

        <ul>
          <li>All Products</li>
          <li>#Cleanser</li>
          <li>#Serum</li>
          <li>#Moisturizer</li>
          <li>#Sunscreen</li>
          <li>#Toner</li>
          <li>#Acne Care</li>
          <li>#Vitamin C</li>
          <li>#Sensitive Skin</li>
        </ul>

      </div>

    </aside>
  );
};