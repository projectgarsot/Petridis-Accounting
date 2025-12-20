
import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color, Vector2 } from 'three';
import { MotionValue } from 'framer-motion';

// Fragment Shader: Smooth liquid noise
const fragmentShader = `
uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;
uniform float uMix;
uniform vec2 uMouse;
varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = vUv;
    
    // Slow movement
    float time = uTime * 0.08;
    
    // Create liquid distortion layers
    float n1 = snoise(uv * 2.0 + time);
    float n2 = snoise(uv * 4.0 - time * 0.5);
    
    // Composite noise
    float noiseSum = (n1 * 0.6 + n2 * 0.3);
    
    // Determine Base Color Mix (Athens Aegean vs Filiatra Gold)
    vec3 baseColor = mix(uColorStart, uColorEnd, uMix);
    
    // Make the "Filiatra" end slightly darker to keep contrast high
    vec3 darkerBase = baseColor * 0.8;
    
    // Highlights
    vec3 highlight = baseColor + vec3(0.1, 0.1, 0.1);
    
    // Mix based on noise pattern
    float pattern = smoothstep(-0.4, 0.4, noiseSum);
    vec3 finalColor = mix(darkerBase, highlight, pattern);
    
    // Vignette
    float dist = distance(uv, vec2(0.5));
    finalColor *= (1.0 - dist * 0.6);

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

interface ShaderPlaneProps {
  scrollProgress: MotionValue<number>;
}

const ShaderPlane: React.FC<ShaderPlaneProps> = ({ scrollProgress }) => {
  const mesh = useRef<any>(null);
  
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorStart: { value: new Color("#2C5F7F") }, // Aegean Blue
      uColorEnd: { value: new Color("#556B2F") },   // Olive Green (Keeping the Greenish tone for background instead of pure Gold for better contrast)
      uMix: { value: 0 },
      uMouse: { value: new Vector2(0, 0) }
    }),
    []
  );

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
      const currentScroll = scrollProgress.get();
      mesh.current.material.uniforms.uMix.value = currentScroll;
      const targetX = (state.pointer.x * 0.5) + 0.5;
      const targetY = (state.pointer.y * 0.5) + 0.5;
      mesh.current.material.uniforms.uMouse.value.x += (targetX - mesh.current.material.uniforms.uMouse.value.x) * 0.05;
      mesh.current.material.uniforms.uMouse.value.y += (targetY - mesh.current.material.uniforms.uMouse.value.y) * 0.05;
    }
  });

  return (
    // Standard Three.js tags are typically recognized by @react-three/fiber environments if types are present
    <mesh ref={mesh} scale={[10, 10, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export const BackgroundShader: React.FC<{ scrollProgress: MotionValue<number> }> = ({ scrollProgress }) => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <ShaderPlane scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
