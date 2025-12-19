import { Info } from 'lucide-react';

interface HeaderProps {
    onInfoClick: () => void;
    score: number;
    label?: string;
    showScore?: boolean;
}

export const Header = ({ onInfoClick, score, label = 'Score', showScore = true }: HeaderProps) => {
    return (
        <header className="flex items-center justify-between border-b border-gobl-surface max-w-lg mx-auto w-full h-16 px-4 mb-1" style={{ marginBottom: '4px' }}>
            {/* Left: Icons - Centered in specific square matching header height */}
            <div
                className="flex items-center justify-center border-r border-transparent"
                style={{ width: '80px', height: '64px' }}
            >
                <Info
                    onClick={onInfoClick}
                    className="w-6 h-6 text-gobl-muted hover:text-white transition-colors cursor-pointer"
                    style={{ marginRight: '2px' }}
                    data-testid="info-icon"
                    aria-label="Info"
                />

            </div>

            {/* Center: Title */}
            <h1 className="text-3xl font-extrabold tracking-wider uppercase text-white">GOBL</h1>

            {/* Right: Score */}
            <div
                className="flex flex-col items-center justify-center text-white"
                style={{ width: '80px', height: '64px' }}
            >
                {showScore && (
                    <>
                        <div className="text-3xl font-black leading-none">{score}</div>
                        <div className="text-xs uppercase font-black tracking-widest opacity-80 mt-1">{label}</div>
                    </>
                )}
            </div>
        </header>
    );
};
