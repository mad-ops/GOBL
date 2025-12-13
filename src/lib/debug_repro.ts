
import { calculateLetterUsage } from './gameLogic';

// logic extracted from useGameState
function getDisplayLetters(letters: string[], capturedCounts: Record<string, number>) {
    const currentCapturedCounts = { ...capturedCounts };

    return letters.map((char, index) => {
        let status = 'available';
        if ((currentCapturedCounts[char] || 0) > 0) {
            status = 'consumed';
            currentCapturedCounts[char]--;
        }
        return { char, status, id: index };
    });
}

// 1. Setup Mock Puzzle
// Assume board has BOARD letters.
const puzzleLetters = ['B', 'O', 'A', 'R', 'D', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];

// 2. Submit "BOARD"
const submissions = ['BOARD'];

console.log("Puzzle Letters:", puzzleLetters.join(''));
console.log("Submissions:", submissions);

// 3. Calculate Usage
const gameState = calculateLetterUsage(puzzleLetters, submissions);
console.log("Captured Counts:", gameState.capturedCounts);

// 4. Map Display
const display = getDisplayLetters(puzzleLetters, gameState.capturedCounts);

// 5. Verify
const boardWordStatus = display.slice(0, 5).map(l => `${l.char}:${l.status}`);
console.log("First 5 chars status:", boardWordStatus);

// Check if they are consumed
const isConsumed = boardWordStatus.every(s => s.endsWith('consumed'));
console.log("All BOARD letters consumed?", isConsumed);
