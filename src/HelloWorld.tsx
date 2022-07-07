import { Canvas, Circle, Fill, Group } from "@shopify/react-native-skia";

import { CANVAS } from "./components/Theme";

const { width, height } = CANVAS;

export const HelloWorld = () => {
  return (
    <Canvas style={{ width, height }}>
      <Fill color="lightblue" />
    </Canvas>
  );
};
