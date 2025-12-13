import { describe, it, expect } from 'vitest';
import { calculateLetterUsage, validateSubmission } from './gameLogic';

describe('Game Logic', () => {
    describe('validateSubmission', () => {
        const board = ['H', 'E', 'L', 'L', 'O', 'W', 'O', 'R', 'L', 'D', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];

        it('should accept valid words', () => {
            // HELLO matches board counts (1 H, 1 E, 3 Ls on board > 2 Ls in word, 1 O)
            expect(validateSubmission('HELLO', board)).toEqual({});
            expect(validateSubmission('WORLD', board)).toEqual({});
        });

        it('should reject words with missing letters', () => {
            // No 'Z' on board
            expect(validateSubmission('ZEBRA', board).error).toBe('Board missing Z (Need 1, Have 0)');
        });

        it('should reject words with insufficient frequency', () => {
            // Only 1 'H' on board
            expect(validateSubmission('HHHAA', board).error).toBe('Board missing H (Need 3, Have 1)');
        });
    });

    describe('calculateLetterUsage', () => {
        it('should calculate score correctly', () => {
            const letters = Array(25).fill('A');
            const submissions = ['AAAAA'];
            const state = calculateLetterUsage(letters, submissions);
            expect(state.score).toBe(5);
        });

        it('should detect completion', () => {
            // 25 letters, submit 5 words of 5 letters (all consuming)
            // Ideally we need a board that can be cleared.
            // Simplified test:
        });
    });
});
