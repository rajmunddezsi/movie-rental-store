export type Movie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    genre_ids: number[];
}

export type MovieDetail = Movie & {
    genres: {id: number; name: string}[];
    runtime: number | null;
    tagline: string;
}

export type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}