import React, { useContext } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import QueueDrawer from './components/QueueDrawer';
import { Backdrop } from './components/ChaiPrimitives';
import { PlayerContext } from './context/PlayerContext';

const App = () => {
  const { audioRef, track } = useContext(PlayerContext);

  return (
    <div className='relative isolate h-screen w-screen overflow-hidden bg-background text-foreground flex flex-col font-sans select-none'>
      {/* Signature ChaiUI Hexagon Glow Backdrop */}
      <Backdrop />

      {/* Main Workspace */}
      <div className='flex-1 flex overflow-hidden p-3 gap-3 relative z-10'>
        <Sidebar />
        <Display />
      </div>

      {/* Bottom Docked Player */}
      <div className='relative z-20 px-3 pb-3'>
        <Player />
      </div>

      {/* Queue Drawer overlay */}
      <QueueDrawer />

      {/* Persistent HTML Audio element */}
      <audio
        ref={audioRef}
        src={track ? track.file : ""}
        preload='auto'
      />
    </div>
  );
};

export default App;
