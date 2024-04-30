import React, {useState, useRef, useEffect} from 'react'
import GameBtn from "./GameBtn"

const colors = ["green", "red", "yelow", "blue"];
function SimonGame() {
    //states
    const [sequence,setSequence] = useState([]);
    const [playing, setPlaying] = useState(false);

    //useRef
    const greenRef = useRef(null);
    const redRef = useRef(null);
    const yellowRef= useRef(null);
    const blueRef = useRef(null);

    //functions
    const addNewColor = () => {
        const color = colors[Math.floor(Math.random() * 4)];
        const newSequence = [...sequence,color]
        setSequence(newSequence);
    };
    const handleNextLevel = () => {
        if(!playing) {
            addNewColor();
        }
    };
    // useEffect
    useEffect(()=> {
    //show sequence
    if (sequence.length > 0) {
        const showSequence = (idx = 0) => {
            let ref=null;
            
            if(sequence[idx] === "green") ref = greenRef;
            if(sequence[idx] === "red") ref = redRef;
            if(sequence[idx] === "yellow") ref = yellowRef;
            if(sequence[idx] === "blue") ref = blueRef;

            //highlight ref
            setTimeout(()=> {
                ref.current.classList.add("brightness-[2.5]");
                setTimeout(() => {
                    ref.current.classList.remove("brightness-[2.5]");
                }, 250);
                if (idx < sequence.length - 1) showSequence(idx + 1);
            }, 250);
        };
        showSequence();
    };   
    },[sequence]);
    
  return (
    //Main Container
    <div className="flex justify-center items-center bg-neutral-800 w-screen h-screen">
        {/* Game Container */}
        <div className="relative flex flex-col justify-center items-center">
            {/* Green and red container */}
            <div>
                {/* Green button */}
                <GameBtn
                    color="green"
                    border="rounded-tl-full"
                    bg="bg-green-500"
                    ref={greenRef}/>
                {/* Red button */}
                <GameBtn
                    color="red"
                    border="rounded-tr-full" 
                    bg="bg-red-500"
                    ref={redRef}/>
            </div>
            {/* Yellow and blue container */}
            <div>
                {/* Yellow button */}
                <GameBtn
                    color="yellow"
                    border="rounded-bl-full"
                    bg="bg-yellow-400"
                    ref={yellowRef}/>
                {/* Blue button */}
                <GameBtn
                    color="blue"
                    border="rounded-br-full"
                    bg="bg-blue-500"
                    ref={blueRef}/>
            </div>
                {/* Play button */}
                <button className="absolute
                                    bg-neutral-900
                                    text-white
                                    text-xl
                                    sm: text-2xl
                                    font-bold
                                    rounded-full
                                    w-[150px]
                                    sm: w-[175px]
                                    h-[150px]
                                    sm: h-[175px]
                                    duration-200
                                    hover:scale-105"
                                    onClick={handleNextLevel}>
                Play
                </button>
        </div>
    </div>

  )
}

export default SimonGame