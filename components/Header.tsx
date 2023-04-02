import React, { useEffect, useState } from "react";
import Link from "next/link";
import Menu from "./Menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        isScrolled && "bg-black"
      } fixed top-0 w-screen z-40 transition duration-500 ease-in`}
    >
      <div className="flex items-center justify-between space-x-4 py-3 px-5 md:py-5 md:px-8">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <img
              className="w-20 h-6 sm:w-24 sm:h-8 cursor-pointer"
              loading="lazy"
              src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
              alt="logo"
            />
          </Link>

          <Menu />
        </div>

        <div className="hidden md:inline-flex flex-1 items-center space-x-4">
          <Link href="/">
            <p className="headerLink">Home</p>
          </Link>

          <a className="headerLink" href="#tvShows">
            Tv Shows
          </a>

          <a className="headerLink" href="#movies">
            Movies
          </a>

          <a className="headerLink" href="#new & popular">
            New & Popular
          </a>

          <a className="headerLink" href="#myList">
            My List
          </a>
        </div>

        <Link href="/account">
          <img
            className="w-7 h-7 cursor-pointer"
            src="/assets/avatar.webp"
            alt=""
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
