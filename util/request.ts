import { MovieProps } from "../types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KET;

const BASE_URL = "https://api.themoviedb.org/3";

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  fetchDetails: (currentMovie: MovieProps) =>
    `${BASE_URL}/${currentMovie?.media_type === "tv" ? "tv" : "movie"}/${
      currentMovie?.id
    }?api_key=${
      process.env.NEXT_PUBLIC_TMDB_API_KET
    }&language=en-US&append_to_response=videos`,
};

export const imgUrl = "https://image.tmdb.org/t/p/original/";

export default requests;
