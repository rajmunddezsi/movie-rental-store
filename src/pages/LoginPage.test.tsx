import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import LoginPage from "./LoginPage";
import userEvent from "@testing-library/user-event";

describe("LoginPage", () => {
  it("shows login form", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByPlaceholderText("example@example.com"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("login button disabeld if form is invalid", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("button", { name: "Login" })).toBeDisabled();
  });

  it("login button enabled if form is valid", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.type(
      screen.getByPlaceholderText("example@example.com"),
      "test@test.com",
    );
    await user.type(screen.getByPlaceholderText("Password"), "123456");

    expect(screen.getByRole("button", { name: "Login" })).not.toBeDisabled();
  });

  it("shows error message if email or password field is invalid", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByPlaceholderText("example@example.com"), "test");
    await user.type(screen.getByPlaceholderText("Password"), "123");

    expect(screen.getByText("Email is invalid")).toBeInTheDocument();
    expect(screen.getByText("Password is invalid")).toBeInTheDocument();
  });
});
