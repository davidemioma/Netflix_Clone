import React, { useRef, useState } from "react";
import { MovieProps } from "../types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: MovieProps[];
}

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-5">
      <h1 className=" text-white mb-2 text-xl cursor-pointer font-bold">
        {title}
      </h1>

      <div className="relative group">
        <div
          className={`rowContols left-0 ${
            !isMoved ? "hidden" : "inline-flex"
          } `}
          onClick={() => handleClick("left")}
        >
          <ChevronLeftIcon className="w-9 h-9" />
        </div>

        <div
          ref={rowRef}
          className="flex items-center pb-5 space-x-0.5 md:space-x-2.5 overflow-x-scroll scrollbar-hide"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <div
          className="inline-flex rowContols right-0"
          onClick={() => handleClick("right")}
        >
          <ChevronRightIcon className="w-9 h-9" />
        </div>
      </div>
    </div>
  );
};

export default Row;
