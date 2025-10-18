import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import AuthQuestion from './AuthQuestion.jsx';

describe('AuthQuestion component', () => {
    it('renders children correctly', () => {
        render(
            <AuthQuestion>
                <p>test-child</p>
            </AuthQuestion>
        );

        const paragraph = screen.getByText('test-child');
        expect(paragraph).toBeInTheDocument();
    });

    it('renders linkText prop correctly', () => {
        render(<AuthQuestion linkText="test-link-text" />);
        const link = screen.getByText('test-link-text');
        expect(link).toBeInTheDocument();
    });

    it('renders the question prop correctly', () => {
        render(<AuthQuestion question="test-question" />);
        const question = screen.getByText(/test-question/i);
        expect(question).toBeInTheDocument();
    });

    it('calls the onClick prop function', async () => {
        const func = vi.fn();
        render(<AuthQuestion linkText="test-link-text" onClick={func} />);
        const link = screen.getByText('test-link-text');
        await userEvent.click(link);
        expect(func).toHaveBeenCalled();
    });
});
