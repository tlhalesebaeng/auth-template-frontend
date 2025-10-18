import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResetPassword from './ResetPassword.jsx';

describe('ResetPassword component', () => {
    // Mock useNavigate hook. There is no need to keep other router-dom properties
    vi.mock('react-router-dom', () => ({
        useNavigate: vi.fn(),
        useParams: vi.fn(() => ({ code: '' })),
    }));

    it('renders Auth component properly', () => {
        render(<ResetPassword />);
        const title = screen.getByText('Set a new password');
        expect(title).toBeInTheDocument();

        const description = screen.getByText(
            'Please set a new password for your account'
        );
        expect(description).toBeInTheDocument();

        const backBtn = screen.queryByText('<');
        expect(backBtn).toBeNull();
    });

    it('renders a button with the text "Set password" initially', () => {
        render(<ResetPassword />);
        const btn = screen.getByRole('button', { name: 'Set password' });
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

        render(<ResetPassword />);
        const error = screen.getByText('test-error');
        expect(error).toBeInTheDocument();
    });
});
