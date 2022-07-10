import type { DrawingProps, SkPaint } from "@shopify/react-native-skia";
import {
  mix,
  rect,
  SkRect,
  FilterMode,
  TileMode,
  Skia,
  createDrawing,
} from "@shopify/react-native-skia";
import type { ReactNode } from "react";

import { CANVAS } from "../components/Theme";

import { ShaderFilter } from "./ShaderFilter";

const { height } = CANVAS;

const refreshShader = Skia.RuntimeEffect.Make(`
uniform shader image;
uniform float progress;
uniform float revert;

half4 main(float2 xy) {
  if (xy.y > progress) {
    return image.eval(xy + vec2(revert == 0 ? -30 : 30.0 , 0.0)).rgba;
  }
  return image.eval(xy + vec2(revert == 0 ? 30 : -30.0 , 0.0)).rgba;
}
`)!;

interface RefreshProps {
  children?: ReactNode | ReactNode[];
  progress: number;
  revert: number;
}
export const Refresh = ({ children, progress, revert }: RefreshProps) => {
  return (
    <>
      {children}
      <ShaderFilter
        uniforms={[mix(progress, 0, height), revert]}
        rect={CANVAS}
        shader={refreshShader}
      >
        {children}
      </ShaderFilter>
    </>
  );
};
