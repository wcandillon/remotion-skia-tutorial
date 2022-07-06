import { Canvas, Circle, Group } from "@shopify/react-native-skia";
import type { FC } from "react";

export const HelloWorld: FC<{
  titleText: string;
  titleColor: string;
}> = ({ titleText, titleColor }) => {
  const r = 200;
  const size = 400;
  return (
    <Canvas style={{ flex: 1 }}>
      <Group blendMode="multiply">
        <Circle cx={r} cy={r} r={r} color="cyan" />
        <Circle cx={size - r} cy={r} r={r} color="magenta" />
        <Circle cx={size / 2} cy={size - r} r={r} color="yellow" />
      </Group>
    </Canvas>
  );
};
