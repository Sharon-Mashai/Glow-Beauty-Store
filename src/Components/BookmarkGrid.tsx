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