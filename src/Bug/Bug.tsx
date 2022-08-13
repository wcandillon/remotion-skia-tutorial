import { Canvas, Fill } from "@shopify/react-native-skia";
import { Internals } from "remotion";

export const durationInFrames = 30;

const colors = ["cyan", "magenta", "yellow"];
const color = colors[Math.floor(Math.random() * colors.length)];

export const Bug = () => {
  const contexts = Internals.useRemotionContexts();
  return (
    <Canvas style={{ flex: 1 }}>
      <Internals.RemotionContextProvider contexts={contexts}>
        <Fill color={color} />
      </Internals.RemotionContextProvider>
    </Canvas>
  );
};
