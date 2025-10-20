import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Error from './Error.jsx';

describe('Error component', () => {
    it('renders a paragraph element', () => {
        render(<Error />);
        const paragraph = screen.getByRole('paragraph');
        expect(paragraph).toBeInTheDocument();
    });

    it('renders a paragraph element as a wrapper', () => {
        const { container } = render(<Error />);
        const wrapper = container.firstChild;
        expect(wrapper.tagName).toBe('P');
    });

    it('renders one paragraph element', () => {
        render(<Error />);
        const paragraphs = screen.getAllByRole('paragraph');
        expect(paragraphs).toHaveLength(1);
    });

    it('renders correct error message', () => {
        render(<Error errorMessage="test-error-message" />);
        const errorMessage = screen.getByRole('paragraph');
        expect(errorMessage).toHaveTextContent('test-error-message');
    });
});
