import type { SkRect } from "@shopify/react-native-skia";
import { TileMode, Skia } from "@shopify/react-native-skia";
import type { ReactNode } from "react";

import { TILE } from "./PhosphorDot";
import { ShaderFilter } from "./ShaderFilter";

const displacementShader = Skia.RuntimeEffect.Make(`
uniform shader image;

half4 main(float2 xy) {
  float width = ${TILE.width};
  float height = ${TILE.height};
  float band = float(xy.x / width);
  if (int(mod(band, 2.0)) == 0) {
    float2 dis = vec2(0, -height/2);
    return image.eval(xy - dis).rbga;
  }
  return image.eval(xy).rbga;
}
`)!;

interface TileProps {
  rect: SkRect;
  children?: ReactNode | ReactNode[];
}

export const Tile = ({ rect, children }: TileProps) => {
  return (
    <ShaderFilter
      rect={rect}
      tileMode={TileMode.Repeat}
      shader={displacementShader}
    >
      {children}
    </ShaderFilter>
  );
};
