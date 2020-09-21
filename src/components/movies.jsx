import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import List from "./common/list";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _, { filter } from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }
  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  hanldeGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,
      selectedGenre,
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const count = this.state.movies.length;

    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>No movies exist in database</p>;

    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <List
              items={this.state.genres}
              selectedItems={this.state.selectedGenre}
              onItemSelect={this.hanldeGenreSelect}
            />
          </div>

          <div className="col">
            <p>Showing {totalCount} movies in the database</p>
            <br />
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onSort={this.handleSort}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
            />

            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
