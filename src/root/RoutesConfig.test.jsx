import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import routesConfig from './RoutesConfig.jsx';

describe('RoutesConfig component', () => {
    it('renders the Home component under "/home" route', () => {
        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/home'],
        });
        render(<RouterProvider router={router} />);
        const homeElement = screen.getByRole('heading', {
            name: /home/i,
            level: 1,
        });
        expect(homeElement).toBeInTheDocument();
    });

    it('renders the Login component under "/" route', () => {
        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/'],
        });
        render(<RouterProvider router={router} />);
        const login = screen.getByRole('heading', {
            name: 'Login',
            level: 1,
        });
        expect(login).toBeInTheDocument();
    });

    it('renders the Signup component under "/users/signup" route', () => {
        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/users/signup'],
        });
        render(<RouterProvider router={router} />);
        const signup = screen.getByText('Sign up');
        expect(signup).toBeInTheDocument();
    });

    it('renders the ForgotPassword component under "/users/password/reset" route', () => {
        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/users/password/reset'],
        });
        render(<RouterProvider router={router} />);
        const signup = screen.getByText('Forgot your password?');
        expect(signup).toBeInTheDocument();
    });

    it('renders the CodeVerification component under "/users/password/reset/verify/code" route', () => {
        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/users/password/reset/verify/code'],
        });
        render(<RouterProvider router={router} />);
        const signup = screen.getByText('Verify Code');
        expect(signup).toBeInTheDocument();
    });

    it('renders the ResetPassword component under "/users/password/reset/:code/new" route', () => {
        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/users/password/reset/:code/new'],
        });
        render(<RouterProvider router={router} />);
        const signup = screen.getByText('Set a new password');
        expect(signup).toBeInTheDocument();
    });

    it('renders the RouteError component under non-existing route', () => {
        const nonExistingRoutes = [
            '/users',
            '/users/pass',
            'users/signup',
            '/home-page',
            'users/password/reset-code',
            '/users/verify/password-code',
            '/udefined/route',
        ];

        const index = Math.floor(Math.random() * 8);

        const router = createMemoryRouter(routesConfig, {
            initialEntries: [nonExistingRoutes[index]],
        });

        render(<RouterProvider router={router} />);

        const heading = screen.getByRole('heading', {
            level: 1,
            name: 'An Error Has Occurred',
        });
        expect(heading).toBeInTheDocument();

        const message = screen.getByText(
            `No route matches URL "${nonExistingRoutes[index]}"`
        );
        expect(message).toBeInTheDocument();

        const status = screen.getByText('404');
        expect(status).toBeInTheDocument();
    });
});
