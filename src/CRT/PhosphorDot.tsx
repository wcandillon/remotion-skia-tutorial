import { RoundedRect } from "@shopify/react-native-skia";
import React from "react";
import { View } from "react-native";

const width = 30 / 3;
const height = 23;

export const PhosphorDot = () => {
  const r = 6;
  return (
    <>
      <RoundedRect
        x={0}
        y={0}
        width={width}
        height={height}
        color="red"
        r={r}
      />
      <RoundedRect
        x={width}
        y={0}
        width={width}
        height={height}
        color="green"
        r={r}
      />
      <RoundedRect
        x={width * 2}
        y={0}
        width={width}
        height={height}
        color="blue"
        r={r}
      />
    </>
  );
};
