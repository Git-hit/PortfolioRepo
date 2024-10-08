import { OrbitControls, useGLTF, Stage, SoftShadows, AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { HexColorPicker } from 'react-colorful'
  
  function SetMousePOS({ setMousePosition }){
    const {camera, size} = useThree();
    
    const handleMouseMove = (event) => {
      const x = (event.clientX / size.width) * 2 - 1;
      const y = (event.clientY / size.height) * 2 + 1;
      const Vector = new THREE.Vector3(x, y, 0.5);
      Vector.unproject(camera);
      setMousePosition(Vector);
    }
    
    useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [camera, size])
    
    return null;
  }
  
  export default function AvatarSection(){
    const [mousePosition, setMousePosition] = useState(new THREE.Vector3())
    const [colorSelectorVisibility, setColorSelectorVisibility] = useState(false);
    const [current, setCurrent] = useState();
    const [allValues, setAllValues] = useState({
      Wolf3D_Hair: '#000',
      Wolf3D_Glasses: '#000',
      Wolf3D_Outfit_Top: '#000'
    })

    function setMesh(e){
      setCurrent(e.object.material.name);
      setColorSelectorVisibility(true);
    }

    function hideColorSelector(e){
      if(e.eventObject === undefined){
        setColorSelectorVisibility(false);
      }
    }
    
    function Boy({ mousePosition }){
      const { nodes, materials } = useGLTF('./src/boy.glb');
      const sensitivity = 5;
      const neckRef = useRef();

      useEffect(() => {
        const neck = nodes.Wolf3D_Body.skeleton.bones.find(bone => bone.name === 'Neck');
  
        if(neck){
          neckRef.current = neck;
        }
      }, [nodes])
  
      useFrame(() => {
        if(mousePosition && neckRef){
          neckRef.current.rotation.x = mousePosition.y * sensitivity;
          neckRef.current.rotation.y = mousePosition.x * sensitivity;
        }
      })
  
      return (
        <group position={[0, -1.7, 3.2]} dispose={null}>
          <skinnedMesh
            geometry={nodes.EyeLeft.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeLeft.skeleton}
          />
          <skinnedMesh
            geometry={nodes.EyeRight.geometry}
            material={materials.Wolf3D_Eye}
            skeleton={nodes.EyeRight.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Wolf3D_Body.geometry}
            material={materials.Wolf3D_Body}
            skeleton={nodes.Wolf3D_Body.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Wolf3D_Glasses.geometry}
            material={materials.Wolf3D_Glasses}
            skeleton={nodes.Wolf3D_Glasses.skeleton}
            material-color={allValues.Wolf3D_Glasses}
            // onClick={setMesh}
          />
          <skinnedMesh
            geometry={nodes.Wolf3D_Hair.geometry}
            material={materials.Wolf3D_Hair}
            skeleton={nodes.Wolf3D_Hair.skeleton}
            // material-color={color}
            // material-blendColor={'red'}
            material-emissive={allValues.Wolf3D_Hair}
            onClick={setMesh}
          />
          <skinnedMesh
            name="Wolf3D_Head"
            geometry={nodes.Wolf3D_Head.geometry}
            material={materials.Wolf3D_Skin}
            skeleton={nodes.Wolf3D_Head.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
          />
          <skinnedMesh
            geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
            material={materials.Wolf3D_Outfit_Bottom}
            skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
            material={materials.Wolf3D_Outfit_Footwear}
            skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Wolf3D_Outfit_Top.geometry}
            material={materials.Wolf3D_Outfit_Top}
            skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
            material-color={allValues.Wolf3D_Outfit_Top}
            material-emissive={allValues.Wolf3D_Outfit_Top}
            onClick={setMesh}
          />
          <skinnedMesh
            name="Wolf3D_Teeth"
            geometry={nodes.Wolf3D_Teeth.geometry}
            material={materials.Wolf3D_Teeth}
            skeleton={nodes.Wolf3D_Teeth.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
          />
          <primitive object={nodes.Hips} />
        </group>
      )
    }
  
    useGLTF.preload('./src/boy.glb');

    return(
        <div className='h-[100vh] relative top-[100vh] z-[12] bg-[#f0f0f0]'>
            <Canvas onPointerMissed={hideColorSelector} shadows dpr={[1, 2]} camera={{fov: 15}}>
              <SetMousePOS setMousePosition={setMousePosition} />
                <Suspense fallback={null}>
                        <SoftShadows />
                        <ambientLight intensity={1.3} />
                        <spotLight 
                          castShadow 
                          intensity={1} 
                          angle={0.3} 
                          penumbra={1} 
                          position={[5, 5, 5]} 
                          shadow-mapSize-width={2048} 
                          shadow-mapSize-height={2048}
                          shadow-camera-near={0.5}
                          shadow-camera-far={20} />
                        <directionalLight intensity={5} position={[-3, 3, 10]} />
                        <Boy mousePosition={mousePosition} />
                </Suspense>
            </Canvas>
            <HexColorPicker className='color-picker' style={{position: 'absolute', top: '50%', left: '20%', visibility: colorSelectorVisibility ? 'visible' : 'hidden'}} color={allValues[current]} onChange={(color) => {setAllValues({...allValues, [current]: color})}} />
        </div>
    )
}