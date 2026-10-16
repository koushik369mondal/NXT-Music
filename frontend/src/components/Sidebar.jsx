import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import { Compass, Flame, Radio, Heart, Library, Clock3, Disc3 } from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { favorites, setActiveCategory, activeCategory } = useContext(PlayerContext);

    const isHome = location.pathname === '/';

    return (
        <aside className='w-64 lg:w-72 h-full card-chai rounded-xl flex flex-col justify-between p-4 hidden md:flex select-none'>
            <div className='flex flex-col gap-6 overflow-y-auto pr-1'>
                {/* Brand Header */}
                <div
                    onClick={() => {
                        navigate('/');
                        setActiveCategory('all');
                    }}
                    className='flex items-center gap-3 cursor-pointer group px-2 pt-1'
                >
                    <div className='w-9 h-9 rounded-lg border border-card-edge bg-neutral-900/80 flex items-center justify-center transition-colors group-hover:border-card-edge-hover'>
                        <Disc3 className='w-5 h-5 text-brand group-hover:rotate-45 transition-transform duration-300' />
                    </div>
                    <div>
                        <div className='flex items-center gap-2'>
                            <span className='font-brand text-lg font-semibold tracking-tight text-white'>
                                NXT<span className='text-brand'>.</span>Music
                            </span>
                            <span className='text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border border-card-edge text-neutral-300'>
                                Hi-Fi
                            </span>
                        </div>
                        <p className='text-xs text-neutral-400'>Studio sound platform</p>
                    </div>
                </div>

                {/* Primary Navigation */}
                <nav className='flex flex-col gap-1'>
                    <p className='text-xs font-medium text-neutral-500 px-3 mb-1'>Explore</p>

                    <button
                        onClick={() => {
                            navigate('/');
                            setActiveCategory('all');
                        }}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer w-full text-left ${
                            isHome && activeCategory === 'all'
                                ? 'bg-orange-900/30 text-orange-100 border border-orange-50/15'
                                : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
                        }`}
                    >
                        <Compass className='w-4 h-4' />
                        <span>Discover</span>
                    </button>

                    <button
                        onClick={() => {
                            navigate('/');
                            setActiveCategory('trending');
                        }}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer w-full text-left ${
                            isHome && activeCategory === 'trending'
                                ? 'bg-orange-900/30 text-orange-100 border border-orange-50/15'
                                : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
                        }`}
                    >
                        <Flame className='w-4 h-4' />
                        <span>Trending hits</span>
                    </button>

                    <button
                        onClick={() => {
                            navigate('/');
                            setActiveCategory('spatial');
                        }}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer w-full text-left ${
                            isHome && activeCategory === 'spatial'
                                ? 'bg-orange-900/30 text-orange-100 border border-orange-50/15'
                                : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
                        }`}
                    >
                        <Radio className='w-4 h-4' />
                        <span>Spatial acoustic</span>
                    </button>
                </nav>

                {/* Library Navigation */}
                <nav className='flex flex-col gap-1'>
                    <div className='flex items-center justify-between px-3 mb-1'>
                        <p className='text-xs font-medium text-neutral-500'>Your library</p>
                        <span className='text-[11px] font-mono text-neutral-400'>{favorites.length} saved</span>
                    </div>

                    <button
                        onClick={() => {
                            navigate('/');
                            setActiveCategory('favorites');
                        }}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer w-full text-left ${
                            activeCategory === 'favorites'
                                ? 'bg-orange-900/30 text-orange-100 border border-orange-50/15'
                                : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
                        }`}
                    >
                        <div className='flex items-center gap-3'>
                            <Heart className='w-4 h-4 text-neutral-300' />
                            <span>Liked tracks</span>
                        </div>
                        <span className='text-xs font-mono px-1.5 py-0.5 rounded border border-card-edge text-neutral-400'>
                            {favorites.length}
                        </span>
                    </button>

                    <div className='flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-colors cursor-pointer'>
                        <Library className='w-4 h-4' />
                        <span>Saved playlists</span>
                    </div>

                    <div className='flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-colors cursor-pointer'>
                        <Clock3 className='w-4 h-4' />
                        <span>Recent mixes</span>
                    </div>
                </nav>
            </div>

            {/* Bottom Card: Studio Master Info */}
            <div className='mt-4 p-3 rounded-xl border border-card-edge bg-neutral-900/40 relative'>
                <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-2'>
                        <span className='w-2 h-2 rounded-full bg-emerald-400' />
                        <span className='text-xs font-medium text-neutral-300'>Studio master</span>
                    </div>
                    <span className='text-[10px] font-mono px-1.5 py-0.5 rounded border border-card-edge text-neutral-400'>
                        24-bit / 96kHz
                    </span>
                </div>
                <p className='text-xs text-neutral-400'>Lossless acoustic engine</p>
                <div className='flex items-center justify-between mt-2 pt-2 border-t border-card-edge text-xs text-neutral-400'>
                    <span>Spatial audio</span>
                    <span className='text-neutral-200 font-medium'>Online</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
