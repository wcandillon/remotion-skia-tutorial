import { Group, Fill, ColorMatrix, Mask } from "@shopify/react-native-skia";
import type { ReactNode } from "react";
import { useCurrentFrame } from "remotion";

import { RemotionCanvas, useLoop } from "../components";
import { CANVAS } from "../components/Theme";

import { Tile } from "./Tile";
import { PhosphorDot, TILE } from "./PhosphorDot";
import { Reference } from "./Reference";
import { Refresh } from "./Refresh";

const { width, height, center } = CANVAS;

interface CRTProps {
  children: ReactNode | ReactNode[];
}

const CRTEffect = ({ children }: CRTProps) => {
  const frame = useCurrentFrame();
  const duration = 30 * 3;
  const iteration = Math.floor(frame / duration);
  const progress = (frame % duration) / duration;
  const revert = iteration % 2;
  console.log({ iteration, revert });
  return (
    <RemotionCanvas
      typefaces={[require("./assets/PublicPixel.ttf")]}
      width={width}
      height={height}
    >
      <Refresh revert={revert} progress={progress}>
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
      </Refresh>
    </RemotionCanvas>
  );
};

export const CRT = () => {
  return (
    <CRTEffect>
      <Reference />
    </CRTEffect>
  );
};

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
