"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function createNebulaTexture(primary: string, secondary: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createRadialGradient(256, 256, 20, 256, 256, 250);
  gradient.addColorStop(0, primary);
  gradient.addColorStop(0.36, secondary);
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 512);

  return new THREE.CanvasTexture(canvas);
}

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

    const starCount = 2300;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const color = new THREE.Color();

    for (let i = 0; i < starCount; i += 1) {
      const radius = 18 + Math.random() * 72;
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

    const ambientLight = new THREE.AmbientLight("#8fc9ff", 0.45);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight("#ffd17c", 2.2, 36);
    pointLight.position.set(-5.5, 1.2, 1.5);
    scene.add(pointLight);

    const solarGroup = new THREE.Group();
    solarGroup.position.set(-4.8, -0.6, -4.5);
    solarGroup.rotation.x = -0.18;
    scene.add(solarGroup);

    const sunGeometry = new THREE.SphereGeometry(0.82, 40, 40);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: "#ffd98f",
      transparent: true,
      opacity: 0.92,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    solarGroup.add(sun);

    const planetGeometry = new THREE.SphereGeometry(1, 28, 28);
    const orbitGeometry = new THREE.TorusGeometry(1, 0.006, 8, 140);
    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: "#9fd2ff",
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const planetConfigs = [
      { radius: 1.55, size: 0.12, speed: 0.62, color: "#78ddff", offset: 0.2 },
      { radius: 2.35, size: 0.2, speed: 0.38, color: "#a67cff", offset: 1.6 },
      { radius: 3.2, size: 0.25, speed: 0.27, color: "#54ffd3", offset: 2.7 },
      { radius: 4.15, size: 0.18, speed: 0.18, color: "#ffb978", offset: 4.1 },
    ];

    const planets = planetConfigs.map((config) => {
      const planetMaterial = new THREE.MeshStandardMaterial({
        color: config.color,
        emissive: config.color,
        emissiveIntensity: 0.34,
        roughness: 0.42,
        metalness: 0.05,
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.scale.setScalar(config.size);
      solarGroup.add(planet);

      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial.clone());
      orbit.scale.set(config.radius, config.radius, config.radius);
      orbit.rotation.x = Math.PI / 2;
      solarGroup.add(orbit);

      return { planet, planetMaterial, orbit, orbitMaterial: orbit.material, ...config };
    });

    const nebulaTextures = [
      createNebulaTexture("rgba(101, 165, 255, 0.42)", "rgba(131, 83, 255, 0.18)"),
      createNebulaTexture("rgba(80, 255, 218, 0.24)", "rgba(69, 163, 255, 0.14)"),
    ].filter((texture): texture is THREE.CanvasTexture => Boolean(texture));

    const nebulas = nebulaTextures.map((texture, index) => {
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: index === 0 ? 0.52 : 0.34,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(index === 0 ? 4.5 : -8, index === 0 ? 1.8 : -2.6, -14 - index * 3);
      sprite.scale.set(index === 0 ? 14 : 18, index === 0 ? 8 : 10, 1);
      scene.add(sprite);
      return { sprite, material };
    });

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
      solarGroup.rotation.y = elapsed * 0.045;
      sun.scale.setScalar(1 + Math.sin(elapsed * 1.4) * 0.045);
      planets.forEach((config) => {
        const angle = elapsed * config.speed + config.offset;
        config.planet.position.set(
          Math.cos(angle) * config.radius,
          Math.sin(angle * 0.7) * 0.12,
          Math.sin(angle) * config.radius,
        );
        config.planet.rotation.y += 0.012;
      });
      nebulas.forEach(({ sprite, material }, index) => {
        sprite.material.rotation = elapsed * (index === 0 ? 0.015 : -0.012);
        material.opacity = (index === 0 ? 0.42 : 0.28) + Math.sin(elapsed * 0.25 + index) * 0.08;
      });
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
      sunGeometry.dispose();
      sunMaterial.dispose();
      planetGeometry.dispose();
      orbitGeometry.dispose();
      orbitMaterial.dispose();
      planets.forEach(({ planetMaterial, orbitMaterial }) => {
        planetMaterial.dispose();
        orbitMaterial.dispose();
      });
      nebulas.forEach(({ material }) => material.dispose());
      nebulaTextures.forEach((texture) => texture.dispose());
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
