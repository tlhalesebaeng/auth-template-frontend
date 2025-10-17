import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home.jsx';

describe('Home component', () => {
    it('renders "Home" in an h1 tag', async () => {
        render(<Home />);
        const homeElement = await screen.queryByRole('heading', {
            name: /home/i,
            level: 1,
        });

        expect(homeElement).not.toBeNull();
    });
});
