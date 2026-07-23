import { BookmarkCard } from "./BookmarkCard";
import type { Link } from "../types/Link";

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
          <h2>
            {isCategoryFilter && !isSearchActive
              ? "No bookmark found under this category"
              : "No Bookmarks Found"}
          </h2>

          <p>
            {isCategoryFilter && !isSearchActive
              ? `Try selecting another category.`
              : "Try changing your search, selecting another category, or add your first bookmark."}
          </p>

          {!isCategoryFilter && (
            <button type="button" className="emptyAddBtn" onClick={onAddClick}>
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