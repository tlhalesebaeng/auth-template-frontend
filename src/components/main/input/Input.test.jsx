import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Input from './Input.jsx';

describe('Input component', () => {
    it('does not render an image element on the default input field type', () => {
        render(<Input />);
        const imgElement = screen.queryByRole('img');
        expect(imgElement).toBeNull();
    });

    it('does not render an image element when input field type is invalid', () => {
        render(<Input type="test-type" />);
        const imgElement = screen.queryByRole('img');
        expect(imgElement).toBeNull();
    });

    it('renders an image element when the input field type is "password"', () => {
        render(<Input type="password" />);
        const imgElement = screen.getByRole('img');
        console.log(imgElement);
        expect(imgElement).toBeInTheDocument();
    });
});
