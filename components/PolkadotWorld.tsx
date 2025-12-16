import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Html, Float, Trail, Line, Sphere, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { ECOSYSTEM_DATA, POLKADOT_PINK, POLKADOT_PURPLE } from '../constants';
import { NodeType, NodeData } from '../types';

// Augment the JSX namespace to satisfy TypeScript when @react-three/fiber types are not automatically picked up
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      color: any;
      fog: any;
      group: any;
      mesh: any;
      meshStandardMaterial: any;
      meshPhysicalMaterial: any;
      meshBasicMaterial: any;
      sphereGeometry: any;
      torusGeometry: any;
      cylinderGeometry: any;
      boxGeometry: any;
      octahedronGeometry: any;
    }
  }
}

interface PolkadotWorldProps {
  onSelectNode: (id: string | null) => void;
  selectedId: string | null;
  showLayer0: boolean;
  showLayer1: boolean;
  showLayer2: boolean;
}

// Reusable Glow Material for simplistic bloom-like effect
const GlowMaterial = ({ color, opacity = 1, intensity = 1 }: { color: string; opacity?: number; intensity?: number }) => (
  <meshStandardMaterial
    color={color}
    emissive={color}
    emissiveIntensity={intensity}
    transparent
    opacity={opacity}
    toneMapped={false}
  />
);

// --- Layer 0: Relay Chain ---
const RelayChain = ({ 
  data, 
  isSelected, 
  onClick 
}: { 
  data: NodeData; 
  isSelected: boolean; 
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // Create the ring of dots
  const dots = useMemo(() => {
    const count = 24;
    const radius = 3;
    return new Array(count).fill(0).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return {
        position: [Math.cos(angle) * radius, Math.sin(angle) * radius, 0] as [number, number, number],
        key: i
      };
    });
  }, []);

  return (
    <group ref={groupRef} onClick={onClick} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
      {/* Central Core Halo */}
      <group rotation={[Math.PI / 2, 0, 0]}>
         {/* The main ring path */}
         <mesh>
            <torusGeometry args={[3, 0.05, 16, 100]} />
            <GlowMaterial color={POLKADOT_PINK} intensity={isSelected ? 4 : 2} />
         </mesh>

         {/* The Dots */}
         {dots.map((dot) => (
           <mesh key={dot.key} position={dot.position}>
             <sphereGeometry args={[0.15, 16, 16]} />
             <GlowMaterial color={data.color || 'white'} intensity={isSelected ? 3 : 1.5} />
           </mesh>
         ))}

         {/* Central Hologram / Logo representation */}
         <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh>
              <sphereGeometry args={[0.8, 32, 32]} />
              <meshPhysicalMaterial 
                color={POLKADOT_PINK} 
                roughness={0.2} 
                metalness={0.8} 
                transparent 
                opacity={0.6}
                transmission={0.5}
              />
            </mesh>
            {/* Inner light */}
            <mesh scale={[0.5, 0.5, 0.5]}>
               <sphereGeometry args={[1, 16, 16]} />
               <meshBasicMaterial color="white" />
            </mesh>
         </Float>
      </group>
      
      {/* Label */}
      <Html position={[0, -4, 0]} center distanceFactor={15} style={{ pointerEvents: 'none' }}>
        <div className={`px-2 py-1 rounded-full text-xs font-bold transition-all duration-300 ${isSelected ? 'bg-pink-600 text-white scale-110' : 'bg-black/50 text-pink-300'}`}>
          Layer 0: Relay Chain
        </div>
      </Html>
    </group>
  );
};

// --- Layer 1: Parachains ---
const ParachainNode = ({ 
  data, 
  index, 
  total, 
  isSelected, 
  onClick, 
  children 
}: { 
  data: NodeData; 
  index: number; 
  total: number; 
  isSelected: boolean; 
  onClick: (e: ThreeEvent<MouseEvent>) => void;
  children?: React.ReactNode; // For dApps
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Calculate radial position
  const radius = 6;
  const angle = (index / total) * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = -2.5; // Below the Relay Chain

  const position: [number, number, number] = [x, y, z];

  // Animated connection line points
  const start: [number, number, number] = [0, 0, 0]; // Center of Relay Chain
  const end = position;

  // Floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = y + Math.sin(state.clock.elapsedTime + index) * 0.2;
    }
  });

  return (
    <group>
      {/* Connection to Layer 0 */}
      <Line 
        points={[start, end]} 
        color={isSelected ? POLKADOT_PINK : "#444"} 
        lineWidth={isSelected ? 2 : 1} 
        transparent 
        opacity={0.3} 
        dashed={true}
        dashScale={5}
        dashSize={0.5}
        dashOffset={0} // Ideally animate this but simple Line doesn't support easy offset anim without ref
      />
      {/* Animated Particles on the line */}
      <Sparkles count={5} scale={1} size={2} speed={2} opacity={0.5} color="white" noise={0} position={[x/2, y/2, z/2]} />

      {/* The Parachain Node */}
      <group position={position}>
        <mesh 
          ref={meshRef} 
          onClick={onClick}
          onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }} 
          onPointerOut={() => document.body.style.cursor = 'auto'}
        >
          {/* Main Body */}
          <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
          <meshStandardMaterial color={data.color} metalness={0.6} roughness={0.2} />
          
          {/* Glow Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
             <torusGeometry args={[0.7, 0.02, 16, 32]} />
             <GlowMaterial color={data.color || 'white'} intensity={2} />
          </mesh>

          {/* Bridge Indicator (if any) */}
          {data.bridgesTo && data.bridgesTo.length > 0 && (
             <group position={[1.2, 0, 0]}>
                <Line points={[[0,0,0], [1,0,0]]} color="cyan" lineWidth={2} dashed />
                <mesh position={[1.2, 0, 0]}>
                  <boxGeometry args={[0.4, 0.4, 0.4]} />
                  <meshStandardMaterial color="cyan" emissive="cyan" emissiveIntensity={0.5} />
                </mesh>
                <Html position={[1.2, 0.5, 0]} center distanceFactor={10}>
                    <div className="text-[8px] bg-cyan-900/80 text-cyan-100 px-1 rounded whitespace-nowrap">
                       Bridge: {data.bridgesTo.join(', ')}
                    </div>
                </Html>
             </group>
          )}
        </mesh>

        {/* Label */}
        <Html position={[0, -0.8, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
          <div className={`px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap transition-all ${isSelected ? 'bg-white text-black scale-110' : 'bg-gray-900/60 text-gray-300'}`}>
            {data.name}
          </div>
        </Html>

        {/* Render Layer 2 Children (dApps) relative to this parachain */}
        {children}
      </group>
    </group>
  );
};

