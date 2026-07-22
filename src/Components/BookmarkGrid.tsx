import { BookmarkCard } from "./BookmarkCard";
import type { Link } from "../types/Link";

interface BookmarkGridProps {
  links: Link[];
  onDelete: (id: number) => void;
  onEdit: (link: Link) => void;
}

export const BookmarkGrid = ({
  links,
  onDelete,
  onEdit,
}: BookmarkGridProps) => {

  if (links.length === 0) {
    return (
      <section className="bookmarkGrid">
        <div className="emptyBookmarks">
          <h2>No Bookmarks Found</h2>

          <p>
            Try changing your search, selecting another category,
            or add a new bookmark.
          </p>
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