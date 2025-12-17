# Par (Fivefold) - Product Requirements Document

## 1. Overview
**Par** (also known as *Fivefold*) is a daily word puzzle game similar to Wordle or Boggle, where players must construct words from a fixed grid of 25 letters. The core objective is to "capture" all 25 letters on the board by using them in valid words, creating an engaging challenge of efficiency and vocabulary.

## 2. Core Game Loop
1.  **Daily Refresh**: A new puzzle is generated every day at local midnight (based on the device date).
2.  **The Grid**: The board consists of 25 tiles arranged in a 5x5 grid. These remaining letters are derived from 5 hidden 5-letter source words.
3.  **Word Construction**:
    *   Players select tiles to form valid 5-letter words.
    *   Words must be present in the game's dictionary.
    *   The board must contain enough unconsumed matching letters to form the word initially.
4.  **Scoring & Progress**:
    *   **Capturing**: When a valid word is submitted, the specific tiles used are marked as "consumed" (dimmed).
    *   **Efficiency**: Players can reuse consumed tiles, but it is inefficient.
    *   **Game Over**: The game ends when all 25 tiles have been captured.
    *   **Score**: Calculated as `(2 * Captured Letters) - Total Letters Used`. Higher scores indicate a more efficient path to clearing the board.
5.  **Feedback**:
    *   **Success**: Green flash/pop (Word accepted).
    *   **Error**: Red shake (Invalid word, not in dictionary).
    *   **Warning**: Yellow shake (Word already used).

## 3. Detailed Features

### 3.1 Puzzle Generation
*   **Seed**: The random number generator (`seedrandom`) is seeded with the current date string (YYYY-MM-DD), ensuring all players see the same board for the same day.
*   **Source**: The game selects 5 random words from a "Common" subset of the dictionary (top 25% most frequent 5-letter words).
*   **Grid Layout**: The 25 letters from these words are flattened and shuffled to create the initial board state.
*   **Fairness**: The dictionary loading logic ensures the "Common" subset covers the entire alphabet if possible, backfilling missing letters from the rare list.

### 3.2 Gameplay Mechanics
*   **Input Methods**:
    *   **Touch/Click**: Tapping tiles on the 5x5 grid.
    *   **Smart Selection**: Clicking a consumed tile automatically selects an available instance of that letter if one exists.
    *   **Keyboard**: Physical keyboard support.
*   **Validation Rules**:
    *   Word length must be exactly 5.
    *   Word must exist in the full dictionary.
    *   Word must not have been submitted previously in the current game.
*   **Auto-Submit**: When 5 letters are entered, the game automatically checks validity after a brief pause or immediately upon completion (implementation detail: validates on length=5).
*   **Shuffle**: A "Shuffle" button rearranges the visual order of tiles on the board without changing the underlying game state or which tiles are consumed.

### 3.3 Scoring System
*   **Formula**: `Score = (2 * Captured Count) - Total Letters Count`
    *   **Captured Count**: Number of unique board tiles used (max 25).
    *   **Total Letters Count**: Sum of lengths of all submitted words.
*   **Implication**:
    *   Perfect Game: 5 words x 5 letters = 25 used. Score = (2*25) - 25 = 25.
    *   Inefficient Game: 6 words (30 letters used). Score = (2*25) - 30 = 20.
    *   Reusing letters (playing a word using already consumed tiles) increases `Total Letters Count` and lowers the score.

### 3.4 User Interface
*   **Header**: Game title and current score.
*   **Grid**: 5x5 layout of letter tiles.
    *   **Available**: Standard opacity/color.
    *   **Consumed**: Dimmed/Darker.
    *   **Selected**: Highlighted.
*   **Input Row**: Dynamic display of the word currently being formed.
*   **Controls**:
    *   **Clear**: Deselects all tiles.
    *   **Shuffle**: Randomizes tile positions.
*   **Completion Screen**:
    *   Appears when 25/25 tiles are captured.
    *   Shows Final Score.
    *   Lists all submitted words.
    *   "AGAIN" button (resets current day's progress).
    *   "STATS" button (view summary).

## 4. Technical Specifications
*   **Stack**: React 19, TypeScript, Vite, Tailwind CSS.
*   **State Management**: `useGameState` React hook.
*   **Persistence**: `localStorage` saves the current state (`date`, `submissions`, `submissionIndices`) to allow resuming later.
*   **Offline Support**: Dictionary is loaded from a static text file (`/dictionary.txt`), enabling potential offline play.

## 5. Future Roadmap
*   **Statistics**: Long-term stat tracking (streaks, win distribution).
*   **Hard Mode**: stricter validation rules.
*   **Sharing**: "Share Score" button to copy an emoji grid or score summary to clipboard.
*   **Accessibility**: Improved screen reader support and high-contrast modes.
