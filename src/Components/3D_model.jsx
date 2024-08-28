import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const Earth = () => {
  const mesh = useRef();
  const gltf = useLoader(GLTFLoader, "./images/earth.glb");

  const [rotationY, setRotationY] = useState(0.3);
  const [scale, setScale] = useState([0.2, 0.2, 0.2]);
  const [rotation, setRotation] = useState([0, 0, 0]);

  const [scrollScale, setScrollScale] = useState([1, 1, 1]);
  const [scrollRotationY, setScrollRotationY] = useState(0);

  const mixer = new THREE.AnimationMixer(gltf.scene);

  const rotationYRef = useRef(rotationY);
  const scaleRef = useRef(scale);
  const rotationRef = useRef(rotation);

  useEffect(() => {
    rotationYRef.current = rotationY;
    scaleRef.current = scale;
    rotationRef.current = rotation;
  }, [rotationY, scale, rotation]);

  useEffect(() => {
    const getFinalScale = () => {
      if (window.innerWidth < 500) {
        return [0.25, 0.25, 0.25];
      } else if (window.innerWidth < 700) {
        return [0.3, 0.3, 0.3];
      } else if (window.innerWidth < 1200) {
        return [0.45, 0.45, 0.45];
      } else {
        return [0.51, 0.51, 0.51];
      }
    };

    let animationFrameId;
    const startTime = Date.now();
    const duration = 80000;

    const animateStateChanges = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const finalRotationY = 0;
      const finalScale = getFinalScale();
      const finalRotation = [0.4, -4.6, 0];

      const newRotationY = rotationYRef.current * (1 - progress);
      const newScale = [
        scaleRef.current[0] + (finalScale[0] - scaleRef.current[0]) * progress,
        scaleRef.current[1] + (finalScale[1] - scaleRef.current[1]) * progress,
        scaleRef.current[2] + (finalScale[2] - scaleRef.current[2]) * progress,
      ];
      const newRotation = [
        rotationRef.current[0] +
          (finalRotation[0] - rotationRef.current[0]) * progress,
        rotationRef.current[1] +
          (finalRotation[1] - rotationRef.current[1]) * progress,
        rotationRef.current[2],
      ];

      setRotationY(newRotationY);
      setScale(newScale);
      setRotation(newRotation);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateStateChanges);
      }
    };

    animationFrameId = requestAnimationFrame(animateStateChanges);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;

      const progress = Math.min(scrollY / maxScroll, 1);

      const newScrollScale = [
        1 - 0.2 * progress,
        1 - 0.2 * progress,
        1 - 0.2 * progress,
      ];

      const newScrollRotationY = progress * Math.PI * 0.3;

      setScrollScale(newScrollScale);
      setScrollRotationY(newScrollRotationY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y = rotation[1] + scrollRotationY;
      mesh.current.rotation.x = rotation[0];
      mesh.current.rotation.z = rotation[2];
      mesh.current.scale.set(
        scale[0] * scrollScale[0],
        scale[1] * scrollScale[1],
        scale[2] * scrollScale[2]
      );
    }
    mixer.update(delta);
  });

  return (
    <mesh ref={mesh} rotation={rotation}>
      <primitive object={gltf.scene} />
    </mesh>
  );
};

export default Earth;
