import { useState } from "react";
import type { Link } from "../types/Link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Edit03Icon, Delete02Icon } from "@hugeicons/core-free-icons";

interface BookmarkCardProps {
  link: Link;
  onDelete: (id: number) => void;
  onEdit: (link: Link) => void;
}

const DESCRIPTION_CHAR_LIMIT = 40;

export const BookmarkCard = ({ link, onDelete, onEdit }: BookmarkCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongDescription = link.description.length > DESCRIPTION_CHAR_LIMIT;

  const toggleExpanded = () => {
    if (isLongDescription) {
      setIsExpanded((prev) => !prev);
    }
  };

  const cardHeightClass = isLongDescription
    ? isExpanded
      ? "expandedDesc"
      : "collapsedDesc"
    : "";

  return (
    <div className={`bookmarkCard ${cardHeightClass}`}>
      <div className="cardHeader">
        <div className="cardTitle">
          <div>
            <h3>{link.title}</h3>

            <a href={link.url} target="_blank" rel="noreferrer">
              {link.url}
            </a>
          </div>
        </div>

        <div className="cardActions">
          <button onClick={() => onEdit(link)}>
            <HugeiconsIcon icon={Edit03Icon} />
          </button>

          <button onClick={() => onDelete(link.id)}>
            <HugeiconsIcon icon={Delete02Icon} />
          </button>
        </div>
      </div>

      <div
        className={`descriptionWrapper ${isLongDescription ? "clickable" : ""}`}
        onClick={toggleExpanded}
        title={
          isLongDescription
            ? isExpanded
              ? "Click to collapse"
              : "Click to read more"
            : ""
        }
      >
        <p className={`description ${isExpanded ? "expanded" : ""}`}>
          {link.description}
        </p>
      </div>

      <div className="tagContainer">
        {link.tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>
    </div>
  );
};
