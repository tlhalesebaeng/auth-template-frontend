import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ForgotPassword from './ForgotPassword.jsx';

describe('ForgotPassword component', () => {
    // Mock useNavigate hook. There is no need to keep other router-dom properties
    vi.mock('react-router-dom', () => ({
        useNavigate: vi.fn(),
    }));

    it('renders Auth component properly', () => {
        render(<ForgotPassword />);
        const title = screen.getByText('Forgot your password?');
        expect(title).toBeInTheDocument();

        const description = screen.getByText(
            "Don't worry, enter your email below to reset your password."
        );
        expect(description).toBeInTheDocument();

        const backTitle = screen.getByText('Back to login');
        expect(backTitle).toBeInTheDocument();
    });

    it('renders one input field', () => {
        render(<ForgotPassword />);
        const form = screen.getByRole('textbox');
        expect(form).toBeInTheDocument();
    });

    it('renders a button with the text "Submit" initially', () => {
        render(<ForgotPassword />);
        const btn = screen.getByRole('button', { name: 'Submit' });
        expect(btn).toBeInTheDocument();
    });

    it('renders an error message component when the useFetch hook has an error', () => {
        // Mock the useFetch hook so that it can return an error
        vi.mock('../../../hooks/useFetch.js', async () => {
            const originalHook = await vi.importActual(
                '../../../hooks/useFetch.js'
            );
            return {
                useFetch: () => ({
                    ...originalHook,
                    error: 'test-error',
                }),
            };
        });

        render(<ForgotPassword />);
        const error = screen.getByText('test-error');
        expect(error).toBeInTheDocument();
    });
});
