import type { Link } from "../types/Link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Delete02Icon } from "@hugeicons/core-free-icons";

interface BookmarkCardProps {
  link: Link;
  onDelete: (id: number) => void;
}

export const BookmarkCard = ({
  link,
  onDelete,
}: BookmarkCardProps) => {
  return (
    <div className="bookmarkCard">

      <div className="cardHeader">

        <div className="cardTitle">

          <div>
            <h3>{link.title}</h3>

            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              {link.url}
            </a>
          </div>

        </div>

        <div className="cardActions">

          <button
            onClick={() => onDelete(link.id)}
          >
            <HugeiconsIcon icon={Delete02Icon} />
          </button>

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