import AddMovieForm from "./components/add_movie_form";
import Movies from "./components/movies";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout";
import NotFoundPage from "./components/not_found_page";
import { MoviesProvider } from "./contexts/movies_context";
import MovieDetails from "./components/movie_details";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <NotFoundPage />,
      element: (
        <MoviesProvider>
          <Layout />
        </MoviesProvider>
      ),
      children: [
        {
          path: "",
          element: <Movies />,
        },
        {
          path: "add-movie",
          element: <AddMovieForm />,
        },
        {
          path: "add-movie/:id",
          element: <AddMovieForm />,
        },
        {
          path: "movie/:id",
          element: <MovieDetails />,
        },
      ],
    },
  ]);

  return (
    <>
      {/* <AddMovieForm
        handleSubmit={(e, movie) => {
          e.preventDefault();
          setState({
            movies: [movie, ...state.movies],
            isLoading: false,
          });
        }}
      />
      <Movies moviesList={state.movies} /> */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
