"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ShootingStar = {
  group: THREE.Group;
  trail: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  head: THREE.Sprite;
  trailMaterial: THREE.MeshBasicMaterial;
  headMaterial: THREE.SpriteMaterial;
  velocity: THREE.Vector3;
  age: number;
  life: number;
  peakOpacity: number;
};

function createRadialTexture(stops: Array<[number, string]>) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
  stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createTrailTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 80;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createLinearGradient(0, 40, 768, 40);
  gradient.addColorStop(0, "rgba(120,180,255,0)");
  gradient.addColorStop(0.5, "rgba(130,198,255,0.16)");
  gradient.addColorStop(0.82, "rgba(205,232,255,0.44)");
  gradient.addColorStop(1, "rgba(255,255,255,0.94)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 768, 80);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function randomRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function PremiumSpaceBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const shootingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backgroundHost = backgroundRef.current;
    const shootingHost = shootingRef.current;
    if (!backgroundHost || !shootingHost) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      58,
      backgroundHost.clientWidth / backgroundHost.clientHeight,
      0.1,
      130,
    );
    camera.position.set(0, 0, 13);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !window.matchMedia("(max-width: 640px)").matches,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, backgroundHost.clientWidth < 768 ? 1.25 : 1.55),
    );
    renderer.setSize(backgroundHost.clientWidth, backgroundHost.clientHeight);
    backgroundHost.appendChild(renderer.domElement);

    const shootingScene = new THREE.Scene();
    const shootingCamera = new THREE.OrthographicCamera(
      -shootingHost.clientWidth / 2,
      shootingHost.clientWidth / 2,
      shootingHost.clientHeight / 2,
      -shootingHost.clientHeight / 2,
      0.1,
      10,
    );
    shootingCamera.position.z = 5;
    const shootingRenderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    shootingRenderer.outputColorSpace = THREE.SRGBColorSpace;
    shootingRenderer.setClearColor(0x000000, 0);
    shootingRenderer.setPixelRatio(
      Math.min(window.devicePixelRatio, shootingHost.clientWidth < 768 ? 1.2 : 1.45),
    );
    shootingRenderer.setSize(shootingHost.clientWidth, shootingHost.clientHeight);
    shootingHost.appendChild(shootingRenderer.domElement);

    const starCount = backgroundHost.clientWidth < 768 ? 620 : 1080;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const color = new THREE.Color();

    for (let index = 0; index < starCount; index += 1) {
      const radius = randomRange(18, 74);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const offset = index * 3;

      starPositions[offset] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[offset + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.48;
      starPositions[offset + 2] = radius * Math.cos(phi);

      color.setHSL(randomRange(0.55, 0.62), randomRange(0.18, 0.48), randomRange(0.72, 0.96));
      starColors[offset] = color.r;
      starColors[offset + 1] = color.g;
      starColors[offset + 2] = color.b;
    }

    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: backgroundHost.clientWidth < 768 ? 0.035 : 0.045,
      transparent: true,
      opacity: 0.58,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const dustCount = backgroundHost.clientWidth < 768 ? 130 : 230;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let index = 0; index < dustCount; index += 1) {
      const offset = index * 3;
      dustPositions[offset] = randomRange(-22, 22);
      dustPositions[offset + 1] = randomRange(-10, 10);
      dustPositions[offset + 2] = randomRange(-24, 12);
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: "#85bdff",
      size: 0.085,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    const nebulaTextures = [
      createRadialTexture([
        [0, "rgba(255,255,255,0.2)"],
        [0.24, "rgba(104,166,255,0.34)"],
        [0.54, "rgba(94,72,255,0.13)"],
        [1, "rgba(0,0,0,0)"],
      ]),
      createRadialTexture([
        [0, "rgba(220,247,255,0.15)"],
        [0.36, "rgba(77,214,255,0.2)"],
        [0.72, "rgba(151,104,255,0.08)"],
        [1, "rgba(0,0,0,0)"],
      ]),
    ].filter((texture): texture is THREE.CanvasTexture => Boolean(texture));

    const nebulas = nebulaTextures.map((texture, index) => {
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: index === 0 ? 0.32 : 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(index === 0 ? -5.8 : 6.2, index === 0 ? 2.1 : -2.4, -15 - index * 2);
      sprite.scale.set(index === 0 ? 15 : 18, index === 0 ? 9 : 10, 1);
      scene.add(sprite);
      return { sprite, material };
    });

    const ambientLight = new THREE.AmbientLight("#b8ddff", 0.42);
    const pointLight = new THREE.PointLight("#d9efff", 1.45, 28);
    pointLight.position.set(4, 2, 4);
    scene.add(ambientLight, pointLight);

    const solarGroup = new THREE.Group();
    solarGroup.position.set(4.7, -1.15, -5.8);
    solarGroup.rotation.set(-0.3, 0.18, -0.12);
    scene.add(solarGroup);

    const sunGlowTexture = createRadialTexture([
      [0, "rgba(255,255,255,0.96)"],
      [0.16, "rgba(194,225,255,0.64)"],
      [0.48, "rgba(76,150,255,0.18)"],
      [1, "rgba(0,0,0,0)"],
    ]);
    const sunGlowMaterial = new THREE.SpriteMaterial({
      map: sunGlowTexture,
      transparent: true,
      opacity: 0.36,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sunGlow = new THREE.Sprite(sunGlowMaterial);
    sunGlow.scale.set(2.4, 2.4, 1);
    solarGroup.add(sunGlow);

    const sunGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: "#eff8ff",
      transparent: true,
      opacity: 0.88,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    solarGroup.add(sun);

    const orbitGeometry = new THREE.TorusGeometry(1, 0.003, 6, 96);
    const planetGeometry = new THREE.SphereGeometry(1, 24, 24);
    const planetConfigs = [
      { radius: 0.92, size: 0.05, speed: 0.34, color: "#ffffff", offset: 0.8 },
      { radius: 1.45, size: 0.075, speed: 0.22, color: "#80c7ff", offset: 2.1 },
      { radius: 2.05, size: 0.1, speed: 0.15, color: "#9fbcff", offset: 4.4 },
    ];

    const planets = planetConfigs.map((config) => {
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: "#b7dfff",
        transparent: true,
        opacity: 0.13,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.scale.setScalar(config.radius);
      orbit.rotation.x = Math.PI / 2;
      solarGroup.add(orbit);

      const planetMaterial = new THREE.MeshStandardMaterial({
        color: config.color,
        emissive: config.color,
        emissiveIntensity: 0.18,
        roughness: 0.58,
        metalness: 0.06,
      });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.scale.setScalar(config.size);
      solarGroup.add(planet);

      return { ...config, orbitMaterial, planetMaterial, planet };
    });

    const trailTexture = createTrailTexture();
    const headTexture = createRadialTexture([
      [0, "rgba(255,255,255,1)"],
      [0.2, "rgba(190,226,255,0.82)"],
      [0.58, "rgba(95,172,255,0.22)"],
      [1, "rgba(0,0,0,0)"],
    ]);
    const trailGeometry = new THREE.PlaneGeometry(1, 1);
    const shootingStars: ShootingStar[] = [];
    let nextSpawn = reducedMotion ? Number.POSITIVE_INFINITY : 0.7;

    const spawnShootingStar = () => {
      if (!trailTexture || !headTexture || shootingStars.length > 3) return;

      const width = shootingHost.clientWidth;
      const height = shootingHost.clientHeight;
      const halfWidth = width / 2;
      const halfHeight = height / 2;
      const margin = Math.max(width, height) * 0.08 + 80;
      const side = Math.floor(Math.random() * 4);
      const start = new THREE.Vector3(0, 0, 0);
      const target = new THREE.Vector3(
        randomRange(-halfWidth * 0.72, halfWidth * 0.72),
        randomRange(-halfHeight * 0.72, halfHeight * 0.72),
        0,
      );

      if (side === 0) {
        start.set(randomRange(-halfWidth, halfWidth), halfHeight + margin, 0);
        target.y = randomRange(-halfHeight * 0.72, halfHeight * 0.18);
      } else if (side === 1) {
        start.set(halfWidth + margin, randomRange(-halfHeight, halfHeight), 0);
        target.x = randomRange(-halfWidth * 0.72, halfWidth * 0.2);
      } else if (side === 2) {
        start.set(randomRange(-halfWidth, halfWidth), -halfHeight - margin, 0);
        target.y = randomRange(-halfHeight * 0.18, halfHeight * 0.72);
      } else {
        start.set(-halfWidth - margin, randomRange(-halfHeight, halfHeight), 0);
        target.x = randomRange(-halfWidth * 0.2, halfWidth * 0.72);
      }

      const direction = target.sub(start).normalize();

      const speed = randomRange(620, 940);
      const length = THREE.MathUtils.clamp(width * randomRange(0.14, 0.22), 145, 330);
      const trailMaterial = new THREE.MeshBasicMaterial({
        map: trailTexture,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const headMaterial = new THREE.SpriteMaterial({
        map: headTexture,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const group = new THREE.Group();
      group.position.copy(start);
      group.rotation.z = Math.atan2(direction.y, direction.x);

      const trail = new THREE.Mesh(trailGeometry, trailMaterial);
      trail.position.x = -length * 0.5;
      trail.scale.set(length, randomRange(8, 13), 1);
      const head = new THREE.Sprite(headMaterial);
      head.scale.setScalar(randomRange(24, 34));

      group.add(trail, head);
      shootingScene.add(group);
      shootingStars.push({
        group,
        trail,
        head,
        trailMaterial,
        headMaterial,
        velocity: direction.multiplyScalar(speed),
        age: 0,
        life: randomRange(1.55, 2.35),
        peakOpacity: randomRange(0.56, 0.82),
      });
    };

    const pointer = new THREE.Vector2(0, 0);
    const targetPointer = new THREE.Vector2(0, 0);
    const handlePointerMove = (event: PointerEvent) => {
      targetPointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      targetPointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const renderStaticFrame = () => {
      renderer.render(scene, camera);
    };

    let frame = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const delta = Math.min(clock.getDelta(), 0.034);

      pointer.lerp(targetPointer, 0.025);
      camera.position.x = pointer.x * 0.24;
      camera.position.y = -pointer.y * 0.16 + Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.6) * 0.11;
      camera.lookAt(0, 0, 0);

      stars.rotation.y = elapsed * 0.018;
      stars.rotation.x = Math.sin(elapsed * 0.08) * 0.022;
      starMaterial.opacity = 0.5 + Math.sin(elapsed * 0.42) * 0.07;
      dust.rotation.y = -elapsed * 0.012;
      dust.rotation.z = Math.sin(elapsed * 0.07) * 0.035;
      dustMaterial.opacity = 0.08 + Math.sin(elapsed * 0.28) * 0.025;
      nebulas.forEach(({ sprite, material }, index) => {
        sprite.material.rotation = elapsed * (index === 0 ? 0.009 : -0.006);
        material.opacity = (index === 0 ? 0.27 : 0.18) + Math.sin(elapsed * 0.18 + index) * 0.035;
      });
      solarGroup.rotation.y = 0.18 + elapsed * 0.025;
      sunGlow.scale.setScalar(2.35 + Math.sin(elapsed * 0.8) * 0.08);
      planets.forEach((config) => {
        const angle = elapsed * config.speed + config.offset;
        config.planet.position.set(
          Math.cos(angle) * config.radius,
          Math.sin(angle * 0.85) * 0.035,
          Math.sin(angle) * config.radius,
        );
        config.planet.rotation.y += 0.006;
      });

      if (elapsed >= nextSpawn) {
        spawnShootingStar();
        nextSpawn = elapsed + 2;
      }

      for (let index = shootingStars.length - 1; index >= 0; index -= 1) {
        const star = shootingStars[index];
        star.age += delta;
        const progress = star.age / star.life;
        const fade = Math.sin(Math.min(progress, 1) * Math.PI);
        star.group.position.addScaledVector(star.velocity, delta);
        star.trailMaterial.opacity = fade * star.peakOpacity;
        star.headMaterial.opacity = fade * Math.min(star.peakOpacity + 0.24, 0.86);
        star.head.scale.setScalar(22 + fade * 14);
        star.trail.scale.y = 7 + fade * 8;

        if (progress >= 1) {
          shootingScene.remove(star.group);
          star.group.remove(star.trail, star.head);
          star.trailMaterial.dispose();
          star.headMaterial.dispose();
          shootingStars.splice(index, 1);
        }
      }

      renderer.render(scene, camera);
      shootingRenderer.render(shootingScene, shootingCamera);
      frame = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
      camera.aspect = backgroundHost.clientWidth / backgroundHost.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(
        Math.min(window.devicePixelRatio, backgroundHost.clientWidth < 768 ? 1.25 : 1.55),
      );
      renderer.setSize(backgroundHost.clientWidth, backgroundHost.clientHeight);

      shootingCamera.left = -shootingHost.clientWidth / 2;
      shootingCamera.right = shootingHost.clientWidth / 2;
      shootingCamera.top = shootingHost.clientHeight / 2;
      shootingCamera.bottom = -shootingHost.clientHeight / 2;
      shootingCamera.updateProjectionMatrix();
      shootingRenderer.setPixelRatio(
        Math.min(window.devicePixelRatio, shootingHost.clientWidth < 768 ? 1.2 : 1.45),
      );
      shootingRenderer.setSize(shootingHost.clientWidth, shootingHost.clientHeight);
      if (reducedMotion) renderStaticFrame();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    if (reducedMotion) {
      stars.rotation.y = 0.08;
      dust.rotation.z = 0.03;
      renderStaticFrame();
    } else {
      animate();
    }

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);

      shootingStars.forEach((star) => {
        shootingScene.remove(star.group);
        star.trailMaterial.dispose();
        star.headMaterial.dispose();
      });
      starGeometry.dispose();
      starMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      nebulaTextures.forEach((texture) => texture.dispose());
      nebulas.forEach(({ material }) => material.dispose());
      sunGlowMaterial.dispose();
      sunGlowTexture?.dispose();
      sunGeometry.dispose();
      sunMaterial.dispose();
      orbitGeometry.dispose();
      planetGeometry.dispose();
      planets.forEach(({ orbitMaterial, planetMaterial }) => {
        orbitMaterial.dispose();
        planetMaterial.dispose();
      });
      trailTexture?.dispose();
      headTexture?.dispose();
      trailGeometry.dispose();
      renderer.dispose();
      shootingRenderer.dispose();
      if (renderer.domElement.parentElement === backgroundHost) {
        backgroundHost.removeChild(renderer.domElement);
      }
      if (shootingRenderer.domElement.parentElement === shootingHost) {
        shootingHost.removeChild(shootingRenderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[4] overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(96,148,255,0.22),transparent_30rem),radial-gradient(circle_at_76%_18%,rgba(164,196,255,0.16),transparent_26rem),linear-gradient(180deg,rgba(1,2,9,0.18),rgba(1,2,9,0.72))]" />
        <div ref={backgroundRef} className="absolute inset-0 opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.08),transparent_42%),linear-gradient(90deg,rgba(1,2,9,0.34),transparent_32%,transparent_68%,rgba(1,2,9,0.38))]" />
      </div>
      <div ref={shootingRef} className="pointer-events-none fixed inset-0 z-[60]" aria-hidden="true" />
    </>
  );
}
