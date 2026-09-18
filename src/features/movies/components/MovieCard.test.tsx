import { render, screen } from "@testing-library/react";
import MovieCard from "./MovieCard";
import type { Movie } from "../movies.types";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useAuthStore } from "../../auth/store/authStore";
import { useFavoriteStore } from "../store/favoriteStore";
import userEvent from "@testing-library/user-event";

vi.mock("../../auth/store/authStore");
vi.mock("../store/favoriteStore");

const movie: Movie = {
  id: 0,
  title: "The Dark Knight",
  genre_ids: [10, 20],
  overview: "Good movie",
  poster_path: "/test.png",
  backdrop_path: "/test_backdrop.png",
  release_date: "2000-01-01",
  vote_average: 7.9,
};

describe("MovieCard - logged out", () => {
  beforeEach(() => {
    vi.mocked(useAuthStore).mockReturnValue({ user: null });
    vi.mocked(useFavoriteStore).mockReturnValue({
      favorites: [],
      toggleFavorite: vi.fn(),
    });
  });

  it("renders the movie title", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>,
    );

    expect(screen.getByText(movie.title)).toBeInTheDocument();
  });

  it("renders vote average value", () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>,
    );

    expect(screen.getByText("7.9")).toBeInTheDocument();
  });
});

describe("MovieCard - logged in", () => {
  const toggleFavoriteMock = vi.fn();

  beforeEach(() => {
    vi.mocked(useAuthStore).mockReturnValue({
      id: 1,
      name: "Test",
      email: "test@test.com",
      role: "user",
    });

    vi.mocked(useFavoriteStore).mockReturnValue({
      favorites: [],
      toggleFavorite: toggleFavoriteMock,
    });
  });

  it('show "Add to favorites" button', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Add to favorites")).toBeInTheDocument();
  });

  it("calls toggleFavorite when button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button"));
    expect(toggleFavoriteMock).toHaveBeenCalledTimes(1);
    expect(toggleFavoriteMock).toHaveBeenCalledWith(movie.id);
  });
});
