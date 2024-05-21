import React, { useRef, useEffect, useState } from 'react';
import { Player } from '@lordicon/react';

const ArrowIcon = (props) => {
    const playerRef = useRef(null);
    const [state, setState] = useState("hover-arrow-down-2");
    const [added, setAdded] = useState('./system-regular-12-arrow-down.json');



    useEffect(() => {
     
        handlePFB();
  
      
    }, []);
      
    const handlePFB = () => {
        playerRef.current?.playFromBeginning();
    };

   
   
    const ICON = require(`${added}`); 

    return (
        <>
        <div  aria-readonly
            className={`
                 ${ props.className}  `}
        >
            <Player
                state={state}
                size={30}
                ref={playerRef}
                icon={ICON}
                colorize={"#fff"}
                currentState={props.currentState}
                onComplete={handlePFB}
            />

        </div>

                                </>
    );
};

export default ArrowIcon