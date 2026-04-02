import { useNavigate } from "react-router";
import MovieModel from "../models/movie_model";

const Movie = ({ movie }: { movie: MovieModel }) => {
  const nav = useNavigate();
  return (
    <div className="movie-card" onClick={() => nav("/movie/" + movie.id)}>
      <h3>{movie.title}</h3>
      <p>
        Year: <span className="year">{movie.prodYear}</span>
      </p>
      <p>ID: {movie.id}</p>
    </div>
  );
};

export default Movie;
