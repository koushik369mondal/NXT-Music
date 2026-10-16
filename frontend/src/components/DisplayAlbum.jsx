import React, { useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import { Play, Shuffle, Heart, ArrowUpRight, Clock3 } from 'lucide-react';

const DisplayAlbum = ({ album }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [albumData, setAlbumData] = useState(album || null);
    const { playWithId, albumsData, songsData, track, playStatus, getTrackId, isFavorite, toggleFavorite } = useContext(PlayerContext);

    useEffect(() => {
        if (albumsData && albumsData.length > 0) {
            const found = albumsData.find((item) => {
                const itemId = item._id !== undefined ? item._id : item.id;
                return String(itemId) === String(id);
            });
            if (found) {
                setAlbumData(found);
            }
        }
    }, [id, albumsData]);

    const currentTrackId = getTrackId(track);

    // If album songs don't explicitly match album name, show tracks gracefully
    const albumSongs = React.useMemo(() => {
        if (!songsData || songsData.length === 0) return [];
        if (!albumData) return songsData;
        const filtered = songsData.filter((item) => item.album && item.album === albumData.name);
        return filtered.length > 0 ? filtered : songsData;
    }, [songsData, albumData]);

    if (!albumData) {
        return (
            <div className='flex flex-col gap-6 pb-20'>
                <Navbar />
                <div className='py-20 text-center card-chai rounded-xl'>
                    <p className='text-sm text-neutral-400'>Loading collection...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-8 pb-20'>
            <Navbar />

            {/* Album Hero Card */}
            <section className='card-chai p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-center md:items-end relative overflow-hidden'>
                {/* Album Art with Warm Hairline */}
                <div className='relative w-44 h-44 sm:w-52 sm:h-52 rounded-xl overflow-hidden border border-card-edge bg-neutral-950 flex-shrink-0'>
                    <img
                        className='w-full h-full object-cover'
                        src={albumData.image}
                        alt={albumData.name}
                    />
                </div>

                {/* Metadata & Actions */}
                <div className='flex flex-col gap-3 text-center md:text-left flex-1'>
                    <div className='flex items-center justify-center md:justify-start gap-2'>
                        <span className='px-2 py-0.5 rounded text-[10px] font-mono tracking-wider border border-card-edge bg-neutral-900/60 text-neutral-300'>
                            MASTER COLLECTION
                        </span>
                        <span className='px-2 py-0.5 rounded text-[10px] font-mono tracking-wider border border-card-edge bg-neutral-900/60 text-neutral-400'>
                            24-BIT / 96KHZ
                        </span>
                    </div>

                    <h1 className='text-3xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight'>
                        {albumData.name}
                    </h1>

                    <p className='text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl'>
                        {albumData.desc || 'Complete lossless album presentation in'} <span className='highlight'>studio high definition</span>.
                    </p>

                    <div className='flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs text-neutral-400 pt-1'>
                        <span className='font-medium text-neutral-200'>NXT Records</span>
                        <span>•</span>
                        <span>{albumSongs.length} tracks</span>
                        <span>•</span>
                        <span>Approx. 45 mins</span>
                        <span>•</span>
                        <span className='text-neutral-300 font-mono'>Stereo master</span>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className='flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2'>
                        <button
                            onClick={() => albumSongs.length > 0 && playWithId(getTrackId(albumSongs[0]))}
                            className='btn-asym inline-flex h-9 items-center gap-2 bg-white px-5 text-sm font-medium text-black transition-colors duration-200 hover:bg-neutral-200 cursor-pointer'
                        >
                            Play album
                            <ArrowUpRight className='-ml-1 size-4' aria-hidden />
                        </button>

                        <button
                            onClick={() => {
                                if (albumSongs.length > 0) {
                                    const rand = Math.floor(Math.random() * albumSongs.length);
                                    playWithId(getTrackId(albumSongs[rand]));
                                }
                            }}
                            className='btn-asym-mirror inline-flex h-9 items-center gap-2 border border-card-edge bg-neutral-900/40 px-4 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white cursor-pointer'
                        >
                            <Shuffle className='w-3.5 h-3.5' />
                            <span>Shuffle</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Tracklist Table */}
            <div className='flex flex-col gap-2'>
                {/* Table Header */}
                <div className='grid grid-cols-12 px-4 py-2.5 text-[11px] font-mono tracking-wider text-neutral-500 border-b border-card-edge'>
                    <div className='col-span-1 text-center'>#</div>
                    <div className='col-span-6 sm:col-span-5'>TITLE</div>
                    <div className='col-span-3 hidden sm:block'>ARTIST / DESC</div>
                    <div className='col-span-2 hidden md:block text-center'>QUALITY</div>
                    <div className='col-span-5 sm:col-span-3 md:col-span-1 text-right pr-2'>DURATION</div>
                </div>

                {/* Song Rows */}
                <div className='space-y-1'>
                    {albumSongs.map((item, index) => {
                        const songId = getTrackId(item);
                        const isCurrent = (currentTrackId === songId || String(currentTrackId) === String(songId));
                        const favorited = isFavorite(songId);

                        return (
                            <div
                                key={index}
                                onClick={() => playWithId(songId)}
                                className={`grid grid-cols-12 px-4 py-2.5 rounded-lg items-center transition-colors cursor-pointer group ${
                                    isCurrent
                                        ? 'bg-orange-900/25 border border-orange-50/20 text-orange-100'
                                        : 'hover:bg-neutral-900/50 text-neutral-300 hover:text-white border border-transparent'
                                }`}
                            >
                                {/* Index or Play icon */}
                                <div className='col-span-1 flex items-center justify-center font-mono text-xs text-neutral-500'>
                                    {isCurrent && playStatus ? (
                                        <div className='flex items-center gap-0.5'>
                                            <span className='w-0.5 h-2.5 bg-orange-100 animate-wave-1' />
                                            <span className='w-0.5 h-3.5 bg-neutral-200 animate-wave-2' />
                                            <span className='w-0.5 h-2 bg-orange-100 animate-wave-3' />
                                        </div>
                                    ) : (
                                        <>
                                            <span className='group-hover:hidden'>{index + 1}</span>
                                            <Play className='w-3 h-3 fill-current hidden group-hover:block text-white' />
                                        </>
                                    )}
                                </div>

                                {/* Title & Thumbnail */}
                                <div className='col-span-6 sm:col-span-5 flex items-center gap-3 min-w-0 pr-2'>
                                    <img
                                        className='w-9 h-9 rounded-md object-cover flex-shrink-0 border border-card-edge'
                                        src={item.image}
                                        alt={item.name}
                                    />
                                    <div className='truncate'>
                                        <p className={`text-sm font-montserrat font-medium truncate ${isCurrent ? 'text-orange-100' : 'text-white'}`}>
                                            {item.name}
                                        </p>
                                        <p className='text-xs text-neutral-400 truncate sm:hidden'>
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>

                                {/* Desc / Artist */}
                                <div className='col-span-3 hidden sm:block text-xs text-neutral-400 truncate pr-2'>
                                    {item.desc || 'Studio master recording'}
                                </div>

                                {/* Quality Badge */}
                                <div className='col-span-2 hidden md:flex justify-center'>
                                    <span className='px-2 py-0.5 rounded text-[10px] font-mono border border-card-edge bg-neutral-950/60 text-neutral-400'>
                                        FLAC 24/96
                                    </span>
                                </div>

                                {/* Duration & Favorite */}
                                <div className='col-span-5 sm:col-span-3 md:col-span-1 flex items-center justify-end gap-3 pr-2 font-mono text-xs text-neutral-400'>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(songId);
                                        }}
                                        aria-label={favorited ? 'Remove favorite' : 'Add favorite'}
                                        className={`transition-colors cursor-pointer ${
                                            favorited
                                                ? 'text-rose-400'
                                                : 'text-neutral-600 hover:text-neutral-300'
                                        }`}
                                    >
                                        <Heart className={`w-3.5 h-3.5 ${favorited ? 'fill-current' : ''}`} />
                                    </button>
                                    <span>{item.duration || '2:45'}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DisplayAlbum;
