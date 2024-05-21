import React, { useRef, useEffect } from 'react';
import { Player } from '@lordicon/react';


const TrashIcon = (props) => {
    const playerRef = useRef(null);

    useEffect(() => {
            handlePFB();
      
    }, [playerRef]);

    const handlePFB = () => {
        playerRef.current?.playFromBeginning();
    };

    const ICON = require('./wired-outline-185-trash-bin.json'); 

    return (
        <div className={props.className}>
            <Player
                state={"morph-trash-in"}
                size={40}
                ref={playerRef}
                icon={ICON}
                colorize="#000"
            />
        </div>
    );
};

export default TrashIcon;