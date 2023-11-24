//hablar con chona/vigi lo de node moludes y package jason y pjlock porque creo q se bugeo y medio q lo arregle pero a medias
//estaria piola arreglar lo de tener q hacer doble click 
"use-client"
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import type ReactPlayer from 'react-player'; 

const DynamicReactPlayer = dynamic(() => import('react-player'), {
    ssr: false, 
});

const VideoPlayer = () => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const videoURL = localStorage.getItem("videoURL"); //preguntarle a chona xq me da tanto error en el local (creo q es xq guardo url-video ahi y su refreseheo se coje)y como evitarlo
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

export default VideoPlayer; 
