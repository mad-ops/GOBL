import { StandardBoard } from './StandardBoard';

import type { LetterState } from '../types';

interface GameBoardProps {
    letters: LetterState[];
    selectedIndices: number[];
    onTileClick: (index: number) => void;
}

export const GameBoard = ({ letters, selectedIndices, onTileClick }: GameBoardProps) => {
    return <StandardBoard letters={letters} selectedIndices={selectedIndices} onTileClick={onTileClick} />;
};
