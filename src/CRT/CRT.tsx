import { Group, Fill, ColorMatrix, Mask } from "@shopify/react-native-skia";
import type { ReactNode } from "react";
import { useCurrentFrame } from "remotion";

import { RemotionCanvas } from "../components";

import { Tile } from "./Tile";
import { PhosphorDot, TILE } from "./PhosphorDot";
import { Reference } from "./Reference";
import { Refresh } from "./Refresh";
import { Adjustments } from "./Adjustments";

interface CRTProps {
  children: ReactNode | ReactNode[];
  progress: number;
  revert: number;
}

const CRTEffect = ({ children, revert, progress }: CRTProps) => {
  return (
    <RemotionCanvas
      typefaces={{ PublicPixel: require("./assets/PublicPixel.ttf") }}
      images={{ Skia: require("./assets/skia.png") }}
    >
      <Refresh revert={revert} progress={progress}>
        <Fill color="black" />
        <Adjustments>
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
        </Adjustments>
      </Refresh>
    </RemotionCanvas>
  );
};

export const CRT = () => {
  const frame = useCurrentFrame();
  const duration = 30 * 3;
  const iteration = Math.floor(frame / duration);
  const progress = (frame % duration) / duration;
  const revert = iteration % 2;
  return (
    <CRTEffect progress={progress} revert={revert}>
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
