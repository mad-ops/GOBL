export type LetterStatus = 'available' | 'used'; // 'used' covers both consumed and over-used?
// Actually we need to track counts.
// Board state: simple string? Or array of objects?
// The board is 25 letters.
// We need to know which ones are consumed by which word?
// Simplest: Just the map of letter counts and how many used.

export interface DailyPuzzle {
    id: string; // YYYY-MM-DD
    letters: string[]; // 25 letters flattened
    targetWords: string[]; // The 5 words used to generate it (for debug/validation?)
}

export interface GameState {
    date: string;
    submissions: string[];
    gameStatus: 'playing' | 'won' | 'lost'; // Lost happens? Maybe not daily.
}

export type LetterState = {
    char: string;
    status: 'available' | 'consumed';
    id: number; // unique id 0-24
}
