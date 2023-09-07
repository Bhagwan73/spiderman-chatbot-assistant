import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import {useSelector} from 'react-redux'  // USE_SELECTOR IS USE TO SELECT DEFAULT STATE 

function  Stars (props){
  const color=useSelector(state=>state.starColor)  // SELECT DFAULT STATE
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color={color}
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};


function StarsCanvas (){
  return (
    <div className="stars-canvas-wrapper">
      <Canvas camera={{ position: [0, 0, 1] }} className="stars-canvas">
        <Suspense fallback={null}>
          <Stars/>
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
