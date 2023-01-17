import { vi } from "vitest";
import { SMALL_SCREEN } from "../../../../../shared/data/const";

export default Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

export const mockMobile = () => {
    global.innerWidth = SMALL_SCREEN;
};

export const mockDestkop = () => {
    global.innerWidth = SMALL_SCREEN + 300;
};
