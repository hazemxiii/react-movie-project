import { useEffect, useState } from "react";
import MovieModel from "../models/movie_model";
import { v4 as uuid } from "uuid";
import styles from "../styles/form.module.css";
import { useMovies, getMovie } from "../contexts/movies_context";
import { useNavigate, useParams } from "react-router";

function AddMovieForm() {
  const { addMovie } = useMovies();
  const [movie, setMovie] = useState<MovieModel>(new MovieModel(uuid(), "", 0));
  const params = useParams();
  const navigator = useNavigate();

  if (params.id) {
    useEffect(() => {
      getMovie(params.id!).then((m) => {
        if (m) {
          setMovie(m);
        }
      });
    }, [params.id]);
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setMovie((m) => {
      return { ...m, [name]: value };
    });
  }

  return (
    <div className={styles.form_card}>
      <h2 className={styles.form_title}>
        {params.id ? "Update" : "Add New"} Movie
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addMovie(movie, params.id ? true : false);
          if (!params.id) {
            setMovie(new MovieModel(uuid(), "", 0));
          } else {
            navigator("/");
          }
        }}
      >
        <div className={styles.form_group}>
          <label htmlFor="title">Movie Title</label>
          <input
            id="title"
            className={styles.form_input}
            value={movie?.title}
            name="title"
            placeholder="e.g. A Silent Voice"
            onChange={(e) => handleInput(e)}
            required
          ></input>
        </div>
        <div className={styles.form_group}>
          <label htmlFor="prodYear">Production Year</label>
          <input
            id="prodYear"
            className={styles.form_input}
            value={movie.prodYear == 0 ? "" : movie?.prodYear}
            name="prodYear"
            placeholder="e.g. 2016"
            onChange={(e) => handleInput(e)}
            required
          ></input>
        </div>
        <button type="submit" className={`btn btn-primary ${styles.btn_form}`}>
          {params.id ? "Update" : "Add"} Movie
        </button>
      </form>
    </div>
  );
}

export default AddMovieForm;
