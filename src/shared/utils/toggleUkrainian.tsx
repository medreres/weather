import { fireEvent, screen } from "@testing-library/react";

export const toggleUkrainianDesktop = () => {
  fireEvent.click(screen.getByTestId("language-dropdown"));
  fireEvent.click(screen.getByTestId("toggle-uk"));
};

export const toggleUkrainianMobile = () => {
  fireEvent.click(screen.getByTestId("navbar-mobile-toggler"));
  fireEvent.click(screen.getByTestId("language-group-item"));
  fireEvent.click(screen.getByTestId("uk"));
};
