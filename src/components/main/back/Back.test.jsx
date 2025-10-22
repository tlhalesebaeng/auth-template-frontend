import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';

import Back from './Back.jsx';

describe('Back component', () => {
    let container;
    beforeEach(() => {
        const routes = [
            {
                path: '/',
                element: <p>Home</p>,
            },
            {
                path: '/back',
                element: <Back title="test-title" />,
            },
        ];

        const router = createMemoryRouter(routes, {
            initialEntries: ['/back'],
        });

        container = render(<RouterProvider router={router} />).container;
    });

    it('renders title correctly', () => {
        const title = screen.getByText('test-title');
        expect(title).toBeInTheDocument();
    });

    it('renders a back element in a paragraph tag', () => {
        const backElement = screen.getByRole('paragraph');
        expect(backElement).toBeInTheDocument();
    });

    it('navigates back to home screen when the wrapper element is clicked', async () => {
        const wrapper = container.firstChild;
        await userEvent.click(wrapper);

        const title = screen.queryByText('test-title');
        expect(title).toBeNull();

        const homeElement = screen.getByText('Home');
        expect(homeElement).toBeInTheDocument();
    });
});
