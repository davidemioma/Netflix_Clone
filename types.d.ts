export interface MovieProps {
  id: number;
  name: string;
  title: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  first_air_date: string;
  overview: string;
  original_country: string[];
  original_language: string;
  original_name: string;
  popularity: number;
  media_type?: string;
  genre_Ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}
