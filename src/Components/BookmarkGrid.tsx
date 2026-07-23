import { BookmarkCard } from "./BookmarkCard";
import type { Link } from "../types/Link";

interface BookmarkGridProps {
  links: Link[];
  onDelete: (id: number) => void;
  onEdit: (link: Link) => void;
  onAddClick: () => void;
}

export const BookmarkGrid = ({
  links,
  onDelete,
  onEdit,
  onAddClick,
}: BookmarkGridProps) => {

  if (links.length === 0) {
    return (
      <section className="bookmarkGrid">
        <div className="emptyBookmarks">
          <h2>No Bookmarks Found</h2>

          <p>
            Try changing your search, selecting another category,
            or add your first bookmark.
          </p>

          <button type="button" className="emptyAddBtn" onClick={onAddClick}>
            Add your first bookmark
          </button>
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