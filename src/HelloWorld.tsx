import {
  CanvasProps,
  fitbox,
  Group,
  rect,
  Canvas,
  Fill,
  Circle,
  Drawing,
  Skia,
} from "@shopify/react-native-skia";

import { CANVAS } from "./components/Theme";
import { PhosphorDot } from "./CRT/PhosphorDot";
import { Tile } from "./CRT/Tile";

const { width, height, center } = CANVAS;

export const HelloWorld = () => {
  return (
    <Canvas debug style={{ width, height }}>
      <Fill color="lightblue" />
      <Tile rect={rect(0, 0, 30, 23)}>
        <PhosphorDot />
      </Tile>
    </Canvas>
  );
};
