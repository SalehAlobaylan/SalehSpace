"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

export interface StarFieldProps {
  count?: number;
  opacity?: number;
  size?: number;
  spreadX?: number;
  spreadY?: number;
  spreadZ?: number;
  zOffset?: number;
  driftSpeed?: number;
  color?: number;
  className?: string;
}

export default function StarField({
  count = 80,
  opacity = 0.25,
  size = 0.035,
  spreadX = 28,
  spreadY = 16,
  spreadZ = 12,
  zOffset = -4,
  driftSpeed = 0.0004,
  color = 0xffb703,
  className = "absolute inset-0",
}: StarFieldProps) {
  const isMobile = useIsMobile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 6;

    const ptGeo = new THREE.BufferGeometry();
    const ptPos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      ptPos[i * 3] = (Math.random() - 0.5) * spreadX;
      ptPos[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      ptPos[i * 3 + 2] = (Math.random() - 0.5) * spreadZ + zOffset;
    }
    ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    const ptMat = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity,
      depthWrite: false,
    });
    const points = new THREE.Points(ptGeo, ptMat);
    scene.add(points);

    let lastW = 0;
    let lastH = 0;
    const resizeIfChanged = () => {
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      if (w === lastW && h === lastH) return;
      lastW = w;
      lastH = h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
    };
    resizeIfChanged();
    const ro = new ResizeObserver(resizeIfChanged);
    ro.observe(container);

    if (reducedMotion) {
      renderer.render(scene, camera);
      return () => {
        ro.disconnect();
        ptGeo.dispose();
        ptMat.dispose();
        renderer.dispose();
      };
    }

    let raf = 0;
    let running = true;
    let paused = document.hidden;

    const onVisibility = () => {
      paused = document.hidden;
      if (!paused && running && !raf) {
        raf = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    const halfY = spreadY / 2;
    const animate = () => {
      raf = 0;
      if (!running || paused) return;
      raf = requestAnimationFrame(animate);
      resizeIfChanged();
      const arr = ptGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += driftSpeed;
        if (arr[i * 3 + 1] > halfY) arr[i * 3 + 1] = -halfY;
      }
      ptGeo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    if (!paused) raf = requestAnimationFrame(animate);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      ptGeo.dispose();
      ptMat.dispose();
      renderer.dispose();
    };
  }, [count, opacity, size, spreadX, spreadY, spreadZ, zOffset, driftSpeed, color, isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
