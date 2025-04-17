import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function HalloweenPumpkin(props) {
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('/scene.gltf');
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      
      if (groupRef.current.position.z < 0) {
        groupRef.current.position.z += 0.03;
      }
      
      if (groupRef.current.scale.x < 1.2) {
        groupRef.current.scale.x += 0.01;
        groupRef.current.scale.y += 0.01;
        groupRef.current.scale.z += 0.01;
      }
    }
  });
  
  return (
    <>
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ff7700" castShadow />
      <pointLight position={[0, 0, 2]} intensity={2} color="#ff4500" distance={10} />
      <ambientLight intensity={0.8} color="#ffebcd" />
      
      <group 
        ref={groupRef} 
        {...props} 
        dispose={null} 
        scale={[0.5, 0.5, 0.5]} 
        position={[0, 0, -5]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.Material_0}
        />
      </group>
    </>
  );
}

useGLTF.preload('/scene.gltf');