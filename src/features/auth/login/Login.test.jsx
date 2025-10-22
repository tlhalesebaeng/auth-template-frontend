import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from './Login.jsx';

describe('Login component', () => {
    // Mock useNavigate hook. There is no need to keep other router-dom properties
    vi.mock('react-router-dom', () => ({
        useNavigate: vi.fn(),
    }));

    it('renders Auth component properly', () => {
        render(<Login />);
        const title = screen.getByRole('heading', { name: 'Login' });
        expect(title).toBeInTheDocument();

        const description = screen.getByText('Login in to access your account');
        expect(description).toBeInTheDocument();

        const backBtn = screen.queryByText('<');
        expect(backBtn).toBeNull();
    });

    it('renders an input field with label text "Email"', () => {
        render(<Login />);
        const input = screen.getByLabelText('Email');
        expect(input).toBeInTheDocument();
    });

    it('renders an input field with label text "Password"', () => {
        render(<Login />);
        const input = screen.getByLabelText('Password');
        expect(input).toBeInTheDocument();
    });

    it('renders RememberMe component properly', () => {
        render(<Login />);
        const forgotPassText = screen.getByText('Forgot Password');
        expect(forgotPassText).toBeInTheDocument();
    });

    it('renders the AuthQuestion component properly', () => {
        render(<Login />);
        const question = screen.getByText("Don't have an account?");
        expect(question).toBeInTheDocument();

        const resendElement = screen.getByText('Sign up');
        expect(resendElement).toBeInTheDocument();
    });

    it('renders a button with the text "Login" initially', () => {
        render(<Login />);
        const btn = screen.getByRole('button', { name: 'Login' });
        expect(btn).toBeInTheDocument();
    });

    it('renders the message component when the useFetch hook has an error', () => {
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

        render(<Login />);
        const error = screen.getByText('test-error');
        expect(error).toBeInTheDocument();
    });
});
