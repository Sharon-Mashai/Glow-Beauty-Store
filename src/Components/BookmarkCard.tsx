import { HugeiconsIcon } from "@hugeicons/react";
import { LinkSquare02Icon, Edit02Icon, Delete02Icon,} from "@hugeicons/core-free-icons";

import type { Link } from "../types/Link";

type Props = {
  link: Link;
};

export const BookmarkCard = ({ link }: Props) => {
  return (
    <div className="bookmarkCard">

      <div className="cardHeader">

        <div className="cardTitle">

          <HugeiconsIcon icon={LinkSquare02Icon} />

          <div>
            <h3>{link.title}</h3>

            <a href={link.url} target="_blank"  rel="noreferrer"
            >
              {link.url}
            </a>

          </div>

        </div>

        <div className="cardActions">

          <button>
            <HugeiconsIcon icon={Edit02Icon} />
          </button>

          <button>
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