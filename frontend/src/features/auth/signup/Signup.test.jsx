import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Signup from './Signup.jsx';

describe('Signup component', () => {
    // Mock useNavigate hook. There is no need to keep other router-dom properties
    vi.mock('react-router-dom', () => ({
        useNavigate: vi.fn(),
    }));

    it('renders Auth component properly', () => {
        render(<Signup />);
        const title = screen.getByText('Sign up');
        expect(title).toBeInTheDocument();

        const description = screen.getByText(
            'Set up a new account for your profile'
        );
        expect(description).toBeInTheDocument();

        const backBtn = screen.queryByText('<');
        expect(backBtn).toBeNull();
    });

    it('renders the AuthQuestion component properly', () => {
        render(<Signup />);
        const question = screen.getByText('Already have an account?');
        expect(question).toBeInTheDocument();

        const resendElement = screen.getByText('Login');
        expect(resendElement).toBeInTheDocument();
    });

    it('renders a button with the text "Create account" initially', () => {
        render(<Signup />);
        const btn = screen.getByRole('button', { name: 'Create account' });
        expect(btn).toBeInTheDocument();
    });

    it('renders the error message component when the useFetch hook has an error', () => {
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

        render(<Signup />);
        const error = screen.getByText('test-error');
        expect(error).toBeInTheDocument();
    });
});
