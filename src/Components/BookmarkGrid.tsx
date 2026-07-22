import { BookmarkCard } from "./BookmarkCard";
import type { Link } from "../types/Link";

interface BookmarkGridProps {
  links: Link[];
}

export const BookmarkGrid = ({ links }: BookmarkGridProps) => {
  return (
    <section className="bookmarkGrid">

      {links.map((link) => (
        <BookmarkCard
          key={link.id}
          link={link}
        />
      ))}

    </section>
  );
};