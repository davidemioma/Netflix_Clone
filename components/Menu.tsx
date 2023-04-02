import React from "react";
import Link from "next/link";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { menuSelector } from "../store/ui-slice";
import { setOpenMenu } from "../store/store";

const Menu = () => {
  const dispatch = useDispatch();

  const openMenu = useSelector(menuSelector);

  return (
    <div className="md:hidden relative">
      <button
        className="flex items-center space-x-0.5"
        onClick={() => dispatch(setOpenMenu(!openMenu))}
      >
        <p className="text-sm">Browse</p>

        {openMenu ? (
          <ChevronDownIcon className="w-3 h-3" />
        ) : (
          <ChevronUpIcon className="w-3 h-3" />
        )}
      </button>

      <div
        className={`absolute mt-5 left-0 z-30 w-[200px] bg-black/95 rounded border-t-2 border-white shadow-md ${
          openMenu ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300 ease-in-out`}
      >
        <div className="flex flex-col space-y-5 p-4">
          <Link href="/" onClick={() => dispatch(setOpenMenu(false))}>
            <p className="headerLink text-[gray] hover:text-white">Home</p>
          </Link>

          <a
            className="headerLink text-[gray] hover:text-white"
            href="#tvShows"
            onClick={() => dispatch(setOpenMenu(false))}
          >
            Tv Shows
          </a>

          <a
            className="headerLink text-[gray] hover:text-white"
            href="#movies"
            onClick={() => dispatch(setOpenMenu(false))}
          >
            Movies
          </a>

          <a
            className="headerLink text-[gray] hover:text-white"
            href="#new & popular"
            onClick={() => dispatch(setOpenMenu(false))}
          >
            New & Popular
          </a>

          <a
            className="headerLink text-[gray] hover:text-white"
            href="#myList"
            onClick={() => dispatch(setOpenMenu(false))}
          >
            My List
          </a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
