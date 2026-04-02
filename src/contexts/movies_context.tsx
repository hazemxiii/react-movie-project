import { createContext, useContext, useState, type ReactNode } from "react";
import MovieModel from "../models/movie_model";
type State = {
  movies: MovieModel[];
  isLoading: boolean;
  fetchMovies: () => Promise<void>;
  addMovie: (movie: MovieModel, isUpdate?: boolean) => void;
};
const MoviesContext = createContext<State | undefined>(undefined);
export function MoviesProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function fetchMovies() {
    setIsLoading(true);
    const res = await fetch("http://localhost:3001/movies");
    // const res = await fetch("https://jsonfakery.com/movies/infinite-scroll");
    if (!res.ok) {
      setMovies([]);
      setIsLoading(false);
      return;
    }
    const data = await res.json();
    const movies: MovieModel[] = data.map(
      (m: any) => new MovieModel(m.id, m.title, m.prodYear),
    );
    setMovies(movies);
    setIsLoading(false);
  }

  async function addMovie(movie: MovieModel, isUpdate: boolean = false) {
    const res = await fetch(
      "http://localhost:3001/movies" + (isUpdate ? "/" + movie.id : ""),
      {
        method: isUpdate ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      },
    );
    if (!res.ok) {
      return;
    }
    setMovies([movie, ...movies]);
  }

  return (
    <MoviesContext.Provider
      value={{ movies, isLoading, fetchMovies, addMovie }}
    >
      {children}
    </MoviesContext.Provider>
  );
}
export function useMovies() {
  const context = useContext(MoviesContext);

  if (!context) {
    throw new Error("useMovies must be used within MoviesProvider");
  }

  return context;
}
export async function getMovie(id: String): Promise<MovieModel | undefined> {
  try {
    const res = await fetch("http://localhost:3001/movies/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return undefined;
  }
}

export async function deleteMovie(id: String): Promise<boolean> {
  const res = await fetch("http://localhost:3001/movies/" + id, {
    method: "DELETE",
  });
  return res.ok;
}
