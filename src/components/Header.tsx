import { Info } from 'lucide-react';

interface HeaderProps {
    onInfoClick: () => void;
    score: number;
}

export const Header = ({ onInfoClick, score }: HeaderProps) => {
    return (
        <header className="flex items-center justify-between border-b border-par-surface max-w-lg mx-auto w-full h-16 px-4 mb-1" style={{ marginBottom: '4px' }}>
            {/* Left: Info Icon - Centered in specific square matching header height */}
            <div
                className="flex items-center justify-center border-r border-transparent"
                style={{ width: '80px', height: '64px' }}
            >
                <Info
                    className="w-6 h-6 text-par-muted cursor-pointer hover:text-white transition-colors"
                    onClick={onInfoClick}
                />
            </div>

            {/* Center: Title */}
            <h1 className="text-3xl font-extrabold tracking-wider uppercase text-white">Par</h1>

            {/* Right: Score */}
            <div
                className="flex flex-col items-center justify-center text-white"
                style={{ width: '80px', height: '64px' }}
            >
                <div className="text-3xl font-black leading-none">{score}</div>
                <div className="text-xs uppercase font-black tracking-widest opacity-80 mt-1">Score</div>
            </div>
        </header>
    );
};
