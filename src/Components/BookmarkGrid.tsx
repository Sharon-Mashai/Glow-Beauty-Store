import { BookmarkCard } from "./BookmarkCard";
import type { Link } from "../types/Link";
import illustrationImage from "../assets/images/IllustrationImage.png";

interface BookmarkGridProps {
  links: Link[];
  onDelete: (id: number) => void;
  onEdit: (link: Link) => void;
  onAddClick: () => void;
  searchTerm: string;
}

export const BookmarkGrid = ({
  links,
  onDelete,
  onEdit,
  onAddClick,
  searchTerm,
}: BookmarkGridProps) => {

  if (links.length === 0) {

    const isSearchActive = searchTerm.trim().length > 0;

    // Search returned no results
    if (isSearchActive) {
      return (
        <section className="bookmarkGrid">
          <div className="emptyBookmarks">
            <h2>No bookmarks found</h2>

            <p>
              We couldn't find any bookmarks matching
              <strong> "{searchTerm}"</strong>.
              <br />
              Try another keyword or check your spelling.
            </p>
          </div>
        </section>
      );
    }

    // No bookmarks saved yet
    return (
      <section className="bookmarkGrid">
        <div className="emptyBookmarks">

          <div className="emptyIcon">
            <img
              src={illustrationImage}
              alt="Bookmark illustration"
              className="emptyIllustration"
            />
          </div>

          <h2>Your beauty shelf is empty</h2>

          <p>
            Start building your skincare collection by saving your favourite
            cleansers, serums, moisturisers, sunscreens and other beauty
            products.
          </p>

          <button
            className="emptyAddBtn"
            onClick={onAddClick}
          >
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