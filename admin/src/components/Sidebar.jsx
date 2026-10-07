import React from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='bg-[#0b0e17] border-r border-white/10 min-h-screen px-4 sm:px-6 py-6 flex flex-col justify-between select-none'>
            <div>
                {/* Brand Logo */}
                <div className='flex items-center gap-3 px-2 mb-8'>
                    <div className='w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-500 p-[1.5px] shadow-lg shadow-purple-500/25'>
                        <div className='w-full h-full bg-[#0a0d16] rounded-[10px] flex items-center justify-center'>
                            <svg className='w-5 h-5 text-purple-400' viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center gap-1.5'>
                            <span className='font-extrabold text-base tracking-tight text-white'>NXT-Music</span>
                        </div>
                        <span className='text-[10px] uppercase font-bold tracking-widest text-purple-400'>Admin Portal</span>
                    </div>
                </div>

                {/* Navigation Items */}
                <div className='flex flex-col gap-2'>
                    <NavLink
                        to='/add-song'
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3.5 py-3 rounded-xl transition font-medium text-sm ${
                                isActive
                                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/10 text-white border border-purple-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`
                        }
                    >
                        <img src={assets.add_song} className='w-5 opacity-80' alt="" />
                        <span>Add Song</span>
                    </NavLink>

                    <NavLink
                        to='/list-song'
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3.5 py-3 rounded-xl transition font-medium text-sm ${
                                isActive
                                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/10 text-white border border-purple-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`
                        }
                    >
                        <img src={assets.song_icon} className='w-5 opacity-80' alt="" />
                        <span>List Songs</span>
                    </NavLink>

                    <NavLink
                        to='/add-album'
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3.5 py-3 rounded-xl transition font-medium text-sm ${
                                isActive
                                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/10 text-white border border-purple-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`
                        }
                    >
                        <img src={assets.add_album} className='w-5 opacity-80' alt="" />
                        <span>Add Album</span>
                    </NavLink>

                    <NavLink
                        to='/list-album'
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3.5 py-3 rounded-xl transition font-medium text-sm ${
                                isActive
                                    ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/10 text-white border border-purple-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`
                        }
                    >
                        <img src={assets.album_icon} className='w-5 opacity-80' alt="" />
                        <span>List Albums</span>
                    </NavLink>
                </div>
            </div>

            {/* Bottom Status Card */}
            <div className='p-3 rounded-xl bg-white/[0.04] border border-white/5 text-xs text-slate-400'>
                <div className='flex items-center gap-1.5 mb-1'>
                    <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse' />
                    <span className='font-bold text-slate-300'>NXT Control v2.4</span>
                </div>
                <p className='text-[11px] text-slate-500'>Cloudinary & Mongo Connected</p>
            </div>
        </div>
    );
};

export default Sidebar;
