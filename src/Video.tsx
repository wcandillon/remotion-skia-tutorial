import { Composition } from "remotion";

import { CRT } from "./CRT";
import { CANVAS } from "./components/Theme";

const { width, height } = CANVAS;

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="Main"
        component={CRT}
        durationInFrames={500}
        fps={30}
        width={width}
        height={height}
      />
    </>
  );
};
