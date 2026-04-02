import { useNavigate } from "react-router";
import MovieModel from "../models/movie_model";

const Movie = ({ movie }: { movie: MovieModel }) => {
  const nav = useNavigate();
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p>
        Year: <span className="year">{movie.prodYear}</span>
      </p>
      <p>ID: {movie.id}</p>
      <button
        className="btn-primary btn"
        onClick={() => nav("/movie/" + movie.id)}
      >
        Show details
      </button>
    </div>
  );
};

export default Movie;
