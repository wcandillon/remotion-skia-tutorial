import { Group, rect, RoundedRect } from "@shopify/react-native-skia";

type Channel = "r" | "g" | "b" | "rgb";

const isRed = (channel: Channel) => channel === "r" || channel === "rgb";
const isGreen = (channel: Channel) => channel === "g" || channel === "rgb";
const isBlue = (channel: Channel) => channel === "b" || channel === "rgb";

const totalWidth = 30;
const height = 23;
const width = totalWidth / 3;
export const TILE = rect(0, 0, totalWidth, height);

interface PhosphorDotProps {
  channel: Channel;
}

export const PhosphorDot = ({ channel }: PhosphorDotProps) => {
  const r = 6;
  return (
    <Group>
      {isRed(channel) && (
        <RoundedRect
          x={0}
          y={0}
          width={width}
          height={height}
          color="red"
          r={r}
        />
      )}
      {isGreen(channel) && (
        <RoundedRect
          x={width}
          y={0}
          width={width}
          height={height}
          color="green"
          r={r}
        />
      )}
      {isBlue(channel) && (
        <RoundedRect
          x={width * 2}
          y={0}
          width={width}
          height={height}
          color="blue"
          r={r}
        />
      )}
    </Group>
  );
};

PhosphorDot.defaultProps = {
  channel: "rgb",
};
