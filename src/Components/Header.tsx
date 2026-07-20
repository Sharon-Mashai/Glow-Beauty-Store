
import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {Search01Icon, UserIcon,FavouriteIcon,ShoppingCart02Icon,Menu07Icon,Cancel01Icon} from "@hugeicons/core-free-icons";

export const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleHamburger = () => setOpen((prev) => !prev);

  return (
    <header className="header">

      <div className="logo">
        {/*<img src={logo} alt="Glow Beauty Logo" />*/}
      </div>

      {/* Hamburger */}
      <button
        className="hamburger"
        onClick={toggleHamburger}
      >
        <HugeiconsIcon icon={Menu07Icon} />
      </button>

      {/* Navigation */}
      <div className={`navLinks ${open ? "show" : ""}`}>

        <button
          className="close"
          onClick={toggleHamburger}
        >
          <HugeiconsIcon icon={Cancel01Icon} />
        </button>

        <nav>

          <a href="#home" onClick={() => setOpen(false)}>
            Home
          </a>

          <a href="#shop" onClick={() => setOpen(false)}>
            Shop
          </a>

          <a href="#categories" onClick={() => setOpen(false)}>
            Categories
          </a>

          <a href="#offers" onClick={() => setOpen(false)}>
            Offers
          </a>

          <a href="#contact" onClick={() => setOpen(false)}>
            Contact
          </a>

        </nav>

        <div className="headerButtons">

          <button className="iconButton">
            <HugeiconsIcon icon={Search01Icon} />
          </button>

          <button
            className="iconButton">
            <HugeiconsIcon icon={UserIcon} />
          </button>

          <button
            className="iconButton">
            <HugeiconsIcon icon={FavouriteIcon} />
          </button>

          <button
            className="iconButton" >
            <HugeiconsIcon icon={ShoppingCart02Icon} />
          </button>

        </div>

      </div>

    </header>
  );
};