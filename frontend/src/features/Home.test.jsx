import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home.jsx';

describe('Home component', () => {
    it('renders only one h1 element', () => {
        render(<Home />);
        const headingElements = screen.getAllByRole('heading');
        expect(headingElements).toHaveLength(1);
    });

    it('renders an h1 element as a wrapper', () => {
        const { container } = render(<Home />);
        const wrapper = container.firstChild;
        expect(wrapper.tagName).toBe('H1');
    });

    it('renders "Home" in an h1 tag', () => {
        render(<Home />);
        const homeElement = screen.getByRole('heading', {
            name: /home/i,
            level: 1,
        });

        expect(homeElement).toBeInTheDocument();
    });
});
