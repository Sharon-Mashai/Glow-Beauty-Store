import { BookmarkCard } from "./BookmarkCard";
import type { Link } from "../types/Link";

interface BookmarkGridProps {
  links: Link[];
  onDelete: (id: number) => void;
}

export const BookmarkGrid = ({
  links,
  onDelete,
}: BookmarkGridProps) => {
  return (
    <section className="bookmarkGrid">

      {links.map((link) => (

        <BookmarkCard
          key={link.id}
          link={link}
          onDelete={onDelete}
        />

      ))}

    </section>
  );
};