import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

import { useGameState } from './hooks/useGameState';

// Mock hook with default values
const mockResetProgress = vi.fn();

const mockGameState = {
    puzzle: { letters: 'ABCDE'.repeat(5).split(''), centerLetter: 'A' },
    currentInput: '',
    submissions: ['ABCDE', 'FGHIJ', 'KLMNO', 'PQRST', 'UVWXY', 'ZZZZZ'],
    displayLetters: 'ABCDE'.repeat(5).split('').map((c, i) => ({ char: c, status: 'consumed', id: i })),
    gameState: { isComplete: true, score: 6, capturedCounts: {} },
    handleTileClick: vi.fn(),
    clearSelection: vi.fn(),
    submitWord: vi.fn(),
    resetProgress: mockResetProgress,

    selectedIndices: [],
    isLoading: false,
    shuffleBoard: vi.fn()
};

vi.mock('./hooks/useGameState', () => ({
    useGameState: vi.fn(() => mockGameState)
}));

describe('App UI - Standard Mode - Imperfect Completion', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset the mock implementation for useGameState before each test
        vi.mocked(useGameState).mockReturnValue({
            ...mockGameState,
            backspace: vi.fn(),
            dictionary: new Set(),

        } as any);
    });

    it('completes the game and shows PERF!', async () => {
        // Mock complete state (imperfect score but complete)
        vi.mocked(useGameState).mockReturnValue({
            ...mockGameState,
            gameState: { isComplete: true, score: 6, capturedCounts: {} },
            submissions: Array(6).fill('ABCDE'),
            backspace: vi.fn(),
            dictionary: new Set(),
        } as any);

        const { getByText } = render(<App />);
        expect(getByText('P')).toBeTruthy();
        expect(getByText('!')).toBeTruthy();
    });

    it('clicking AGAIN triggers resetProgress', () => {
        // Mock complete state
        vi.mocked(useGameState).mockReturnValue({
            ...mockGameState,
            gameState: { isComplete: true, score: 6, capturedCounts: {} },
            submissions: Array(6).fill('ABCDE'),
            backspace: vi.fn(),
            dictionary: new Set(),
        } as any);

        render(<App />);

        // Click AGAIN
        const againButton = screen.getByText('AGAIN');
        fireEvent.click(againButton);

        expect(mockResetProgress).toHaveBeenCalled();
    });
});

