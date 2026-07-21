import { HugeiconsIcon } from "@hugeicons/react";
import {Edit02Icon,Delete02Icon,} from "@hugeicons/core-free-icons";

export const BookmarkCard = () => {
  return (
    <div className="bookmarkCard">

      <div className="cardHeader">

        <div className="cardTitle">

          
          
            <h3>CeraVe Hydrating Cleanser</h3>

            <a
              href="https://www.cerave.com"
              target="_blank"
              rel="noreferrer"
            >
              cerave.com
            </a>

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
        Official cleanser suitable for dry and sensitive skin.
      </p>

      <div className="tagContainer">

        <span>#Cleanser</span>

        <span>#DrySkin</span>

        <span>#OfficialStore</span>

      </div>

    </div>
  );
};