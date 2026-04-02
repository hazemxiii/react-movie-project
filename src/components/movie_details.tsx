import { useNavigate, useParams } from "react-router";
import { getMovie, deleteMovie } from "../contexts/movies_context";
import { useEffect, useState } from "react";
import MovieModel from "../models/movie_model";

function MovieDetails() {
  const params = useParams();
  const [movie, setMovie] = useState<MovieModel | undefined>();
  const nav = useNavigate();
  useEffect(() => {
    getMovie(params.id!).then((m) => {
      if (m) {
        setMovie(m);
      } else {
        nav("/");
      }
    });
  });
  if (movie) {
    return (
      <div className="details-container">
        <div className="details-card">
          <div className="details-header">
            <h1 className="details-title">{movie.title}</h1>
            <div className="details-meta">
              <div className="meta-item">
                <span className="meta-label">Release Year:</span>
                <span>{movie.prodYear}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">ID:</span>
                <span>{movie.id}</span>
              </div>
            </div>
          </div>

          <div className="details-actions">
            <button
              className="btn btn-secondary"
              onClick={() => nav("/add-movie/" + movie.id)}
            >
              Update Movie
            </button>
            <button
              className="btn btn-delete"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this movie?")) {
                  deleteMovie(movie.id).then((v) => {
                    if (v) {
                      nav("/");
                    } else {
                      alert("Failed to delete movie");
                    }
                  });
                }
              }}
            >
              Delete Movie
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="details-container">
        <p>Loading movie details...</p>
      </div>
    );
  }
}
export default MovieDetails;
