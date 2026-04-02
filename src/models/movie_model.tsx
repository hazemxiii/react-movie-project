class MovieModel {
  id: string;
  title: string;
  prodYear: number;
  constructor(id: string, title: string, prodYear: number) {
    this.id = id;
    this.title = title;
    this.prodYear = prodYear;
  }
}

export default MovieModel;
