import { Html, useProgress } from "@react-three/drei";

export default function CanvasLoader () {
  const { progress } = useProgress();
  const  style={
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
  const loaderStyle={
    fontSize: 14,
    color: "#F1F1F1",
    fontWeight: 800,
    marginTop: 40,
  }
  return (
    <Html as='div'center style={style}>
      <span className='canvas-loader'></span>
      <p style={loaderStyle}> {progress.toFixed(2)}% </p>
    </Html>
  );
};

