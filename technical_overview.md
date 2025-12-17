# Par (Fivefold) - Technical Overview

## Architecture
The application is a client-side Single Page Application (SPA) built with React and TypeScript. It uses Vite as the build tool and follows a modular component-based architecture.

## Tech Stack
*   **Framework**: React 19
*   **Language**: TypeScript 5.x
*   **Build Tool**: Vite 7.x
*   **Styling**: Tailwind CSS 4.x
*   **Testing**: Vitest + React Testing Library
*   **Utilities**:
    *   `date-fns`: Date manipulation.
    *   `seedrandom`: Segregated random number generation for deterministic daily puzzles.
    *   `lucide-react`: SVG icons.
    *   `clsx`: Conditional class definition.

## Directory Structure
```
src/
├── assets/          # Static assets
├── components/      # React UI components (GameBoard, InputRow, etc.)
├── hooks/           # Custom React hooks (useGameState)
├── lib/             # Pure business logic (gameLogic, dictionary)
├── types/           # Shared TypeScript interfaces
├── App.tsx          # Main application entry component
└── main.tsx         # React DOM entry point
```

## Key Components

### 1. `useGameState` Hook (`src/hooks/useGameState.tsx`)
This is the central state management logic for the game.
*   **Responsibilities**:
    *   Manages game state (`puzzle`, `submissions`, `selectedIndices`).
    *   Handles persistence via `localStorage`.
    *   Orchestrates dictionary loading and puzzle generation.
    *   Provides actions (`submitWord`, `handleTileClick`, `shuffleBoard`).
*   **Persistence**:
    *   Key: `par_game_state`
    *   Saves: `date`, `submissions`, `submissionIndices`.
    *   Restores: Only if the saved date matches the current local date.

### 2. Game Logic (`src/lib/gameLogic.ts`)
Contains pure functions for the core game mechanics.
*   `generatePuzzle(date, commonWords)`: Creates a deterministic 25-letter grid.
*   `calculateLetterUsage(puzzleLetters, submissions)`: Computes the current score, captured letters, and completion status.
*   `validateSubmission(word, boardLetters)`: Validates if a word can be formed from the board.

### 3. Dictionary (`src/lib/dictionary.ts`)
Handles loading and processing the dictionary.
*   Fetches `/dictionary.txt` from the public folder.
*   Filters for 5-letter words.
*   Splits words into "Common" (top 25%) and "Rare" for puzzle generation vs. validation.

## Data Flow
1.  **Initialization**: `useGameState` loads the dictionary and generates the daily puzzle based on `new Date()`.
2.  **Interaction**: User clicks tiles; `handleTileClick` updates `selectedIndices`.
3.  **Validation**: `currentInput` is checked against `dictionary`.
4.  **Submission**: `submitWord` validates the words, updates `submissions`, and persists state.
5.  **Reactive UI**: `calculateLetterUsage` runs on every update to recalculate availability and score, driving the UI state (dimmed tiles, score display).
