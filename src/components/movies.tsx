import Movie from "./movie";
import MovieModel from "../models/movie_model";
import { useMovies } from "../contexts/movies_context";
import { useEffect } from "react";
const Movies = ({
  children,
}: // isLoading,
{
  children?: React.ReactNode;
  // isLoading: boolean;
}) => {
  const state = useMovies();
  useEffect(() => {
    state.fetchMovies();
  }, []);
  return (
    <div className="movie-container">
      {children}
      <div className="movie-list">
        {state?.movies.map((movie: MovieModel) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
