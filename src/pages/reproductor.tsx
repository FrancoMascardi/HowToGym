"use-client"
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import type ReactPlayer from 'react-player';

// Wrap ReactPlayer in dynamic import
const DynamicReactPlayer = dynamic(() => import('react-player'), {
    ssr: false, // Disable server-side rendering for this component
});

const VideoPlayer = () => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const videoURL = localStorage.getItem("videoURL");
    return (
        <div>
            <div className='react-player'>
                {/* Use the dynamically imported ReactPlayer */}
                <DynamicReactPlayer
                    url={videoURL?.toString()}
                    ref={playerRef}
                    controls
                />
            </div>           
        </div>
    );
};

export default VideoPlayer; //aca hay un error, me dice que no es un componente react