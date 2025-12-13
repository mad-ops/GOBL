import clsx from 'clsx';
import type { LetterState } from '../types';

interface GameBoardProps {
    letters: LetterState[];
    selectedIndices: number[];
    onTileClick: (index: number) => void;
}

export const GameBoard = ({ letters, selectedIndices, onTileClick }: GameBoardProps) => {
    return (
        <div className="grid grid-cols-5 gap-4 w-full max-w-[400px] aspect-square mx-auto mb-4">
            {letters.map((l) => {
                const isSelected = selectedIndices.includes(l.id);
                return (
                    <div
                        key={l.id}
                        id={`board-tile-${l.id}`}
                        data-testid={`board-tile-${l.id}`}
                        onClick={() => onTileClick(l.id)}
                        className={clsx(
                            "flex items-center justify-center text-3xl sm:text-4xl font-black rounded-xl shadow-md transition-all duration-100 select-none p-1 m-[2px] cursor-pointer",
                            "border-4", // Always have border width to prevent layout shift
                            isSelected ? "z-10" : "", // Removed border classes in favor of inline style
                            l.status === 'consumed'
                                ? "bg-par-primary card-consumed"
                                : "card-available",
                            l.status === 'consumed' && !isSelected && "bg-slate-300 text-slate-500 opacity-50", // Dimmed if consumed but not currently selected
                            isSelected && "!bg-yellow-300 !border-black border-2" // Yellow background for selection
                        )}
                        style={{ borderColor: isSelected ? 'black' : 'transparent' }}
                    >
                        {l.char}
                    </div>
                );
            })}
        </div>
    );
};
