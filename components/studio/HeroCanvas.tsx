import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VERT = /* glsl */ `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

// Domain-warped fbm "ember silk" field
const FRAG = /* glsl */ `
  precision highp float;

  uniform vec2 uRes;
  uniform float uTime;
  uniform vec2 uMouse;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.55;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p = rot * p * 2.02;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uRes.xy;
    vec2 p = uv;
    p.x *= uRes.x / uRes.y;

    float t = uTime * 0.055;
    vec2 drift = uMouse * 0.18;

    // domain warp
    vec2 q = vec2(
      fbm(p * 1.35 + t + drift),
      fbm(p * 1.35 - t * 0.7 + vec2(5.2, 1.3))
    );
    vec2 r = vec2(
      fbm(p * 1.35 + q * 1.9 + vec2(1.7, 9.2) + t * 0.35),
      fbm(p * 1.35 + q * 1.9 + vec2(8.3, 2.8) - t * 0.25)
    );
    float f = fbm(p * 1.35 + r * 1.65);

    // palette: near-black -> umber -> ember -> pale gold
    vec3 ink = vec3(0.055, 0.047, 0.035);
    vec3 umber = vec3(0.23, 0.12, 0.06);
    vec3 ember = vec3(1.0, 0.30, 0.07);
    vec3 gold = vec3(1.0, 0.78, 0.48);

    vec3 col = ink;
    col = mix(col, umber, smoothstep(0.18, 0.62, f));
    float ridge = smoothstep(0.45, 0.78, f) * smoothstep(0.95, 0.62, f);
    col = mix(col, ember * 0.85, ridge * (0.45 + 0.4 * length(q)));
    col = mix(col, gold, smoothstep(0.72, 0.95, f * length(r)) * 0.55);

    // vignette
    float vig = smoothstep(1.35, 0.35, length(uv - vec2(0.5, 0.42)));
    col *= mix(0.32, 1.0, vig);

    // subtle dithering to avoid banding
    col += (hash(gl_FragCoord.xy) - 0.5) * 0.012;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const HeroCanvas: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    wrap.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    scene.add(quad);

    const setSize = () => {
      const { clientWidth: w, clientHeight: h } = wrap;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(
        w * renderer.getPixelRatio(),
        h * renderer.getPixelRatio(),
      );
    };
    setSize();

    const mouseTarget = new THREE.Vector2(0, 0);
    const onPointer = (e: PointerEvent) => {
      mouseTarget.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('resize', setSize);

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0 },
    );
    io.observe(wrap);

    let raf = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.lerp(mouseTarget, 0.04);
      renderer.render(scene, camera);
    };

    if (reduceMotion) {
      // render a single static frame
      uniforms.uTime.value = 14;
      renderer.render(scene, camera);
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', setSize);
      quad.geometry.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === wrap) {
        wrap.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={wrapRef} className="hero__canvas" aria-hidden="true" />;
};

export default HeroCanvas;
