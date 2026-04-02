import { Component, type ReactNode } from "react";
import MovieModel from "../models/movie_model";
import Movie from "./movie";

type Props = {};
type State = {
  movies: MovieModel[];
  isLoading: boolean;
};

class MovieClassComp extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      movies: [],
      isLoading: true,
    };
  }
  render(): ReactNode {
    return (
      <div className="movie-container">
        {this.state.isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="movie-list">
            {this.state.movies.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    );
  }

  async componentDidMount(): Promise<void> {
    let res = await fetch("https://jsonfakery.com/movies/infinite-scroll");
    if (!res.ok) {
      this.setState({
        isLoading: false,
      });
      return;
    }
    let data = await res.json();
    let movies = [];
    for (let i = 0; i < data.data.length; i++) {
      movies.push(
        new MovieModel(
          data.data[i].id,
          data.data[i].original_title,
          data.data[i].release_date
        )
      );
    }
    this.setState({
      movies: movies,
      isLoading: false,
    });
  }
  componentWillUnmount(): void {
    console.log("You're Leaving the page");
  }
  componentDidUpdate(): void {
    console.log("Movies are loaded");
  }
  shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    if (
      this.state.movies !== nextState.movies ||
      this.state.isLoading !== nextState.isLoading
    ) {
      return true;
    }
    return false;
  }
}
export default MovieClassComp;
