import { Composition } from "remotion";

import { CRT } from "./CRT";
import { CANVAS } from "./components/Theme";
import { Main } from "./CRT/Step1";

const { width, height } = CANVAS;

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="CRT"
        component={Main}
        durationInFrames={300}
        fps={30}
        width={width}
        height={height}
      />
    </>
  );
};
