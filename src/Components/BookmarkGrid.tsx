import { BookmarkCard } from "./BookmarkCard";
import type { Link } from "../types/Link";
import illustrationImage from "../assets/images/IllustrationImage.png";

interface BookmarkGridProps {
  links: Link[];
  onDelete: (id: number) => void;
  onEdit: (link: Link) => void;
  onAddClick: () => void;
  selectedCategory: string;
  searchTerm: string;
}

export const BookmarkGrid = ({
  links,
  onDelete,
  onEdit,
  onAddClick,
  selectedCategory,
  searchTerm,
}: BookmarkGridProps) => {
  if (links.length === 0) {
    const isCategoryFilter = selectedCategory !== "All";
    const isSearchActive = searchTerm.trim().length > 0;

    return (
      <section className="bookmarkGrid">
        <div className="emptyBookmarks">

          <div className="emptyIcon">
            <img src={illustrationImage} alt="Bookmark illustration" className="emptyIllustration" />
          </div>

          <h2>
            {isCategoryFilter && !isSearchActive
              ? "No bookmarks in this category"
              : "Your beauty shelf is empty"}
          </h2>

          <p>
            {isCategoryFilter && !isSearchActive
              ? "Try selecting another category to discover your saved products."
              : "Start building your skincare collection by saving your favourite cleansers, serums, moisturisers, sunscreens and other beauty products."}
          </p>

          {!isCategoryFilter && (
            <button
              className="emptyAddBtn"
              onClick={onAddClick}
            >
              Add your first bookmark
            </button>
          )}

        </div>
      </section>
    );
  }

  return (
    <section className="bookmarkGrid">
      {links.map((link) => (
        <BookmarkCard
          key={link.id}
          link={link}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
};