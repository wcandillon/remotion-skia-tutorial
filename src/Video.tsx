import { Composition } from "remotion";

import { CRT } from "./CRT";
import { CANVAS } from "./components/Theme";
import { SkiaNeon, durationInFrames } from "./Skia";

const { width, height } = CANVAS;

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="CRT"
        component={CRT}
        durationInFrames={500}
        fps={30}
        width={width}
        height={height}
      />
      <Composition
        id="Skia"
        component={SkiaNeon}
        durationInFrames={durationInFrames}
        fps={30}
        width={width}
        height={height}
      />
    </>
  );
};
