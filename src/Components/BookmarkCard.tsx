import type { Link } from "../types/Link";

interface BookmarkCardProps {
  link: Link;
}

export const BookmarkCard = ({
  link,}: BookmarkCardProps) => {
  return (
    <div className="bookmarkCard">

      <div className="cardHeader">

        <div className="cardTitle">

          <div>

            <h3>{link.title}</h3>

            <a href={link.url} target="_blank" rel="noreferrer" >
              {link.url}
            </a>

          </div>

        </div>

      </div>

      <p className="description">
        {link.description}
      </p>

      <div className="tagContainer">

        {link.tags.map((tag) => (
          <span key={tag}>
            #{tag}
          </span>
        ))}

      </div>

    </div>
  );
};