import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import RememberMe from './RememberMe.jsx';

describe('RememberMe component', () => {
    it('renders a "Forgot Password" element', () => {
        render(<RememberMe />);
        const link = screen.getByText('Forgot Password');
        expect(link).toBeInTheDocument();
    });

    it('calls the "onForgotPassword" function', async () => {
        const func = vi.fn();
        render(<RememberMe onForgotPassword={func} />);
        const link = screen.getByText('Forgot Password');
        await userEvent.click(link);
        expect(func).toHaveBeenCalled();
    });
});
