"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackground() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      68,
      host.clientWidth / host.clientHeight,
      0.1,
      160,
    );
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(host.clientWidth, host.clientHeight);
    host.appendChild(renderer.domElement);

    const starCount = 1450;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const color = new THREE.Color();

    for (let i = 0; i < starCount; i += 1) {
      const radius = 18 + Math.random() * 58;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55;
      starPositions[i * 3 + 2] = radius * Math.cos(phi);

      color.setHSL(0.57 + Math.random() * 0.14, 0.55, 0.68 + Math.random() * 0.25);
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.045,
      transparent: true,
      opacity: 0.68,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const dustGeometry = new THREE.BufferGeometry();
    const dustCount = 280;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i += 1) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 42;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 34;
    }
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: "#6aa7ff",
      size: 0.11,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    let frame = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      stars.rotation.y += 0.00042;
      stars.rotation.x = Math.sin(elapsed * 0.08) * 0.05;
      dust.rotation.y -= 0.00022;
      dust.rotation.z = Math.sin(elapsed * 0.06) * 0.04;
      starMaterial.opacity = 0.5 + Math.sin(elapsed * 0.7) * 0.16;
      dustMaterial.opacity = 0.1 + Math.sin(elapsed * 0.42) * 0.04;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      starGeometry.dispose();
      starMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-90"
      aria-hidden="true"
    />
  );
}
