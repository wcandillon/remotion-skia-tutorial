import {
  ColorMatrix,
  Fill,
  fitbox,
  Group,
  Mask,
} from "@shopify/react-native-skia";

import { CANVAS, RemotionCanvas } from "../components";

import { PhosphorDot, TILE } from "./PhosphorDot";
import { Reference } from "./Reference";
import { Tile } from "./Tile";

// https://youtu.be/UtjozTVSsLA?t=54
export const Step1 = () => {
  return (
    <RemotionCanvas>
      <Reference />
    </RemotionCanvas>
  );
};

// https://youtu.be/UtjozTVSsLA?t=135
export const Step2 = () => {
  return (
    <RemotionCanvas>
      <Group transform={fitbox("contain", TILE, CANVAS)}>
        <PhosphorDot />
      </Group>
    </RemotionCanvas>
  );
};

// https://youtu.be/UtjozTVSsLA?t=270
export const Step3 = () => {
  return (
    <RemotionCanvas>
      <Tile rect={TILE}>
        <PhosphorDot />
      </Tile>
    </RemotionCanvas>
  );
};

// https://youtu.be/UtjozTVSsLA?t=351
export const Step4 = () => {
  return (
    <RemotionCanvas>
      <Group>
        <ColorMatrix matrix={filterColor(0, 0, 1)} />
        <Reference />
      </Group>
    </RemotionCanvas>
  );
};

// https://youtu.be/UtjozTVSsLA?t=443
export const Step5 = () => {
  return (
    <RemotionCanvas>
      <Fill color="black" />
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
    </RemotionCanvas>
  );
};

export const Main = Step5;

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
