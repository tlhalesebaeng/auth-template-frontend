import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage.jsx';

describe('Error component', () => {
    it('renders a paragraph element', () => {
        render(<ErrorMessage />);
        const paragraph = screen.getByRole('paragraph');
        expect(paragraph).toBeInTheDocument();
    });

    it('renders a paragraph element as a wrapper', () => {
        const { container } = render(<ErrorMessage />);
        const wrapper = container.firstChild;
        expect(wrapper.tagName).toBe('P');
    });

    it('renders one paragraph element', () => {
        render(<ErrorMessage />);
        const paragraphs = screen.getAllByRole('paragraph');
        expect(paragraphs).toHaveLength(1);
    });

    it('renders correct error message', () => {
        render(<ErrorMessage errorMessage="test-error-message" />);
        const errorMessage = screen.getByRole('paragraph');
        expect(errorMessage).toHaveTextContent('test-error-message');
    });
});
