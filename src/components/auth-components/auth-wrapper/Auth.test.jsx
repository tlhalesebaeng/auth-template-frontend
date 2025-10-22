import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Auth from './Auth.jsx';

describe('Auth wrapper component', () => {
    // Mock useNavigate hook. There is no need to keep other router-dom properties
    vi.mock('react-router-dom', () => ({
        useNavigate: vi.fn(),
    }));

    it('renders a main element as a wrapper', () => {
        const { container } = render(<Auth />);
        const wrapper = container.firstChild;
        expect(wrapper.tagName).toBe('MAIN');
    });

    it('does not render back component initially', () => {
        render(<Auth />);
        const arrow = screen.queryByText('<');
        expect(arrow).toBeNull();
    });

    it('renders back component when the backTitle prop is provided', () => {
        render(<Auth backTitle="test-back-title" />);
        const arrow = screen.getByText('<');
        expect(arrow).toBeInTheDocument();
    });

    it('renders a heading title in an h2 tag', () => {
        render(<Auth title="test-title" />);
        const title = screen.getByRole('heading', {
            name: 'test-title',
            level: 1,
        });
        expect(title).toBeInTheDocument();
    });

    it('renders a description in a p tag', () => {
        render(<Auth description="test-description" />);
        const description = screen.getByRole('paragraph');
        expect(description).toHaveTextContent('test-description');
    });

    it('renders children correctly', () => {
        render(
            <Auth>
                <h4>test-heading</h4>
            </Auth>
        );
        const heading = screen.getByRole('heading', {
            name: 'test-heading',
            level: 4,
        });
        expect(heading).toBeInTheDocument();
    });
});
