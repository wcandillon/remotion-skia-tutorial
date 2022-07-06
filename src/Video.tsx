import { LoadSkia } from "@shopify/react-native-skia/src/web";
import { useState, useEffect } from "react";
import { Composition, continueRender, delayRender } from "remotion";

let Comp: any = () => null;

export const RemotionVideo = () => {
  const [ready, setReady] = useState(false);
  const [wait] = useState(() => delayRender());
  useEffect(() => {
    LoadSkia().then(async () => {
      const { HelloWorld } = await import("./HelloWorld");
      Comp = HelloWorld;
      continueRender(wait);
      setReady(true);
    });
  });
  if (!ready) {
    return null;
  }
  return (
    <>
      <Composition
        id="HelloWorld"
        component={Comp}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
