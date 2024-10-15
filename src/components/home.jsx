import { motion } from "framer-motion"
import Navbar from "./navbar"
import { useState, useRef, useEffect } from 'react';

export default function Home(){
    const [ScrollY, setScrollY] = useState(0);
    const hoveredRef = useRef(null);
    let cursorCircle = useRef();
    let clipPathElement = useRef(null);
    let animationFrameId = useRef(null);
    // const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const cursorPosition = useRef({x: 0, y: 0});

    function showHidden(){
        if(!hoveredRef.current){
            hoveredRef.current = true;
            cursorCircle.current.style.width = '300px';
            cursorCircle.current.style.height = '300px';
        }
    }
    
    function hideText(){
        if(hoveredRef.current){
            hoveredRef.current = false;
            cursorCircle.current.style.border = 'none';
            cursorCircle.current.style.width = '20px';
            cursorCircle.current.style.height = '20px';
        }
    }

    function handleScroll(e){
        const delta = e.deltaY;
        setScrollY((prev) => {
            let newValue = prev + delta * 0.1;
            newValue = Math.max(0, Math.min(160, newValue));
            // console.log(Math.max(2, newValue / 1.6));
            return newValue;
        });
    }

    function setCursor(e){
        cursorPosition.current = {x: e.clientX, y: e.clientY};
        if(hoveredRef.current){
            clipPathElement.current.style.clipPath = `circle(150px at ${cursorPosition.current.x}px ${cursorPosition.current.y + window.scrollY - 260}px)`;
        } else{
            clipPathElement.current.style.clipPath = 'circle(0px)';
        }
        if(animationFrameId.current){
            cancelAnimationFrame(animationFrameId.current)
        }
        animationFrameId.current = requestAnimationFrame(() => {
            const cursor = cursorCircle.current;
            const targetX = e.clientX;
            const targetY = e.clientY;
            
            const moveCursor = () => {
                const currentX = cursor.offsetLeft;
                const currentY = cursor.offsetTop;
                
                const dx = targetX - currentX;
                const dy = targetY - currentY;
                
                const speed = 100;
                const moveX = currentX + dx * speed;
                const moveY = currentY + dy * speed;
                
                cursor.style.left = `${moveX}px`;
                cursor.style.top = `${moveY}px`;
                
                animationFrameId.current = requestAnimationFrame(moveCursor);
            };
            moveCursor();
        })
    }

    useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        window.addEventListener('mousemove', setCursor);
        return() => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('mousemove', setCursor);
            if(animationFrameId.current){
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [])

    const variantsContainer = {
        hidden: {opacity: 0, scale: 1},
        visible: {opacity: 1, scale: 1, transition: {delayChildren: 0.5, staggerChildren: 0.2}}
    }

    const spanMotion = {
        hidden: {y: 20, opacity: 0},
        visible: {y: 0, opacity: 1, transition: {duration: 0.5}},
    }

    function handleMouseMoveOverText(e){
        const rect = e.target.classList.contains('span-to-change');

        if(!hoveredRef.current && rect){
            showHidden();
        }else if(hoveredRef.current && !rect){
            hideText();
        }
    }
    return (
        <div onMouseMove={handleMouseMoveOverText} className="relative h-[280vh]">
            <div ref={cursorCircle} style={{transform: 'translate(-50%, -50%)', top: '0', left: '0'}} className="z-[1] fixed pointer-events-none cursorCircle transition-all duration-200 bg-[#6bd490] rounded-full h-5 w-5 stroke-black stroke-2"></div>
            <Navbar />
            <div className="flex flex-col">
                <div className="flex flex-col relative text-white mt-28">
                    <motion.div variants={variantsContainer} initial="hidden" animate="visible" className="text-to-change epilogue-bold text-[84px] text-center leading-none">
                        <motion.span className="inline-block span-to-change" variants={spanMotion}>Hire me as your next</motion.span>
                        <br />
                        <span>
                            <motion.span className="inline-block span-to-change" variants={spanMotion} style={{animation: 'gradientAnimation 10s infinite', backgroundSize: '200% 200%', WebkitTextFillColor: 'transparent', backgroundClip: 'text', backgroundImage: 'linear-gradient(90deg, #d66761 16.66666%, #f5c0b2 33.33333%, #aee8fa 50%, #68bde7 66.66666%, #6bd490 83.33333%, #a2f6cf)'}}>creative</motion.span>
                            <motion.span className="inline-block span-to-change" variants={spanMotion}>&nbsp;developer</motion.span>
                        </span>
                    </motion.div>
                    <div
                        ref={clipPathElement}
                        className="z-[2] absolute left-1/2 w-full -translate-x-1/2 flex justify-center"
                        style={{
                            pointerEvents: 'none',
                            clipPath: 'circle(0px)'
                       }}
                    >
                        <div className="text-[84px] text-center leading-none epilogue-bold text-black">
                            <span>This is a bullshit</span>
                            <br />
                            <span>I am the best</span>
                        </div>
                    </div>
                    <motion.div className="relative mt-14 flex justify-center">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                            key={i}
                            initial={i == 2 ? {scale: 0.5, opacity: 1} : { scale: 0, opacity: 0 }}
                            animate={i == 2 ? {scale: 0.5, opacity: 1} : {scale: [0.5, 2, 0.5], opacity: [0.5, 1, 0.5]}}
                            transition={{ delay: i * 0.5, duration: 3, repeat: Infinity }}
                            className="absolute w-24 h-24 rounded-full border-4 border-white"
                            style={{
                                top: `${Math.min(ScrollY, 80 * i)}vh`,
                            }}
                            />
                        ))}
                    </motion.div>
                </div>
                <div 
                    className="absolute w-full h-[100vh] bottom-0 z-50 gridContainer"
                    style={{
                        opacity: `${ScrollY >= 120 ? '1' : '0'}`
                    }}>
                    {Array.from({ length: 1200 }).map((_, i) => (
                        <div key={i} className="border border-white"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}