import React, { useEffect, useState } from "react";
import Image from "next/image";
import { imgUrl } from "../util/request";
import { MovieProps } from "../types";
import { useDispatch } from "react-redux";
import { setCurrentMovie, openMoviePlayer } from "../store/store";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/outline";

interface Props {
  movies: MovieProps[];
}

const Banner = ({ movies }: Props) => {
  const dispatch = useDispatch();

  const [movie, setMovie] = useState<MovieProps>();

  const onClickListener = () => {
    dispatch(setCurrentMovie(movie));

    dispatch(openMoviePlayer());
  };

  useEffect(() => {
    setMovie(movies[Math.floor(Math.random() * movies.length - 1)]);
  }, [movies]);

  return (
    <div className="absolute top-0">
      <div className="relative">
        <div className="absolute top-0 left-0 w-screen h-screen -z-20">
          <Image
            src={`${imgUrl}${movie?.backdrop_path || movie?.poster_path}`}
            layout="fill"
            objectFit="cover"
            alt=""
          />
        </div>

        <div className="absolute -z-10 top-0 left-0 w-screen h-screen bg-black/20" />

        <div className="absolute z-10 top-0 w-screen h-[90vh] px-5 md:px-8">
          <div className="mt-36 md:mt-52">
            <h1 className=" text-2xl font-bold md:text-4xl lg:text-6xl mb-4 md:max-w-xl lg:max-w-3xl">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>

            <p className=" md:max-w-lg lg:max-w-2xl line-clamp-3 leading-6 text-sm md:text-lg ">
              {movie?.overview}
            </p>

            <div className="flex mt-4 space-x-5">
              <button
                className="bg-white text-black bannerBtn"
                onClick={onClickListener}
              >
                <div className="bg-black rounded-full w-6 h-6 inline-flex items-center justify-center">
                  <FaPlay className="h-2 w-2 text-white" />
                </div>
                Play
              </button>

              <button
                className="bg-[gray]/70 bannerBtn"
                onClick={onClickListener}
              >
                <InformationCircleIcon className="h-6 w-6 text-white" />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
