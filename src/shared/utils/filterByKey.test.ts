import type { Movie } from "../../features/movies/movies.types"
import filterByKey from "./filterByKey"

const movies: Partial<Movie>[] = [
    {id: 0, title: 'The Dark Knight', genre_ids: [10, 20]},
    {id: 1, title: 'Interstellar', genre_ids: [10, 20, 30]},
    {id: 2, title: 'Star Wars', genre_ids: [170, 185]},
    {id: 3, title: 'Spiderman', genre_ids: [5, 10, 1]},
]

describe('filterByKey', () => {
    it('returns all movies when title searchText is empty', () => {
        const result = filterByKey([''], movies, ['title']);
        expect(result).toHaveLength(4);
    })

    it('returns all movies when title and genre_ids searchTexts are empty', () => {
        const result = filterByKey(['', ''], movies, ['title', 'genre_ids']);
        expect(result).toHaveLength(4);
    })

    it('returns empty array when title is not match', () => {
        const result = filterByKey(['batman'], movies, ['title']);
        expect(result).toHaveLength(0);
    })

    it('filters by title (case insensitive)', () => {
        const result = filterByKey(['spiderman'], movies, ['title']);
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe('Spiderman');
    })

    it('filters by single genre (number)', () => {
        const result = filterByKey(['10'], movies, ['genre_ids']);
        expect(result).toHaveLength(3);
    })
})