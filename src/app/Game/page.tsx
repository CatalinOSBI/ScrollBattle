'use client'
import React,{useEffect, useState} from "react";

const page = () => {
  const [mainCounter, setMainCounter] = useState<number>(0);
  const [p1Counter, setP1Counter] = useState<number>(0);
  const [p2Counter, setP2Counter] = useState<number>(100);
  const [timer, setTimer] = useState<number>(0);
  const [element, setElement] = useState<React.JSX.Element>();

  //test
  useEffect(() => {
    const test = <div style={{width:'85%', height:'40%', background: `linear-gradient(180deg, #ff0000 ${p1Counter}%, #00bdff 100%)`}}></div>
    setElement(test);
  }, [mainCounter, p1Counter, p2Counter]);

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
      const multiplier = 1
      setMainCounter((prevCounter) => prevCounter + multiplier);
      setP1Counter((prevCounter)=> prevCounter + mainCounter)
      setMainCounter(1)
     }

     const handleScrollP2 = () => { 
      console.log('Scrolling')
      const multiplier = 1
      setMainCounter((prevCounter) => prevCounter - mainCounter)
      setP2Counter((prevCounter) => prevCounter - mainCounter);  
     }

     window.addEventListener('wheel', handleScrollP1)
     //Cleanup
     return () => {
       window.removeEventListener('wheel', handleScrollP1)
     }
     

  }, [mainCounter, p1Counter, p2Counter]);

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <span className="text-[9rem]">Timer: {timer}</span>
      <span className="text-[4rem]">P1Counter: {p1Counter}</span>
      <span className="text-[4rem]">MainCounter: {mainCounter}</span>
      <span className="text-[4rem]">P2Counter: {p2Counter}</span>

      {element}

    </main>
  );
};

export default page;

//remember you are going to need 2 calculations 1 for the player to help increase his counter, so thats one signal, and another that will decrease the other's players score , the 2nd signal.
//Done so because we cant have 1 nuumber for both colors in the gradient