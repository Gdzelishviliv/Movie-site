export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

export interface MovieData {
  results: Movie[];
}
