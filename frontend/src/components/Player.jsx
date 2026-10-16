import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, VolumeX, Volume1, Heart, ListMusic } from 'lucide-react';

const Player = () => {
    const {
        track,
        seekBar,
        seekBg,
        playStatus,
        play,
        pause,
        time,
        previous,
        next,
        seekSong,
        volume,
        setVolume,
        isMuted,
        toggleMute,
        isShuffle,
        toggleShuffle,
        repeatMode,
        toggleRepeat,
        toggleFavorite,
        isFavorite,
        getTrackId,
        isQueueOpen,
        setIsQueueOpen
    } = useContext(PlayerContext);

    if (!track) return null;

    const trackId = getTrackId(track);
    const favorited = isFavorite(trackId);

    const formatNum = (num) => String(num || 0).padStart(2, '0');

    return (
        <div className='w-full card-chai rounded-xl px-4 sm:px-6 py-2.5 border border-card-edge bg-neutral-950/85 backdrop-blur-md flex items-center justify-between gap-4 select-none'>
            {/* Left: Track Information */}
            <div className='flex items-center gap-3 min-w-[180px] max-w-[260px]'>
                <div className='relative w-11 h-11 rounded-lg border border-card-edge overflow-hidden bg-neutral-900 flex-shrink-0'>
                    <img
                        className='w-full h-full object-cover'
                        src={track.image}
                        alt={track.name}
                    />
                </div>

                <div className='min-w-0 flex-1'>
                    <div className='flex items-center gap-1.5'>
                        <p className='font-montserrat font-medium text-sm text-foreground truncate hover:underline cursor-pointer'>
                            {track.name}
                        </p>
                        <span className='hidden xl:inline-block px-1 py-0.2 rounded text-[9px] font-mono border border-card-edge text-neutral-400'>
                            FLAC
                        </span>
                    </div>
                    <p className='text-xs text-neutral-400 truncate'>
                        {track.desc || 'Studio master'}
                    </p>
                </div>

                {/* Favorite Button */}
                <button
                    onClick={() => toggleFavorite(trackId)}
                    aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
                    className={`p-1.5 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer flex-shrink-0 ${
                        favorited ? 'text-rose-400' : 'text-neutral-400 hover:text-white'
                    }`}
                >
                    <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
                </button>
            </div>

            {/* Center: Playback Controls & Timeline */}
            <div className='flex-1 max-w-xl flex flex-col items-center gap-1.5'>
                {/* Control Buttons */}
                <div className='flex items-center gap-3 sm:gap-5'>
                    {/* Shuffle */}
                    <button
                        onClick={toggleShuffle}
                        aria-label="Toggle shuffle"
                        className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                            isShuffle
                                ? 'text-orange-100 bg-orange-900/40 border border-orange-50/20'
                                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                        }`}
                        title="Shuffle"
                    >
                        <Shuffle className='w-4 h-4' />
                    </button>

                    {/* Previous */}
                    <button
                        onClick={previous}
                        aria-label="Previous track"
                        className='p-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer'
                        title="Previous"
                    >
                        <SkipBack className='w-4 h-4 fill-current' />
                    </button>

                    {/* Main Play / Pause */}
                    <button
                        onClick={playStatus ? pause : play}
                        aria-label={playStatus ? 'Pause track' : 'Play track'}
                        className='w-9 h-9 rounded-full bg-white text-black hover:bg-neutral-200 flex items-center justify-center transition-colors cursor-pointer'
                        title={playStatus ? 'Pause' : 'Play'}
                    >
                        {playStatus ? (
                            <Pause className='w-4 h-4 fill-current' />
                        ) : (
                            <Play className='w-4 h-4 fill-current ml-0.5' />
                        )}
                    </button>

                    {/* Next */}
                    <button
                        onClick={next}
                        aria-label="Next track"
                        className='p-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer'
                        title="Next"
                    >
                        <SkipForward className='w-4 h-4 fill-current' />
                    </button>

                    {/* Repeat */}
                    <button
                        onClick={toggleRepeat}
                        aria-label="Toggle repeat"
                        className={`p-1.5 rounded-md transition-colors relative cursor-pointer ${
                            repeatMode !== 'off'
                                ? 'text-orange-100 bg-orange-900/40 border border-orange-50/20'
                                : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                        }`}
                        title={`Repeat mode: ${repeatMode}`}
                    >
                        <Repeat className='w-4 h-4' />
                        {repeatMode === 'one' && (
                            <span className='absolute -top-1 -right-1 text-[8px] font-mono font-bold bg-white text-black rounded-full w-3.5 h-3.5 flex items-center justify-center'>
                                1
                            </span>
                        )}
                    </button>
                </div>

                {/* Progress Timeline */}
                <div className='w-full flex items-center gap-3 text-[11px] font-mono text-neutral-400'>
                    <span className='w-8 text-right'>
                        {formatNum(time.currentTime.minute)}:{formatNum(time.currentTime.second)}
                    </span>

                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        className='flex-1 h-1 hover:h-1.5 bg-neutral-800 rounded-full cursor-pointer relative transition-all overflow-hidden'
                    >
                        <div
                            ref={seekBar}
                            className='h-full w-0 bg-white rounded-full'
                        />
                    </div>

                    <span className='w-8'>
                        {formatNum(time.totalTime.minute)}:{formatNum(time.totalTime.second)}
                    </span>
                </div>
            </div>

            {/* Right: Soundwave, Volume & Queue */}
            <div className='hidden md:flex items-center gap-3 min-w-[180px] justify-end'>
                {/* Minimalist Soundwave Indicator */}
                {playStatus ? (
                    <div className='flex items-center gap-0.5 px-2 py-1 rounded border border-card-edge bg-neutral-900/50' title="Playing">
                        <span className='w-0.5 h-2 bg-orange-100 animate-wave-1' />
                        <span className='w-0.5 h-3.5 bg-neutral-200 animate-wave-2' />
                        <span className='w-0.5 h-1.5 bg-orange-100 animate-wave-3' />
                        <span className='w-0.5 h-3 bg-neutral-200 animate-wave-4' />
                    </div>
                ) : (
                    <div className='flex items-center gap-0.5 px-2 py-1 opacity-40' title="Paused">
                        <span className='w-0.5 h-1.5 bg-neutral-500' />
                        <span className='w-0.5 h-2.5 bg-neutral-500' />
                        <span className='w-0.5 h-1.5 bg-neutral-500' />
                        <span className='w-0.5 h-2 bg-neutral-500' />
                    </div>
                )}

                {/* Volume Slider */}
                <div className='flex items-center gap-2'>
                    <button
                        onClick={toggleMute}
                        aria-label={isMuted ? 'Unmute volume' : 'Mute volume'}
                        className='text-neutral-400 hover:text-white transition-colors cursor-pointer'
                        title={isMuted ? 'Unmute' : 'Mute'}
                    >
                        {isMuted || volume === 0 ? (
                            <VolumeX className='w-4 h-4' />
                        ) : volume < 0.5 ? (
                            <Volume1 className='w-4 h-4' />
                        ) : (
                            <Volume2 className='w-4 h-4' />
                        )}
                    </button>

                    <input
                        type='range'
                        min='0'
                        max='1'
                        step='0.02'
                        value={isMuted ? 0 : volume}
                        onChange={(e) => setVolume(e.target.value)}
                        aria-label='Volume control'
                        className='w-16 h-1 cursor-pointer'
                        title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                    />
                </div>

                {/* Queue Toggle Button */}
                <button
                    onClick={() => setIsQueueOpen(!isQueueOpen)}
                    aria-label="Toggle playing queue"
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isQueueOpen
                            ? 'bg-orange-900/40 text-orange-100 border-orange-50/20'
                            : 'border-card-edge bg-neutral-900/40 hover:bg-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                    title="Queue"
                >
                    <ListMusic className='w-4 h-4' />
                </button>
            </div>
        </div>
    );
};

export default Player;
