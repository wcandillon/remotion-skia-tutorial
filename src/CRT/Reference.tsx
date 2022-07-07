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

const times = <T,>(input: T[], n: number) =>
  new Array(n)
    .fill(0)
    .map(() => input)
    .flat();

export const Reference = () => {
  const duration = 30 * 3;
  const progress = useLoop(duration, false);
  const typeface = useTypefaces()[0];
  const font = Skia.Font(typeface, fontSize);
  const w = font
    .getGlyphWidths(font.getGlyphIDs("CRT"))
    .reduce((a, b) => a + b);
  const band = rect(0, fontSize + 300 + 200, width * 2, 400);
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
      <Group transform={[{ translateX: mix(progress, 0, -width) }]}>
        <Rect rect={band}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width * 2, 0)}
            colors={[
              "green",
              "yellow",
              "red",
              "purple",
              "blue",
              "cyan",
              ...["green", "yellow", "red", "purple", "blue", "cyan"],
            ]}
          />
        </Rect>
      </Group>
    </>
  );
};
