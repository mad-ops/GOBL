import { Info } from 'lucide-react';

interface HeaderProps {
    onInfoClick: () => void;
}

export const Header = ({ onInfoClick }: HeaderProps) => {
    return (
        <header className="flex items-center justify-between border-b border-par-surface max-w-lg mx-auto w-full h-16 px-4">
            {/* Left: Info Icon - Centered in specific square matching header height */}
            <div
                className="flex items-center justify-center border-r border-transparent"
                style={{ width: '64px', height: '64px' }}
            >
                <Info
                    className="w-6 h-6 text-par-muted cursor-pointer hover:text-white transition-colors"
                    onClick={onInfoClick}
                />
            </div>

            {/* Center: Title */}
            <h1 className="text-3xl font-extrabold tracking-wider uppercase text-white">Par</h1>

            {/* Right: Empty Placeholder to balance title centering */}
            <div style={{ width: '64px', height: '64px' }} className="pointer-events-none" />
        </header>
    );
};
