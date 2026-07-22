import { BookmarkCard } from "./BookmarkCard";
import { links } from "../data/links";

export const BookmarkGrid = () => {
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