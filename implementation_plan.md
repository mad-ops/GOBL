# Implementation Plan - UI Refinements

## Goal
Implement UI requests: remove shuffle functionality, add a "GUESS" placeholder, and update the page title.

## User Review Required
> [!NOTE]
> The "Shuffle" button will be completely removed from the UI. The underlying `shuffleBoard` logic in `useGameState` will remain unused by the UI but preserved in the hook unless cleanup is requested later.

## Proposed Changes

### Configuration
#### [MODIFY] [index.html](file:///c:/Users/vpers/Documents/GitHub/Par/index.html)
- Change `<title>Vite + React + TS</title>` (or current default) to `<title>Daily Shufl</title>`.

### Components
#### [MODIFY] [App.tsx](file:///c:/Users/vpers/Documents/GitHub/Par/src/App.tsx)
- **Control Bar**:
    - Remove the `<button onClick={shuffleBoard} ...>` element.
    - Ensure the remaining "Clear" button expands to fill the container (it likely already has `flex-1`).
- **Input Row**:
    - Pass a new prop `showPlaceholder` or similar to logic, OR handle it within `InputRow` if it has access to enough state.
    - **State**: Add a `hasInteracted` state (boolean) to `App.tsx` or `useGameState`.
    - **Logic**:
        - Initially `false`.
        - Set to `true` on first `handleTileClick`.
        - Reset to `false` ONLY in `resetProgress`.
    - **Rendering**: Show "GUESS" placeholder ONLY if `!hasInteracted` (and `submissions` empty, though reset handles that).
    - Note: `Clear` button does NOT reset `hasInteracted`. Only the "AGAIN" (reset) flow does.

## Verification Plan
### Automated Tests
- None required for these visual changes.

### Manual Verification
1.  **Page Title**: Reload and check browser tab title is "Daily Shufl".
2.  **Buttons**: Verify "Shuffle" is gone and "Clear" button is full width.
3.  **Placeholder**:
    - On distinct load (or reset), check Input Row shows "GUESS".
    - Click a letter -> "GUESS" disappears, letter appears.
    - Clear selection -> "GUESS" reappears? *User said: "disappears when the first letter is selected and only is restored when the user starts over from the beginning."*
    - Clarification: "only is restored when the user starts over from the beginning" implies that partly typing and clearing should NOT show it?
        - "This only shows up at the beginnginv of the game, disappears when the first letter is selected"
        - If I select 'A', it goes away. If I clear 'A', I am technically back at the state of "beginning of the game" (0 submissions, 0 input).
        - However, strictly speaking, "starts over from the beginning" usually refers to the "Reset" action.
        - But if I haven't submitted anything yet, I am still at the beginning.
        - Let's stick to: Show if `submissions.length === 0` AND `currentInput.length === 0`. This covers the "start over" case (reset clears submissions) and "load" case. It also means if I select and clear, it comes back, which seems consistent with "beginning state".
        - Wait, "disappears when first letter is selected and **only** is restored when the user start over". This "only" suggests if I clear my selection manually, it might NOT come back?
        - But `currentInput` is empty in both cases.
        - I will assume `submissions.length === 0 && currentInputStrings.length === 0` is the correct condition. If the user meant persistent removal until Hard Reset, I'd need a flag `hasInteracted`.
        - Let's check the constraint: "only is restored when the user starts over from the beginning."
        - I will interpret this as: Once interaction starts, it's gone. If I clear, strictly speaking, I haven't submitted, so I'm still at step 0.
        - I'll assume standard placeholder behavior: Empty field = placeholder.
