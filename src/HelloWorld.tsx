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

import { RemotionCanvas } from "./components";
import { CANVAS } from "./components/Theme";
import { PhosphorDot } from "./CRT/PhosphorDot";
import { Reference } from "./CRT/Reference";
import { Tile } from "./CRT/Tile";

const { width, height, center } = CANVAS;

export const HelloWorld = () => {
  return (
    <RemotionCanvas
      typefaces={[require("./CRT/assets/PublicPixel.ttf")]}
      width={width}
      height={height}
    >
      <Reference />
      {/* <Tile rect={rect(0, 0, 30, 23)}>
        <PhosphorDot />
      </Tile> */}
    </RemotionCanvas>
  );
};
