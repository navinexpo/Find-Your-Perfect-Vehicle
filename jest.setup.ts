import "@testing-library/jest-dom";

// Extend Jest's expect with jest-dom matchers for TypeScript
// This ensures toBeInTheDocument, toHaveAttribute, etc. are available in TS
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare global {
  namespace jest {
    interface Matchers<R = void, T = {}>
      extends TestingLibraryMatchers<
        ReturnType<typeof expect.stringContaining>,
        R
      > {}
  }
}