// --- Layer 2: dApps ---
const DAppNode = ({ 
  data, 
  index, 
  total,
  isSelected,
  onClick
}: { 
  data: NodeData; 
  index: number; 
  total: number;
  isSelected: boolean;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Orbital position around the parent parachain
  const orbitRadius = 1.5;
  const speed = 0.5;
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed;
      const offsetAngle = (index / total) * Math.PI * 2;
      const angle = time + offsetAngle;
      
      meshRef.current.position.x = Math.cos(angle) * orbitRadius;
      meshRef.current.position.z = Math.sin(angle) * orbitRadius;
      // Bob up and down slightly
      meshRef.current.position.y = 1 + Math.sin(time * 2) * 0.1;
    }
  });

  return (
    <group>
       {/* Connection from dApp to Parachain */}
       {meshRef.current && (
           <Line 
             points={[[0, 0.1, 0], [meshRef.current.position.x, meshRef.current.position.y, meshRef.current.position.z]]} 
             color="#aaa" 
             lineWidth={0.5} 
             transparent 
             opacity={0.2} 
           />
       )}

      <mesh 
        ref={meshRef} 
        onClick={onClick}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }} 
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color={isSelected ? 'white' : '#aaa'} wireframe={!isSelected} />
        
        {/* Hover/Selection Halo */}
        {(isSelected) && (
             <mesh scale={[1.2, 1.2, 1.2]}>
                 <sphereGeometry args={[0.2, 16, 16]} />
                 <meshBasicMaterial color={POLKADOT_PINK} transparent opacity={0.3} />
             </mesh>
        )}

        <Html position={[0, 0.4, 0]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
           <div className={`text-[8px] px-1 rounded ${isSelected ? 'bg-white text-black' : 'text-gray-400'}`}>
              {data.name}
           </div>
        </Html>
      </mesh>
    </group>
  );
};

// --- Main World Component ---
export const PolkadotWorld: React.FC<PolkadotWorldProps> = ({ 
  onSelectNode, 
  selectedId, 
  showLayer0, 
  showLayer1, 
  showLayer2 
}) => {
  
  const relayChainData = ECOSYSTEM_DATA.find(n => n.type === NodeType.RELAY_CHAIN)!;
  const parachains = ECOSYSTEM_DATA.filter(n => n.type === NodeType.PARACHAIN);
  const dApps = ECOSYSTEM_DATA.filter(n => n.type === NodeType.DAPP);

  const handleMiss = () => {
    onSelectNode(null);
  };

  return (
    <Canvas 
      camera={{ position: [0, 5, 12], fov: 45 }} 
      onPointerMissed={handleMiss}
      dpr={[1, 2]} // Optimize pixel ratio
    >
      <color attach="background" args={['#050205']} />
      
      {/* Lighting & Environment */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color={POLKADOT_PINK} />
      <pointLight position={[-10, -5, -10]} intensity={0.5} color="blue" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <fog attach="fog" args={['#050205', 10, 30]} />

      <OrbitControls 
        makeDefault 
        minPolarAngle={0} 
        maxPolarAngle={Math.PI / 1.5} 
        enablePan={true}
        zoomSpeed={0.5}
        rotateSpeed={0.5}
        maxDistance={25}
        minDistance={3}
      />

      {/* Layer 0: Relay Chain */}
      {showLayer0 && (
        <RelayChain 
          data={relayChainData} 
          isSelected={selectedId === relayChainData.id} 
          onClick={(e) => { e.stopPropagation(); onSelectNode(relayChainData.id); }} 
        />
      )}

      {/* Layer 1 & 2: Parachains & dApps */}
      {showLayer1 && parachains.map((pc, index) => {
         const chainDApps = dApps.filter(d => d.parentId === pc.id);
         
         return (
           <ParachainNode
             key={pc.id}
             data={pc}
             index={index}
             total={parachains.length}
             isSelected={selectedId === pc.id}
             onClick={(e) => { e.stopPropagation(); onSelectNode(pc.id); }}
           >
             {showLayer2 && chainDApps.map((dapp, dIndex) => (
                <DAppNode
                  key={dapp.id}
                  data={dapp}
                  index={dIndex}
                  total={chainDApps.length}
                  isSelected={selectedId === dapp.id}
                  onClick={(e) => { e.stopPropagation(); onSelectNode(dapp.id); }}
                />
             ))}
           </ParachainNode>
         );
      })}
    </Canvas>
  );
};