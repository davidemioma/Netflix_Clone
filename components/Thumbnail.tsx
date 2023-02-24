import React from "react";
import Image from "next/image";
import { MovieProps } from "../types";
import { useDispatch } from "react-redux";
import { setCurrentMovie, openMoviePlayer } from "../store/store";

interface Props {
  movie: MovieProps;
}

const Thumbnail = ({ movie }: Props) => {
  const dispatch = useDispatch();

  const onClickListener = () => {
    dispatch(setCurrentMovie(movie));

    dispatch(openMoviePlayer());
  };

  return (
    <div
      className="relative h-28 min-w-[180px] md:h-36 md:min-w-[260px] cursor-pointer overflow-hidden"
      onClick={onClickListener}
    >
      <Image
        className="hover:scale-110 transition transform duration-500 ease-out"
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default Thumbnail;
