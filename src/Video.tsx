import { LoadSkia } from "@shopify/react-native-skia/src/web";
import { useState, useEffect } from "react";
import { Composition, continueRender, delayRender } from "remotion";

import { HelloWorld } from "./HelloWorld";
import { CANVAS } from "./components/Theme";

const { width, height } = CANVAS;

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={width}
        height={height}
      />
    </>
  );
};
