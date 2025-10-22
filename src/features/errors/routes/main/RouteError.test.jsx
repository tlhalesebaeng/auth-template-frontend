import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RouteError from './RouteError.jsx';

describe('RouteError component', () => {
    vi.mock('react-router-dom', () => ({
        useRouteError: () => ({
            error: { message: 'test-error-message' },
            status: 'test-error-status',
        }),
    }));

    it('renders a main element as a wrapper', () => {
        const { container } = render(<RouteError />);
        const wrapper = container.firstChild;
        expect(wrapper.tagName).toBe('MAIN');
    });

    it('renders "An Error Has Occurred" in a h1 tag', () => {
        render(<RouteError />);
        const heading = screen.getByRole('heading', {
            level: 1,
            name: 'An Error Has Occurred',
        });
        expect(heading).toBeInTheDocument();
    });

    it('renders two paragraph tags', () => {
        render(<RouteError />);
        const paragraphs = screen.getAllByRole('paragraph');
        expect(paragraphs).toHaveLength(2);
    });

    it('renders correct error message', () => {
        render(<RouteError />);
        const paragraph = screen.getByText('test-error-message');
        expect(paragraph).toBeInTheDocument();
    });

    it('renders correct error status code', () => {
        render(<RouteError />);
        const paragraph = screen.getByText('test-error-status');
        expect(paragraph).toBeInTheDocument();
    });
});
