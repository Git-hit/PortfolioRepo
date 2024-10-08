import { Trail } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";

function Thing({mousePosition}) {
  const ref = useRef(null);

  useFrame(({ viewport }) => {
    const m = {
      x: mousePosition.x * (viewport.width / 2),
      y: mousePosition.y * (viewport.height / 2)
    };
    if (ref.current) {
      ref.current.position.set(m.x, m.y, 0);
    }
  });

  return (
    <>
      <Trail width={3.4} color={"#ffff00"} length={3} attenuation={(t) => t}>
        <mesh ref={ref}>
          <circleGeometry args={[0.1, 32]} />
          <meshStandardMaterial color="#ffff00" />
        </mesh>
        <ambientLight />
      </Trail>
    </>
  );
}

export default function MouseTrail() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const renderedCanvas = document.querySelector('.canvas');
    if(renderedCanvas){
      renderedCanvas.style.pointerEvents = 'none';
    }
  }, [])

  function viewHidden(e){
    if(e.fromElement.children[0].classList.contains('text-to-change')){
      // console.log(e.fromElement.children[0].classList.contains('text-to-change'))

    }
  }

  useEffect(() => {
    window.addEventListener('mouseover', viewHidden);
    return () => {
      window.removeEventListener('mouseover', viewHidden);
    }
  }, [])
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <Canvas className="absolute top-0 left-0 w-screen h-screen z-10 canvas">
        <color />
        <Thing mousePosition={mousePosition}/>
      </Canvas>
    </div>
  );
}