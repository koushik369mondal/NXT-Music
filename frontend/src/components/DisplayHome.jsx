import React, { useContext, useMemo } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { AnimatedBadge } from './ChaiPrimitives';
import { PlayerContext } from '../context/PlayerContext';
import { ArrowUpRight, Play, Sparkles, Disc } from 'lucide-react';

const DisplayHome = () => {
    const { songsData, albumsData, searchTerm, activeCategory, playWithId, getTrackId, favorites } = useContext(PlayerContext);

    // Filter songs based on search and category
    const filteredSongs = useMemo(() => {
        let result = songsData || [];

        if (searchTerm.trim()) {
            const query = searchTerm.toLowerCase();
            result = result.filter(
                (song) =>
                    song.name.toLowerCase().includes(query) ||
                    (song.desc && song.desc.toLowerCase().includes(query)) ||
                    (song.album && song.album.toLowerCase().includes(query))
            );
        }

        if (activeCategory === 'favorites') {
            result = result.filter((song) => favorites.includes(getTrackId(song)));
        } else if (activeCategory === 'trending') {
            result = result.slice(0, 6);
        } else if (activeCategory === 'spatial') {
            result = result.filter((_, idx) => idx % 2 === 0);
        } else if (activeCategory === 'chill') {
            result = result.filter((_, idx) => idx % 2 !== 0);
        }

        return result;
    }, [songsData, searchTerm, activeCategory, favorites, getTrackId]);

    // Filter albums based on search
    const filteredAlbums = useMemo(() => {
        let result = albumsData || [];

        if (searchTerm.trim()) {
            const query = searchTerm.toLowerCase();
            result = result.filter(
                (album) =>
                    album.name.toLowerCase().includes(query) ||
                    (album.desc && album.desc.toLowerCase().includes(query))
            );
        }

        return result;
    }, [albumsData, searchTerm]);

    // Hero Spotlight item
    const heroTrack = songsData && songsData.length > 0 ? songsData[0] : null;

    return (
        <div className='flex flex-col gap-8 pb-20'>
            <Navbar />

            {/* ChaiUI Hero: One Central Element */}
            {!searchTerm && (activeCategory === 'all' || activeCategory === 'trending') && heroTrack && (
                <section className='card-chai p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden'>
                    <div className='flex flex-col gap-4 max-w-xl'>
                        <AnimatedBadge>Studio master audio engine</AnimatedBadge>

                        <h1 className='text-[34px] sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-white'>
                            Precision sound in every frequency
                        </h1>

                        <p className='text-base text-neutral-400 sm:text-lg leading-relaxed'>
                            Stream studio recordings without compression, engineered for <span className='highlight'>pure acoustic clarity</span>.
                        </p>

                        <div className='flex items-center gap-3 pt-2'>
                            {/* Solid asymmetric button: the single main action on this screen */}
                            <button
                                onClick={() => playWithId(getTrackId(heroTrack))}
                                className='btn-asym inline-flex h-10 items-center gap-2 bg-white px-5 text-sm font-medium text-black transition-colors duration-200 hover:bg-neutral-200 cursor-pointer'
                            >
                                Play spotlight
                                <ArrowUpRight className='-ml-1 size-4' aria-hidden />
                            </button>

                            {/* Outline beside it */}
                            <div className='hidden sm:flex items-center gap-2 px-3.5 py-2 text-xs font-mono text-neutral-400 border border-card-edge rounded-lg bg-neutral-900/40'>
                                <span className='w-2 h-2 rounded-full bg-emerald-400' />
                                <span>FLAC 24-bit / 96kHz</span>
                            </div>
                        </div>
                    </div>

                    {/* Single Central Artwork Element */}
                    <div className='relative w-48 h-48 sm:w-60 sm:h-60 rounded-xl overflow-hidden border border-card-edge bg-neutral-950 flex-shrink-0'>
                        <img
                            src={heroTrack.image}
                            alt={heroTrack.name}
                            className='w-full h-full object-cover'
                        />
                        <div className='absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center justify-between'>
                            <div className='truncate'>
                                <p className='text-xs font-montserrat font-semibold text-white truncate'>{heroTrack.name}</p>
                                <p className='text-[11px] text-neutral-400 truncate'>{heroTrack.desc || 'Featured track'}</p>
                            </div>
                            <button
                                onClick={() => playWithId(getTrackId(heroTrack))}
                                aria-label='Play spotlight track'
                                className='w-8 h-8 rounded-full border border-card-edge bg-white/90 text-black flex items-center justify-center hover:bg-white transition cursor-pointer flex-shrink-0 ml-2'
                            >
                                <Play className='w-3.5 h-3.5 ml-0.5 fill-current' />
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Search Header */}
            {searchTerm && (
                <div className='flex items-center justify-between pb-3 border-b border-card-edge'>
                    <div>
                        <h2 className='text-2xl font-medium sm:text-[30px] text-white'>
                            Search results
                        </h2>
                        <p className='text-sm text-neutral-400 mt-1'>
                            Found {filteredSongs.length} tracks and {filteredAlbums.length} collections for <span className='highlight'>{searchTerm}</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Favorites Header */}
            {activeCategory === 'favorites' && !searchTerm && (
                <div className='flex items-center justify-between pb-3 border-b border-card-edge'>
                    <div>
                        <h2 className='text-2xl font-medium sm:text-[30px] text-white'>
                            Your library
                        </h2>
                        <p className='text-sm text-neutral-400 mt-1'>
                            {filteredSongs.length} tracks saved in your <span className='highlight'>personal collection</span>
                        </p>
                    </div>
                </div>
            )}

            {/* Curated Albums Section */}
            {activeCategory !== 'favorites' && filteredAlbums.length > 0 && (
                <section>
                    <div className='flex items-end justify-between mb-4'>
                        <div>
                            <h2 className='text-2xl font-medium sm:text-[30px] text-white'>
                                Curated collections
                            </h2>
                            <p className='text-sm text-neutral-400 mt-1'>
                                Explore original master series in <span className='highlight'>studio high definition</span>.
                            </p>
                        </div>
                        <span className='hidden sm:inline-block text-xs font-mono text-neutral-400 border border-card-edge px-2.5 py-1 rounded-md'>
                            {filteredAlbums.length} albums
                        </span>
                    </div>

                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
                        {filteredAlbums.map((item, index) => {
                            const albumId = item._id !== undefined ? item._id : item.id;
                            return (
                                <AlbumItem
                                    key={index}
                                    name={item.name}
                                    desc={item.desc}
                                    id={albumId}
                                    image={item.image}
                                />
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Audio Tracks Section */}
            <section>
                <div className='flex items-end justify-between mb-4'>
                    <div>
                        <h2 className='text-2xl font-medium sm:text-[30px] text-white'>
                            {activeCategory === 'favorites'
                                ? 'Saved recordings'
                                : activeCategory === 'trending'
                                ? 'Trending hits'
                                : 'Master audio streams'}
                        </h2>
                        <p className='text-sm text-neutral-400 mt-1'>
                            Stream lossless tracks with <span className='highlight'>spatial acoustic depth</span>.
                        </p>
                    </div>
                    <span className='hidden sm:inline-block text-xs font-mono text-neutral-400 border border-card-edge px-2.5 py-1 rounded-md'>
                        {filteredSongs.length} tracks
                    </span>
                </div>

                {filteredSongs.length > 0 ? (
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3'>
                        {filteredSongs.map((item, index) => {
                            const songId = getTrackId(item);
                            return (
                                <SongItem
                                    key={index}
                                    name={item.name}
                                    desc={item.desc}
                                    id={songId}
                                    image={item.image}
                                    duration={item.duration}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className='py-16 text-center card-chai rounded-xl'>
                        <Disc className='w-8 h-8 text-neutral-500 mx-auto mb-2' />
                        <p className='text-sm font-medium text-neutral-300'>No recordings found</p>
                        <p className='text-xs text-neutral-500 mt-1'>Try adjusting your search criteria or switching categories</p>
                    </div>
                )}
            </section>

            {/* ChaiUI Footer Hairline */}
            <footer className='relative mt-10 pt-6 text-xs text-neutral-500 font-montserrat flex flex-col sm:flex-row items-center justify-between gap-3 before:absolute before:top-0 before:left-1/2 before:h-px before:w-full before:-translate-x-1/2 before:bg-amber-600 before:opacity-10 dark:before:bg-orange-300 before:[mask-image:linear-gradient(90deg,transparent_0%,black_40%,black_60%,transparent_100%)]'>
                <div className='flex items-center gap-2'>
                    <span className='font-brand font-medium text-neutral-300'>NXT.Music</span>
                    <span>•</span>
                    <span>Studio Acoustic Design</span>
                </div>
                <div className='flex items-center gap-4 text-[11px] text-neutral-400'>
                    <span>24-bit Lossless</span>
                    <span>•</span>
                    <span>Spatial Rendering</span>
                    <span>•</span>
                    <span>Dolby Master</span>
                </div>
            </footer>
        </div>
    );
};

export default DisplayHome;
