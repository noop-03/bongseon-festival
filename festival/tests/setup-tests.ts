import '@testing-library/jest-dom';

// Mock IntersectionObserver for framer-motion in JSDOM
class MockIntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
// @ts-ignore
global.IntersectionObserver = MockIntersectionObserver as any;
