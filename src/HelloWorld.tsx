import type { CanvasProps } from "@shopify/react-native-skia";
import { Canvas, Fill } from "@shopify/react-native-skia";

import { CANVAS } from "./components/Theme";

const { width, height } = CANVAS;

export const HelloWorld = () => {
  return (
    <Canvas debug style={{ width, height }}>
      <Fill color="lightblue" />
    </Canvas>
  );
};
