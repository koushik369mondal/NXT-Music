import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import { ChevronLeft, ChevronRight, Search, X, Sparkles, User } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const { searchTerm, setSearchTerm, activeCategory, setActiveCategory } = useContext(PlayerContext);

    const categories = [
        { id: 'all', label: 'All tracks' },
        { id: 'trending', label: 'Trending hits' },
        { id: 'spatial', label: 'Spatial masters' },
        { id: 'chill', label: 'Chill beats' },
        { id: 'favorites', label: 'Your library' },
    ];

    return (
        <div className='w-full flex flex-col gap-3 pb-3 sticky top-0 z-30 bg-background/70 backdrop-blur-md transition-colors duration-200 border-b border-card-edge'>
            {/* Top Toolbar */}
            <div className='w-full flex justify-between items-center gap-3'>
                {/* Back / Forward Controls */}
                <div className='flex items-center gap-1.5'>
                    <button
                        onClick={() => navigate(-1)}
                        className='w-8 h-8 rounded-md border border-card-edge bg-neutral-900/40 hover:bg-neutral-800/80 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer'
                        title="Back"
                        aria-label="Back"
                    >
                        <ChevronLeft className='w-4 h-4' />
                    </button>
                    <button
                        onClick={() => navigate(1)}
                        className='w-8 h-8 rounded-md border border-card-edge bg-neutral-900/40 hover:bg-neutral-800/80 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer'
                        title="Forward"
                        aria-label="Forward"
                    >
                        <ChevronRight className='w-4 h-4' />
                    </button>
                </div>

                {/* Search Input */}
                <div className='flex-1 max-w-md relative'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400'>
                        <Search className='w-4 h-4' />
                    </div>
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Search tracks, artists, albums...'
                        aria-label='Search tracks, artists, albums'
                        className='w-full pl-9 pr-8 py-1.5 rounded-lg border border-card-edge bg-neutral-900/60 focus:bg-neutral-900 focus:border-border text-sm text-foreground placeholder:text-neutral-500 outline-none transition-colors'
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            aria-label='Clear search'
                            className='absolute inset-y-0 right-0 pr-2.5 flex items-center text-neutral-400 hover:text-white cursor-pointer'
                        >
                            <X className='w-4 h-4' />
                        </button>
                    )}
                </div>

                {/* Right Action Items */}
                <div className='flex items-center gap-2'>
                    <div className='hidden sm:flex items-center gap-2 px-3 py-1 rounded-md border border-card-edge bg-neutral-900/40 text-xs font-medium text-neutral-300'>
                        <span className='w-1.5 h-1.5 rounded-full bg-emerald-400' />
                        <span>Lossless mode</span>
                    </div>

                    <button
                        className='w-8 h-8 rounded-md border border-card-edge bg-neutral-900/40 hover:bg-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer'
                        title="Account"
                        aria-label="Account"
                    >
                        <User className='w-4 h-4' />
                    </button>
                </div>
            </div>

            {/* Segmented Filter Bar */}
            <div className='flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none'>
                {categories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                                isActive
                                    ? 'bg-orange-900/40 text-orange-100 border-orange-50/20'
                                    : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/50'
                            }`}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Navbar;
