import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import CodeVerification from './CodeVerification.jsx';

describe('CodeVerification component', () => {
    // Mock useNavigate and useLocation hooks
    vi.mock('react-router-dom', () => ({
        useNavigate: vi.fn(),
        useLocation: vi.fn(() => ({ state: '' })),
    }));

    it('renders Auth wrapper component properly', () => {
        render(<CodeVerification />);
        const title = screen.getByText('Verify Code');
        expect(title).toBeInTheDocument();

        const description = screen.getByText(
            'Enter the one time code sent to your email.'
        );
        expect(description).toBeInTheDocument();

        const backTitle = screen.getByText('Back to login');
        expect(backTitle).toBeInTheDocument();
    });

    it('renders one input field', () => {
        render(<CodeVerification />);
        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
    });

    it('renders the AuthQuestion component properly', () => {
        render(<CodeVerification />);
        const question = screen.getByText("Didn't receive the code?");
        expect(question).toBeInTheDocument();

        const resendElement = screen.getByText('Resend');
        expect(resendElement).toBeInTheDocument();
    });

    it('renders a button with the text "Submit" initially', () => {
        render(<CodeVerification />);
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

        render(<CodeVerification />);
        const error = screen.getByText('test-error');
        expect(error).toBeInTheDocument();
    });
});
