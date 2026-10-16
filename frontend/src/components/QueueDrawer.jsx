import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { X, ListMusic } from 'lucide-react';

const QueueDrawer = () => {
    const { isQueueOpen, setIsQueueOpen, songsData, track, playWithId, getTrackId } = useContext(PlayerContext);

    if (!isQueueOpen) return null;

    const currentId = getTrackId(track);

    return (
        <aside
            aria-label="Playing queue"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm sm:max-w-md border-l border-card-edge bg-neutral-950/95 backdrop-blur-xl p-6 flex flex-col transition-all duration-300"
        >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-card-edge">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg border border-card-edge bg-neutral-900 flex items-center justify-center text-neutral-200">
                        <ListMusic className="w-4 h-4 text-brand" />
                    </div>
                    <div>
                        <h2 className="font-montserrat font-medium text-white text-base tracking-tight">
                            Playing queue
                        </h2>
                        <p className="text-xs text-neutral-400">{songsData.length} tracks available</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsQueueOpen(false)}
                    aria-label="Close queue"
                    className="p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Currently Playing Card */}
            {track && (
                <div className="mt-4 p-3 rounded-lg border border-orange-50/20 bg-orange-900/20 flex items-center gap-3">
                    <img
                        src={track.image}
                        alt={track.name}
                        className="w-11 h-11 rounded-md object-cover border border-card-edge"
                    />
                    <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono tracking-wider text-orange-100">NOW PLAYING</span>
                        <h4 className="text-sm font-montserrat font-medium text-white truncate">{track.name}</h4>
                        <p className="text-xs text-neutral-400 truncate">{track.desc || "Studio master"}</p>
                    </div>
                    <div className="flex items-center gap-0.5">
                        <span className="w-0.5 h-2 bg-orange-100 animate-wave-1" />
                        <span className="w-0.5 h-3.5 bg-neutral-200 animate-wave-2" />
                        <span className="w-0.5 h-2 bg-orange-100 animate-wave-3" />
                    </div>
                </div>
            )}

            {/* Next in Queue */}
            <h3 className="text-xs font-mono tracking-wider text-neutral-500 mt-5 mb-2">UP NEXT</h3>
            <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                {songsData.map((item, index) => {
                    const itemId = getTrackId(item);
                    const isCurrent = currentId === itemId;
                    return (
                        <div
                            key={index}
                            onClick={() => playWithId(itemId)}
                            className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer border ${
                                isCurrent
                                    ? 'bg-orange-900/20 text-orange-100 border-orange-50/15'
                                    : 'border-transparent hover:bg-neutral-900/50 text-neutral-300 hover:text-white'
                            }`}
                        >
                            <div className="flex items-center gap-2.5 min-w-0">
                                <span className="text-xs font-mono text-neutral-500 w-4 text-center">{index + 1}</span>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-9 h-9 rounded-md object-cover border border-card-edge"
                                />
                                <div className="truncate">
                                    <p className={`text-sm font-montserrat font-medium truncate ${isCurrent ? 'text-orange-100' : 'text-foreground'}`}>
                                        {item.name}
                                    </p>
                                    <p className="text-xs text-neutral-500 truncate">{item.desc || "Lossless track"}</p>
                                </div>
                            </div>
                            <span className="text-xs font-mono text-neutral-400 ml-2">{item.duration || "2:45"}</span>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};

export default QueueDrawer;
