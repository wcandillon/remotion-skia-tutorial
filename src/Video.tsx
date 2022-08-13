import { Composition } from "remotion";

import { Bug, durationInFrames } from "./Bug";
import { CANVAS } from "./components/Theme";

const { width, height } = CANVAS;

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="Main"
        component={Bug}
        durationInFrames={durationInFrames}
        fps={30}
        width={width}
        height={height}
      />
    </>
  );
};
