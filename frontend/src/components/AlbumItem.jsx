import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';

const AlbumItem = ({ image, name, desc, id }) => {
    const navigate = useNavigate();

    return (
        <article
            onClick={() => navigate(`/album/${id}`)}
            className='card-chai group flex flex-col p-3 cursor-pointer sm:opacity-90 sm:hover:opacity-100'
        >
            {/* Album Cover */}
            <div className='relative w-full aspect-square mb-2.5 overflow-hidden rounded-lg bg-neutral-950'>
                <img
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                    src={image}
                    alt={name}
                    loading='lazy'
                />

                {/* Subtle vignette */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200' />

                {/* Top Badge */}
                <div className='absolute top-2 left-2'>
                    <span className='px-1.5 py-0.5 rounded text-[10px] font-mono border border-card-edge bg-neutral-950/80 text-neutral-300'>
                        Album
                    </span>
                </div>

                {/* Hover Play Button */}
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                    <div className='w-10 h-10 rounded-full border border-card-edge bg-neutral-950/90 flex items-center justify-center text-white hover:bg-neutral-900 transition-colors'>
                        <Play className='w-4 h-4 ml-0.5 fill-current' />
                    </div>
                </div>
            </div>

            {/* Album Details */}
            <div className='flex flex-col flex-1 justify-between pt-1'>
                <h3 className='font-montserrat font-semibold text-sm leading-snug text-foreground truncate group-hover:text-orange-100 transition-colors'>
                    {name}
                </h3>
                <p className='text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed'>
                    {desc}
                </p>
            </div>
        </article>
    );
};

export default AlbumItem;
