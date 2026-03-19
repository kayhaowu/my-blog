"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Sphere } from "@react-three/drei";
import { Mesh } from "three";

function FloatingShape({ position, color, scale }: { position: [number, number, number]; color: string, scale: number }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <dodecahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={color}
          speed={1.5}
          distort={0.25}
          radius={1}
        />
      </mesh>
    </Float>
  );
}

export function ThreeHero() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="bg-gradient-to-b from-background to-muted/20">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <FloatingShape position={[-3, 1, -2]} color="#e2884d" scale={1.5} /> {/* Warm Copper */}
        <FloatingShape position={[3.5, -1, -3]} color="#6d9b78" scale={1.8} /> {/* Sage Green */}
        <FloatingShape position={[0, -2.5, -1]} color="#d4a574" scale={1.2} /> {/* Warm Gold */}
        <Environment preset="city" />
      </Canvas>
      <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
    </div>
  );
}
