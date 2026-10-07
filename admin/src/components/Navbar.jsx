import React from 'react';

const Navbar = () => {
    return (
        <div className='w-full border-b border-white/10 px-6 sm:px-10 py-4 flex items-center justify-between bg-[#0b0e17] text-white select-none'>
            <div className='flex items-center gap-3'>
                <h1 className='text-base font-bold tracking-tight'>NXT-Music Admin Control</h1>
                <span className='px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30'>
                    v2.4
                </span>
            </div>
            <div className='flex items-center gap-3'>
                <span className='text-xs text-slate-400'>Studio Operations</span>
                <div className='w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xs shadow-md shadow-purple-500/20'>
                    NXT
                </div>
            </div>
        </div>
    );
};

export default Navbar;
