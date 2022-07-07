import {
  Fill,
  LinearGradient,
  Text,
  useFont,
  vec,
} from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { continueRender, delayRender } from "remotion";

import { CANVAS } from "../components/Theme";

const { height, width } = CANVAS;
const fontSize = 800;

export const Reference = () => {
  const font = useFont(require("./assets/PublicPixel.ttf"), fontSize);

  if (!font) {
    return null;
  }

  const w = font
    .getGlyphWidths(font.getGlyphIDs("CRT"))
    .reduce((a, b) => a + b);
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
        y={fontSize + 400}
        text="CRT"
        font={font}
        color="white"
      />
    </>
  );
};
