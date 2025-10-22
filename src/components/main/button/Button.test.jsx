import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Button from './Button.jsx';

describe('Button component', () => {
    it('renders a button element', () => {
        render(<Button />);
        const btnElement = screen.getByRole('button');
        expect(btnElement).toBeInTheDocument();
    });

    it('renders one button element', () => {
        render(<Button />);
        const btnElements = screen.getAllByRole('button');
        expect(btnElements).toHaveLength(1);
    });

    it('renders a button element as a wrapper', () => {
        const { container } = render(<Button />);
        const wrapper = container.firstChild;
        expect(wrapper.tagName).toBe('BUTTON');
    });

    it('renders children elements correctly', () => {
        render(
            <Button>
                <p>test-child-element</p>
            </Button>
        );
        const paragraph = screen.getByRole('paragraph');
        expect(paragraph).toHaveTextContent('test-child-element');

        const paragraphs = screen.getAllByRole('paragraph');
        expect(paragraphs).toHaveLength(1);
    });

    it('disables the button accordingly', async () => {
        const onClick = vi.fn();
        render(
            <Button disabledButton={true} onClick={onClick}>
                test-btn
            </Button>
        );
        const btnElement = screen.getByText('test-btn');
        await userEvent.click(btnElement);
        expect(onClick).not.toHaveBeenCalled();
    });

    it('enables the button accordingly', async () => {
        const onClick = vi.fn();
        render(
            <Button disabledButton={false} onClick={onClick}>
                test-btn
            </Button>
        );
        const btnElement = screen.getByText('test-btn');
        await userEvent.click(btnElement);
        expect(onClick).toHaveBeenCalled();
    });
});
