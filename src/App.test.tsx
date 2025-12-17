import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import App from './App';
import * as gameLogic from './lib/gameLogic';

// Mock Dictionary
vi.mock('./lib/dictionary', () => ({
    loadDictionary: async () => ({
        allWords: new Set(['ABCDE', 'FGHIJ', 'HELLO', 'WORLD']),
        commonWords: ['ABCDE', 'FGHIJ']
    })
}));

// Mock Game Logic
vi.mock('./lib/gameLogic', async (importOriginal) => {
    const actual = await importOriginal<typeof gameLogic>();
    return {
        ...actual,
        generatePuzzle: () => ({
            id: 'test-puzzle',
            // 25 letters: 5 sets of ABCDE
            letters: [
                'A', 'B', 'C', 'D', 'E', // 0-4
                'A', 'B', 'C', 'D', 'E', // 5-9
                'A', 'B', 'C', 'D', 'E', // 10-14
                'A', 'B', 'C', 'D', 'E', // 15-19
                'A', 'B', 'C', 'D', 'E'  // 20-24
            ],
            targetWords: ['ABCDE', 'ABCDE', 'ABCDE', 'ABCDE', 'ABCDE']
        })
    };
});

describe('App UI Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    const loadApp = async () => {
        render(<App />);
        // Wait for Loading to disappear
        await act(async () => {
            await vi.runAllTimersAsync();
        });
        // Wait for header
        await waitFor(() => screen.getByText('Par'));
    };

    it('1. Renders the main title', async () => {
        await loadApp();
        expect(screen.getByText('Par')).toBeDefined();
    });

    it('2. Shows "GUESS" placeholder initially', async () => {
        await loadApp();
        expect(screen.getAllByText('GUESS').length).toBeGreaterThan(0);
    });

    it('3. "GUESS" placeholder styled correctly (blue)', async () => {
        await loadApp();
        const placeholder = screen.getByText('GUESS');
        // Check inline style or class. Inline is easiest to specific check.
        // InputRow uses inline style for bg color.
        expect(placeholder.getAttribute('style')).toContain('background-color: rgb(96, 165, 250)'); // #60a5fa -> rgb
    });

    it('4. User interaction (click tile) adds letter', async () => {
        await loadApp();

        // Click Tile 0 ('A')
        const tile0 = screen.getByTestId('board-tile-0');
        fireEvent.click(tile0);

        // Should appear in InputRow? 
        // InputRow items don't have test-id, but we can check if placeholder is gone or text is 'A'.
        // Or check loop.
        // Simplest: Check if tile 0 is selected (yellow border/bg).
        // GameBoard renders selected class "!bg-yellow-300".
        expect(tile0.className).toContain('!bg-yellow-300');
    });

    it('5. "GUESS" disappears after interaction', async () => {
        await loadApp();
        const tile0 = screen.getByTestId('board-tile-0');
        fireEvent.click(tile0);
        expect(screen.queryByText('GUESS')).toBeNull();
    });

    it('6. Clicking "Clear" resets the input', async () => {
        await loadApp();
        const tile0 = screen.getByTestId('board-tile-0');
        fireEvent.click(tile0);
        expect(tile0.className).toContain('!bg-yellow-300');

        const clearBtn = screen.getByText('Clear');
        fireEvent.click(clearBtn);

        // Should no longer be selected
        expect(tile0.className).not.toContain('!bg-yellow-300');
    });

    it('7. "GUESS" does NOT reappear after manual clear', async () => {
        await loadApp();
        const tile0 = screen.getByTestId('board-tile-0');
        fireEvent.click(tile0);
        expect(screen.queryByText('GUESS')).toBeNull();

        const clearBtn = screen.getByText('Clear');
        fireEvent.click(clearBtn);

        expect(screen.queryByText('GUESS')).toBeNull();
    });

    it('8. Submitting invalid word shakes/clears', async () => {
        await loadApp();
        // Click A, A, A, A, A (indices 0, 5, 10, 15, 20)
        const indices = [0, 5, 10, 15, 20];

        for (const idx of indices) {
            fireEvent.click(screen.getByTestId(`board-tile-${idx}`));
        }

        // 5 letters entered. Auto-submit logic runs.
        // 'AAAAA' is invalid.
        // Expect Error Shake (class or state).
        // Then Reset.

        // Advance timer for feedback (1000ms for error)
        await act(async () => {
            vi.advanceTimersByTime(1000);
        });

        // Tiles should be cleared (not selected)
        const tile0 = screen.getByTestId('board-tile-0');
        expect(tile0.className).not.toContain('!bg-yellow-300');
    });

    it('9. Submitting valid word "ABCDE" updates count', async () => {
        await loadApp();
        // Click A(0), B(1), C(2), D(3), E(4)
        for (let i = 0; i < 5; i++) {
            fireEvent.click(screen.getByTestId(`board-tile-${i}`));
        }

        // Valid word -> Success Pop (2000ms)
        await act(async () => {
            vi.advanceTimersByTime(2000);
        });

        expect(screen.getByText('Count: 1')).toBeDefined();
    });

    it('10. Completing game shows Completion Screen', async () => {
        await loadApp();

        // 5 rows of ABCDE.
        // Row 1: 0,1,2,3,4
        // Row 2: 5,6,7,8,9
        // ...
        for (let row = 0; row < 5; row++) {
            for (let i = 0; i < 5; i++) {
                const idx = row * 5 + i;
                fireEvent.click(screen.getByTestId(`board-tile-${idx}`));
            }
            // Success wait
            await act(async () => {
                vi.advanceTimersByTime(2500);
            });
        }

        // Wait for completion delay (1000ms)
        await act(async () => {
            vi.advanceTimersByTime(1500);
        });

        expect(screen.getByText('COMPLETE!')).toBeDefined();
    });

    it('11. Completion screen has "TRY HARD MODE" button', async () => {
        await loadApp();
        // Cheat to completion state by mocking? Hard.
        // Replay game quick.
        for (let row = 0; row < 5; row++) {
            for (let i = 0; i < 5; i++) {
                fireEvent.click(screen.getByTestId(`board-tile-${row * 5 + i}`));
            }
            await act(async () => { vi.advanceTimersByTime(2500); });
        }
        await act(async () => { vi.advanceTimersByTime(1500); });

        expect(screen.getByText('TRY HARD MODE')).toBeDefined();
    });

    it('12. Clicking "TRY HARD MODE" button restarts game', async () => {
        await loadApp();
        // Play game
        for (let row = 0; row < 5; row++) {
            for (let i = 0; i < 5; i++) {
                fireEvent.click(screen.getByTestId(`board-tile-${row * 5 + i}`));
            }
            await act(async () => { vi.advanceTimersByTime(2500); });
        }
        await act(async () => { vi.advanceTimersByTime(1500); });

        // Click Restart
        const restartBtn = screen.getByText('TRY HARD MODE');
        fireEvent.click(restartBtn);

        // Completion screen gone
        expect(screen.queryByText('COMPLETE!')).toBeNull();
        // Reset check: Count should be 0.
        // Wait, "Count: 0" isn't displayed? "Score" is displayed in header.
        // Initial score 0?
        // Header component: <div ...>{score}</div>
        // Let's find score container. It has "Score" text below it.
        // screen.getByText('0') might be ambiguous.
        // But "GUESS" should reappear.
        expect(screen.getAllByText('GUESS').length).toBeGreaterThan(0);
    });
});
