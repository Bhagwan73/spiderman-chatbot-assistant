import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { useSelector } from 'react-redux'

function Robot() {
  const robot = useGLTF("./spider-man_symbiote_spider-man_2_ps5/scene.gltf");
  return (
    <primitive object={robot.scene} scale={5} position={[0, -4, 0]} rotation={[0, 0, 0]} />
  );
}

function RobotCanvas() {
  const rotate = useSelector(state => state.rotate)
  return (
    <Canvas
      shadows
      gl={{ preserveDrawingBuffer: true }}
      camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 15] }}
    >
      {/* ADJUST COLOR  */}
      <ambientLight intensity={2} />
      <ambientLight intensity={0.2} />
      <pointLight color="#ff00ff" position={[5, 5, 5]} intensity={1} />
      <pointLight color="#00ffff" position={[-5, -5, -5]} intensity={1} />
      <pointLight color="#ffff00" position={[-5, 5, 5]} intensity={1} />
      <pointLight color="#00ff00" position={[5, -5, -5]} intensity={1} />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls autoRotate={rotate} enableZoom={false} />
        <Robot />
      </Suspense>
    </Canvas>
  );
}

export default RobotCanvas;
