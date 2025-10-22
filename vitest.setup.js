import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Automatically unmount react trees after each test
afterEach(() => {
    cleanup();
});
