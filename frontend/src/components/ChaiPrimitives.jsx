import React from 'react';
import bg from '../assets/background.svg';

export const Backdrop = () => {
    return (
        <img
            src={bg}
            alt=""
            aria-hidden
            className="chai-backdrop"
            fetchPriority="high"
            decoding="async"
        />
    );
};

export const AnimatedBadge = ({ children }) => {
    return (
        <span className="relative inline-flex w-fit overflow-hidden rounded-full p-px">
            <span
                aria-hidden
                className="absolute top-1/2 left-1/2 h-5 w-[300px] rounded-full bg-gradient-to-r from-transparent via-transparent to-orange-500 motion-safe:animate-[chai-spin_4s_linear_infinite]"
                style={{ transform: 'translate(-50%,-50%)' }}
            />
            <span className="relative z-10 rounded-full bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-800 dark:bg-stone-900 dark:text-neutral-200">
                {children}
            </span>
        </span>
    );
};
