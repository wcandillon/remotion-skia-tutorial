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
  ColorMatrix,
  Mask,
} from "@shopify/react-native-skia";

import { RemotionCanvas } from "./components";
import { CANVAS } from "./components/Theme";
import { PhosphorDot, TILE } from "./CRT/PhosphorDot";
import { Reference } from "./CRT/Reference";
import { Tile } from "./CRT/Tile";

const { width, height, center } = CANVAS;

// https://fecolormatrix.com/
const filterColor = (r: number, g: number, b: number) => [
  r,
  0,
  0,
  0,
  0,
  0,
  g,
  0,
  0,
  0,
  0,
  0,
  b,
  0,
  0,
  0,
  0,
  0,
  1,
  0,
];

export const HelloWorld = () => {
  return (
    <RemotionCanvas
      typefaces={[require("./CRT/assets/PublicPixel.ttf")]}
      width={width}
      height={height}
    >
      <Fill color="black" />
      <Group>
        <Mask
          mask={
            <Tile rect={TILE}>
              <PhosphorDot channel="r" />
            </Tile>
          }
        >
          <Group>
            <ColorMatrix matrix={filterColor(1, 0, 0)} />
            <Reference />
          </Group>
        </Mask>
        <Mask
          mask={
            <Tile rect={TILE}>
              <PhosphorDot channel="g" />
            </Tile>
          }
        >
          <Group>
            <ColorMatrix matrix={filterColor(0, 1, 0)} />
            <Reference />
          </Group>
        </Mask>
        <Mask
          mask={
            <Tile rect={TILE}>
              <PhosphorDot channel="b" />
            </Tile>
          }
        >
          <Group>
            <ColorMatrix matrix={filterColor(0, 0, 1)} />
            <Reference />
          </Group>
        </Mask>
      </Group>
    </RemotionCanvas>
  );
};
