import { interpolate, useCurrentFrame } from "remotion";

import { CLAMP } from "./Options";

export const useLoop = (
  durationInFrames = 15,
  boomerang = true,
  startsAtFrame = 0
) => {
  const frame = Math.max(useCurrentFrame() - startsAtFrame, 0);
  // Number of frames in the current iteration
  const progress = interpolate(
    frame % durationInFrames,
    [0, durationInFrames],
    [0, 1],
    {
      ...CLAMP,
      //easing: Easing.bezier(0.65, 0, 0.35, 1),
    }
  );
  // If the current iteration is even
  // then we are going back from 1 to 0
  const currentIteration = Math.floor(frame / durationInFrames);
  const isGoingBack = currentIteration % 2 === 0;
  // if we are going back, we invert the progress
  return isGoingBack && boomerang ? 1 - progress : progress;
};
