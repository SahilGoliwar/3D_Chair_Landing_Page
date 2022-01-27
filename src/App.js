import React, { Suspense, useEffect, useRef } from "react";
import "./App.scss";
//Components
import Header from "./components/header";
import { Canvas, useFrame } from "react-three-fiber";
import { Html, useGLTFLoader } from "drei";
import { Section } from "./components/section";
import state from "./components/state";

//intersection observer
import { useInView } from "react-intersection-observer";

const Model = ({ modelPath }) => {
  const gltf = useGLTFLoader(modelPath, true);
  return <primitive object={gltf.scene} dispose={null} />;
};

const Lights = () => {
  //productLightings
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[0, 10, 0]} intensity={1.5} />
      <spotLight intensity={1} position={[1000, 0, 0]} />
    </>
  );
};

const HTMLContent = ({
  bgColor,
  domContent,
  children,
  modelPath,
  positionY,
}) => {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.01));
  const [refItem, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    inView && (document.body.style.background = bgColor);
  }, [inView]);

  return (
    <Section factor={1.5} offset={1}>
      <group position={[0, positionY, 0]}>
        <mesh ref={ref} position={[0, -35, -50]}>
          <Model modelPath={modelPath} />
        </mesh>
        <Html portal={domContent} fullscreen>
          <div className="container" ref={refItem}>
            {children}
          </div>
        </Html>
      </group>
    </Section>
  );
};

export default function App() {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);

  return (
    <>
      <Header />
      <Canvas colorManagement camera={{ position: [0, 0, 120], fov: 70 }}>
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent
            domContent={domContent}
            modelPath="/OchreYellow.gltf"
            positionY={250}
            bgColor={"#305f72"}
          >
            <h1 className="title">
              A New 3D Experience of buying Online Chairs{" "}
            </h1>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath="/PineGreen.gltf"
            positionY={0}
            bgColor={"#682d63"}
          >
            <h1 className="title">Yes, We got different colours.</h1>
          </HTMLContent>
          <HTMLContent
            domContent={domContent}
            modelPath="/DiegoGrey.gltf"
            positionY={-250}
            bgColor={"#1e2425"}
          >
            <h1 className="title">
              And we have Various Types of chairs Available.
            </h1>
          </HTMLContent>
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: "sticky", top: 0 }} ref={domContent}></div>
        <div style={{ height: `${state.sections * 100}vh` }}></div>
      </div>
    </>
  );
}
