import { Composition } from "remotion";

import { CRT } from "./CRT";
import { CANVAS } from "./components/Theme";

const { width, height } = CANVAS;

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="CRT"
        component={CRT}
        durationInFrames={300}
        fps={30}
        width={width}
        height={height}
      />
    </>
  );
};
