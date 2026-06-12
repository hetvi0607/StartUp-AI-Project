"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars, Text } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Group, Mesh } from "three";

function Core() {
  const mesh = useRef<Mesh>(null);
  const ring = useRef<Group>(null);

  useFrame(({ mouse, clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.elapsedTime * 0.35 + mouse.y * 0.35;
      mesh.current.rotation.y = clock.elapsedTime * 0.55 + mouse.x * 0.55;
    }
    if (ring.current) ring.current.rotation.z = clock.elapsedTime * 0.25;
  });

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.25, 3]} />
        <meshStandardMaterial color="#06B6D4" emissive="#3B82F6" emissiveIntensity={0.8} roughness={0.18} metalness={0.65} />
      </mesh>
      <group ref={ring}>
        {[0, 1, 2].map((index) => (
          <mesh key={index} rotation={[Math.PI / (2 + index), Math.PI / (3 + index), 0]}>
            <torusGeometry args={[1.8 + index * 0.34, 0.01, 16, 160]} />
            <meshBasicMaterial color={index === 1 ? "#8B5CF6" : "#3B82F6"} transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function OrbitingCards() {
  const group = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.elapsedTime * 0.22;
  });

  const labels = ["Ideas", "Teams", "Capital", "AI"];
  return (
    <group ref={group}>
      {labels.map((label, index) => {
        const angle = (index / labels.length) * Math.PI * 2;
        return (
          <Float key={label} speed={2} floatIntensity={0.35}>
            <group position={[Math.cos(angle) * 3.1, index % 2 ? 0.85 : -0.65, Math.sin(angle) * 3.1]}>
              <mesh>
                <boxGeometry args={[1.25, 0.62, 0.05]} />
                <meshStandardMaterial color="#0B1120" emissive="#111827" roughness={0.2} metalness={0.35} />
              </mesh>
              <Text position={[0, 0, 0.04]} fontSize={0.16} color="#e5edf8" anchorX="center" anchorY="middle">
                {label}
              </Text>
            </group>
          </Float>
        );
      })}
    </group>
  );
}

export function AICoreScene() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-lg border border-border bg-primary/50 shadow-glow md:h-[560px]">
      <Canvas camera={{ position: [0, 0, 7], fov: 48 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[4, 4, 4]} intensity={38} color="#3B82F6" />
          <pointLight position={[-4, -2, 3]} intensity={18} color="#8B5CF6" />
          <Stars radius={60} depth={30} count={1600} factor={4} fade speed={0.75} />
          <Core />
          <OrbitingCards />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export function MiniGalaxy() {
  return (
    <div className="h-64 overflow-hidden rounded-lg border border-border bg-slate-950/70">
      <Canvas camera={{ position: [0, 0, 6], fov: 52 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 3, 3]} intensity={24} color="#06B6D4" />
        <Stars radius={40} depth={24} count={900} factor={3} fade speed={1.1} />
        <Float>
          <mesh>
            <sphereGeometry args={[1.35, 48, 48]} />
            <meshStandardMaterial color="#0B1120" emissive="#8B5CF6" emissiveIntensity={0.35} wireframe />
          </mesh>
        </Float>
      </Canvas>
    </div>
  );
}
