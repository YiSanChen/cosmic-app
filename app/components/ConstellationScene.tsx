"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Sphere, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { getConstellationData, ConstellationData } from '../constellationData';

// --- 子組件：會生長的連線 ---
const AnimatedLine = ({ start, end }: { start: [number, number, number], end: [number, number, number] }) => {
  const [currentEnd, setCurrentEnd] = useState(new THREE.Vector3(...start));
  const progress = useRef(0); // 動畫進度 0 -> 1

  useFrame((state, delta) => {
    // 控制動畫速度，這裡設為 1.5 秒完成
    if (progress.current < 1) {
      progress.current += delta * 1.5; 
      if (progress.current > 1) progress.current = 1;

      // 數學插值 (Lerp)：計算從起點到終點目前應該在哪裡
      const vStart = new THREE.Vector3(...start);
      const vEnd = new THREE.Vector3(...end);
      const vCurrent = vStart.lerp(vEnd, progress.current);
      setCurrentEnd(vCurrent);
    }
  });

  return (
    <Line
      points={[start, currentEnd]} // R3F 的 Line 接受點陣列
      color="#22d3ee"              // Cyan 青色
      lineWidth={2}
      transparent
      opacity={0.6}
    />
  );
};

// --- 子組件：主星座邏輯 ---
const ConstellationGroup = ({ activeSignName }: { activeSignName: string }) => {
  // 取得當前星座數據
  const data = useMemo(() => getConstellationData(activeSignName), [activeSignName]);

  return (
    <group key={activeSignName}> {/* key 改變時，React 會重新掛載整個 group，自動觸發動畫重置 */}
      
      {/* 1. 繪製星星 */}
      {data.stars.map((star, idx) => (
        <mesh key={`star-${idx}`} position={star.position}>
          <sphereGeometry args={[star.size, 16, 16]} />
          <meshStandardMaterial 
            color="#fff" 
            emissive="#22d3ee" // 發光顏色
            emissiveIntensity={2} // 發光強度
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* 2. 繪製連線 (帶動畫) */}
      {data.connections.map((conn, idx) => {
        const start = data.stars[conn[0]].position;
        const end = data.stars[conn[1]].position;
        return <AnimatedLine key={`line-${idx}`} start={start} end={end} />;
      })}
    </group>
  );
};

// --- 主組件：場景設定 ---
export default function ConstellationScene({ activeSignName }: { activeSignName: string }) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        {/* 環境光源 */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        {/* 背景星星 (遠景) - 使用 drei 的現成組件增加層次感 */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* 星座主體 */}
        <ConstellationGroup activeSignName={activeSignName} />

        {/* 互動控制：允許旋轉，但在一定角度內，禁用縮放以保持體驗 */}
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}