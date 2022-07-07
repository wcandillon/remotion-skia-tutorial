import { Group, Fill, ColorMatrix, Mask } from "@shopify/react-native-skia";
import type { ReactNode } from "react";

import { RemotionCanvas } from "../components";
import { CANVAS } from "../components/Theme";

import { Tile } from "./Tile";
import { PhosphorDot, TILE } from "./PhosphorDot";
import { Reference } from "./Reference";

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

interface CRTProps {
  children: ReactNode | ReactNode[];
}

const CRTEffect = ({ children }: CRTProps) => {
  return (
    <RemotionCanvas
      typefaces={[require("./assets/PublicPixel.ttf")]}
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
            {children}
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
            {children}
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
            {children}
          </Group>
        </Mask>
      </Group>
    </RemotionCanvas>
  );
};

export const CRT = () => (
  <CRTEffect>
    <Reference />
  </CRTEffect>
);
