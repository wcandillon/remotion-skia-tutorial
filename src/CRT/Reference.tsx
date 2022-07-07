import {
  Fill,
  Group,
  LinearGradient,
  mix,
  mixColors,
  rect,
  Rect,
  Skia,
  Text,
  useFont,
  vec,
} from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { continueRender, delayRender, useCurrentFrame } from "remotion";

import { useTypefaces } from "../components";
import { CANVAS } from "../components/Theme";
import { useLoop } from "../components/animations/useLoop";

const { height, width } = CANVAS;
const fontSize = 800;
const PADDING = 400;

const colors = ["green", "yellow", "red", "purple", "blue", "cyan"];

export const Reference = () => {
  const duration = 30 * 3;
  const progress = useLoop(duration, false);
  const typeface = useTypefaces()[0];
  const font = Skia.Font(typeface, fontSize);
  const w = font
    .getGlyphWidths(font.getGlyphIDs("CRT"))
    .reduce((a, b) => a + b);
  const band = rect(0, fontSize + 300 + 200, width, 400);
  console.log({
    progress,
    translateX: mix(progress, 0, -width),
  });
  return (
    <>
      <Fill>
        <LinearGradient
          colors={["black", "white"]}
          start={vec(0, 0)}
          end={vec(0, height)}
        />
      </Fill>
      <Text
        x={(width - w) / 2}
        y={fontSize + 300}
        text="CRT"
        font={font}
        color="white"
      />
      <Group>
        <Rect rect={band}>
          <LinearGradient
            start={vec(mix(progress, -width, -2 * width), 0)}
            end={vec(mix(progress, 2 * width, width), 0)}
            colors={[...colors, ...colors, ...colors]}
          />
        </Rect>
      </Group>
    </>
  );
};
