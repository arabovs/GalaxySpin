import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, Html } from "@react-three/drei";
import { useWindowSize } from "react-use";

const SPIN = "SPIN";
const STOP = "STOP";

const Model = ({ url, scale, onFinish, handleStatus }) => {
  const ref = useRef();
  const { scene } = useLoader(GLTFLoader, url);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [buttonMessage, setButtonMessage] = useState(SPIN);

  const handleButtonClick = () => {
    setIsSpinning(!isSpinning);
    if (isSpinning) {
      setButtonMessage(SPIN);
    } else {
      setIsButtonEnabled(false);
      setButtonMessage("3...");
      setTimeout(() => {
        setButtonMessage("2...");
        setTimeout(() => {
          setButtonMessage("1...");
          setTimeout(() => {
            setButtonMessage(STOP);
          }, 1000);
          setIsButtonEnabled(true);
        }, 1000);
      }, 1000);
    }
    setHasFinished(false);
  };

  useFrame(({ clock }) => {
    if (isSpinning) {
      ref.current.rotation.x += 0.015;
      ref.current.rotation.y += 0.015;
      ref.current.rotation.z += 0.015;
    } else if (!hasFinished) {
      const totalRotationTime = 3000;
      const elapsedTime = clock.getElapsedTime() * 1000;

      if (elapsedTime >= totalRotationTime) {
        setHasFinished(true);

        const { x, y, z } = ref.current.rotation;

        const latitude = Math.asin(Math.sin(y)) * (180 / Math.PI);
        const longitude =
          Math.atan2(Math.sin(x), Math.cos(x)) * (180 / Math.PI);

        handleStatus("Good luck!");
        onFinish(latitude, longitude);
      }
    }
  });

  return (
    <>
      <primitive object={scene} ref={ref} scale={scale} dispose={null} />
      <Html
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className="animate-bounce text-2xl font-bold px-6 py-3 leading-none text-gray-200 border border-white-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-br from-gray-900 to-black hover:from-gray-800 hover:to-gray-700"
            style={{
              fontSize: 18,
              backgroundColor: "transparent",
              border: "white solid 1px",
              borderRadius: 12,
              backgroundColor: "black",
              position: "absolute",

              width: "160px",
              marginLeft: -80,
              marginBottom: 20,
              top: "50%", // Center vertically
              left: "50%", // Center horizontally
            }}
            disabled={!isButtonEnabled}
            onClick={handleButtonClick}
          >
            {buttonMessage}{" "}
          </button>
        </div>
      </Html>
    </>
  );
};

const ModelComponent = ({ url }) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [status, setStatus] = useState("Spinning...");

  const handleStatus = (status) => {
    setStatus(status);
  };

  const handleFinish = (latitude, longitude) => {
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const { width } = useWindowSize();
  const [canvasSize, setCanvasSize] = useState({
    width: "600px",
    height: "600px",
  });

  useEffect(() => {
    if (width < 640) {
      setCanvasSize({ width: "300px", height: "300px" });
    } else {
      setCanvasSize({ width: "600px", height: "600px" });
    }
  }, [width]);

  const { width: canvasWidth, height: canvasHeight } = canvasSize;
  const scale = [1, 1, 1];

  const handleRefresh = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const [key, setKey] = useState(0);

  return (
    <div style={{ position: "relative" }}>
      <Canvas
        key={key}
        style={{ width: canvasWidth, height: canvasHeight }}
        camera={{ position: [-1, -7.5, 0] }}
      >
        <directionalLight position={[10, 2, 5]} intensity={8} />
        <directionalLight position={[-10, -10, -5]} intensity={5} />
        <directionalLight position={[0, 0, 0]} intensity={5} />

        <Suspense fallback={<Html>loading..</Html>}>
          <Model
            url={url}
            scale={scale}
            onFinish={handleFinish}
            handleStatus={handleStatus}
          />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
      <h1>Your Score:</h1>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "OCR-A, monospace",
          pointerEvents: "none",
          border: "1px solid white",
          borderRadius: 8,
          backgroundColor: "transparent",
          padding: 10,
        }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div
          style={{
            width: "50%",
            justifyContent: "space-between",
          }}
          className="md:w-1/2 flex flex-col md:flex-row"
        >
          <div className="">
            <h1
              className="text-xs font-bold sm:text-base md:text-lg lg:text-xl"
              style={{ fontSize: 18 }}
            >
              Lat: <span style={{ fontSize: 16 }}>{latitude.toFixed(2)}</span>
            </h1>
          </div>
          <div>
            <h1
              className="text-xs font-bold sm:text-base md:text-lg lg:text-xl"
              style={{ fontSize: 18 }}
            >
              Lon: <span style={{ fontSize: 16 }}>{longitude.toFixed(2)}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelComponent;
