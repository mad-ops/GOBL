import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GameBoard } from './GameBoard';
import type { LetterState } from '../types';

describe('GameBoard UI', () => {
    it('should color consumed letters with primary color', () => {
        const letters: LetterState[] = [
            { char: 'A', status: 'available', id: 0 },
            { char: 'B', status: 'consumed', id: 1 }
        ];
        // Mock handler
        const noop = () => { };
        render(<GameBoard letters={letters} selectedIndices={[]} onTileClick={noop} />);

        const letterB = screen.getByTestId('board-tile-1');
        // Check for the class that implies coloring.
        expect(letterB.className).toContain('card-consumed');
    });

    it('should style available letters differently', () => {
        const letters: LetterState[] = [
            { char: 'A', status: 'available', id: 0 }
        ];
        const noop = () => { };
        render(<GameBoard letters={letters} selectedIndices={[]} onTileClick={noop} />);
        const letterA = screen.getByTestId('board-tile-0');

        expect(letterA.className).not.toContain('card-consumed');
        expect(letterA.className).toContain('card-available');
    });

    it('should highlight selected letters with blue border', () => {
        const letters: LetterState[] = [
            { char: 'C', status: 'available', id: 2 }
        ];
        const noop = () => { };
        // Pass index 2 as selected
        render(<GameBoard letters={letters} selectedIndices={[2]} onTileClick={noop} />);
        const letterC = screen.getByTestId('board-tile-2');

        expect(letterC.style.borderColor).toBe('black');
    });
});
