import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { currentMovieSelector } from "../store/ui-slice";
import requests from "../util/request";
import { Genre } from "../types";
import { closeMoviePlayer, setCurrentMovie } from "../store/store";
import ReactPlayer from "react-player/lazy";
import { XIcon, PauseIcon } from "@heroicons/react/solid";
import { FaPlay } from "react-icons/fa";
import {
  CheckIcon,
  PlusIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";

const MoviePlayer = () => {
  const dispatch = useDispatch();

  const currentMovie = useSelector(currentMovieSelector);

  const [lineClamp, setLineClamp] = useState(true);

  const [trailer, setTrailer] = useState("");

  const [genres, setGenres] = useState<Genre[]>([]);

  const [muted, setMuted] = useState(true);

  const [playing, setPlaying] = useState(false);

  const [addedToList, setAddedToList] = useState(false);

  const closePlayerHandeler = () => {
    dispatch(setCurrentMovie(null));

    dispatch(closeMoviePlayer());
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await axios.get(requests.fetchDetails(currentMovie));

      if (res.data?.videos) {
        const index = res.data.videos.results.findIndex(
          (element: any) => element.type === "Trailer"
        );

        setTrailer(res.data?.videos?.results[index]?.key);
      }

      if (res.data?.genres) {
        setGenres(res.data?.genres);
      }
    };

    fetchMovie();
  }, [currentMovie]);

  return (
    <div className="fixed top-0 left-0 h-screen overflow-x-scroll w-screen bg-black/60 z-50">
      <div className="relative mx-auto w-[95%] md:w-[80%] h-[300px] sm:h-[400px] md:h-[500px] pt-8">
        <button
          className="bg-black modalBtn absolute top-5 right-0 z-30 "
          onClick={closePlayerHandeler}
        >
          <XIcon className="h-5 w-5" />
        </button>

        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="100%"
          height="100%"
          playing={playing}
          muted={muted}
          loop
        />

        <div className="absolute bottom-10 w-full px-10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              className="bg-white flex items-center justify-center py-1 px-5 text-black rounded"
              onClick={() => setPlaying(!playing)}
            >
              {playing ? (
                <PauseIcon className="h-7 w-7 text-black mr-2" />
              ) : (
                <FaPlay className="h-7 w-7 text-black mr-2" />
              )}
              {playing ? "Pause" : "Play"}
            </button>

            <button className="modalBtn border-2 border-white">
              {addedToList ? (
                <CheckIcon className="h-5 w-5" />
              ) : (
                <PlusIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          <button
            className="modalBtn border-2 border-white"
            onClick={() => setMuted(!muted)}
          >
            {muted ? (
              <VolumeOffIcon className="h-5 w-5" />
            ) : (
              <VolumeUpIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="bg-[#181818] px-5 sm:px-10 py-8 mx-auto w-[95%] md:w-[80%] mb-10">
        <div className="flex items-center space-x-2 mb-5 text-sm">
          <p className="text-green-400">
            {currentMovie?.vote_average * 10}% Match
          </p>

          <p>{currentMovie?.release_date || currentMovie?.first_air_date}</p>

          <div className="flex items-center text-xs justify-center w-8 h-6 rounded bg-black border border-gray-500">
            HD
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-5">
          <p
            onClick={() => setLineClamp((prev) => !prev)}
            className={`text-sm leading-6 lg:w-[90%] mb-3 lg:mb-0 ${
              lineClamp ? "line-clamp-2 md:line-clamp-none" : "line-clamp-none"
            }`}
          >
            {currentMovie?.overview}
          </p>

          <div className="flex flex-col space-y-2">
            <div className="text-sm">
              <span className="text-[gray]">Title:</span>{" "}
              {currentMovie?.title || currentMovie?.original_title}
            </div>

            <div className="text-sm">
              <span className="text-[gray]">Genres:</span>{" "}
              {genres.map((genre) => genre.name).join(", ")}
            </div>

            <div className="text-sm">
              <span className="text-[gray]">Original language:</span>{" "}
              {currentMovie?.original_language}
            </div>

            <div className="text-sm">
              <span className="text-[gray]">Total votes:</span>{" "}
              {currentMovie?.vote_count}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer;
