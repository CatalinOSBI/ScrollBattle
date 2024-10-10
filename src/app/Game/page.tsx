'use client'
import React,{useEffect, useState} from "react";

const page = () => {
  const [counter, setCounter] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [element, setElement] = useState<React.JSX.Element>();

  //test
  useEffect(() => {
    const test = <div style={{width:'150rem', height:'200px', background: `linear-gradient(90deg, #ff0000 ${counter}%, #00bdff 100%)`}}></div>
    setElement(test);
  }, [counter]);

  //start timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1)
    }, 1000);

    return () =>{
      clearInterval(interval)
    }
  }, []);

  //counter
  useEffect(() => {
    
    const handleScrollP1 = () => { 
      console.log('Scrolling')
      const multiplier = 0.25
      setCounter((prevCounter) => prevCounter + multiplier);
     }

     const handleScrollP2 = () => { 
      console.log('Scrolling')
      const multiplier = 0.1
      setCounter((prevCounter) => prevCounter - multiplier)
     }

     window.addEventListener('wheel', handleScrollP1)
     //Cleanup
     return () => {
       window.removeEventListener('wheel', handleScrollP1)
     }
     

  }, [counter]);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <span className="text-[9rem]">Timer: {timer}</span>
      <span className="text-[9rem]">{counter.toFixed(2)}</span>

      {element}

    </main>
  );
};

export default page;
