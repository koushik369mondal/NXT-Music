import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { Play, Pause, Heart } from 'lucide-react';

const SongItem = ({ name, image, desc, id, duration }) => {
    const { playWithId, track, playStatus, getTrackId, isFavorite, toggleFavorite } = useContext(PlayerContext);

    const currentTrackId = getTrackId(track);
    const isPlayingThis = (currentTrackId === id || String(currentTrackId) === String(id));
    const favorited = isFavorite(id);

    return (
        <article
            onClick={() => playWithId(id)}
            className={`card-chai group flex flex-col p-3 cursor-pointer sm:opacity-90 sm:hover:opacity-100 ${
                isPlayingThis ? 'border-card-edge-hover bg-neutral-900/60' : ''
            }`}
        >
            {/* Artwork Container */}
            <div className='relative w-full aspect-square mb-2.5 overflow-hidden rounded-lg bg-neutral-950'>
                <img
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                    src={image}
                    alt={name}
                    loading='lazy'
                />

                {/* Subtle vignette */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200' />

                {/* Quality Label */}
                <div className='absolute top-2 left-2'>
                    <span className='px-1.5 py-0.5 rounded text-[10px] font-mono border border-card-edge bg-neutral-950/80 text-neutral-300'>
                        24-bit
                    </span>
                </div>

                {/* Favorite Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(id);
                    }}
                    aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
                    className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-all cursor-pointer ${
                        favorited
                            ? 'text-rose-400 bg-neutral-950/80 opacity-100'
                            : 'text-neutral-400 hover:text-white bg-neutral-950/60 opacity-0 group-hover:opacity-100'
                    }`}
                >
                    <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
                </button>

                {/* Center Soft Play Button */}
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    <div className='w-10 h-10 rounded-full border border-card-edge bg-neutral-950/90 flex items-center justify-center text-white hover:bg-neutral-900 transition-colors'>
                        {isPlayingThis && playStatus ? (
                            <Pause className='w-4 h-4' />
                        ) : (
                            <Play className='w-4 h-4 ml-0.5 fill-current' />
                        )}
                    </div>
                </div>

                {/* Active Indicator Bars */}
                {isPlayingThis && playStatus && (
                    <div className='absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-neutral-950/80 backdrop-blur-sm flex items-center gap-1 border border-card-edge'>
                        <span className='w-1 h-2.5 bg-orange-100 rounded-full animate-wave-1' />
                        <span className='w-1 h-3.5 bg-neutral-200 rounded-full animate-wave-2' />
                        <span className='w-1 h-2 bg-orange-100 rounded-full animate-wave-3' />
                    </div>
                )}
            </div>

            {/* Song Meta */}
            <div className='flex flex-col flex-1 justify-between pt-1'>
                <h3 className={`font-montserrat font-semibold text-sm leading-snug truncate ${
                    isPlayingThis ? 'text-orange-100' : 'text-foreground'
                }`}>
                    {name}
                </h3>
                <div className='flex items-center justify-between text-xs text-neutral-400 mt-1 gap-2'>
                    <p className='truncate'>{desc}</p>
                    {duration && <span className='font-mono text-[11px] text-neutral-500 flex-shrink-0'>{duration}</span>}
                </div>
            </div>
        </article>
    );
};

export default SongItem;
