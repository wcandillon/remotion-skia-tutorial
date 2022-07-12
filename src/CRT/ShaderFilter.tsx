import type {
  DrawingProps,
  SkPaint,
  SkRect,
  SkRuntimeEffect,
} from "@shopify/react-native-skia";
import {
  FilterMode,
  TileMode,
  Skia,
  createDrawing,
} from "@shopify/react-native-skia";
import type { ReactNode } from "react";

import { TILE } from "./PhosphorDot";

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

interface ShaderFilterProps {
  rect: SkRect;
  children?: ReactNode | ReactNode[];
  shader?: SkRuntimeEffect;
  tileMode?: TileMode;
  uniforms?: number[];
}

const onDraw = createDrawing<ShaderFilterProps>(
  (ctx, { rect: boundingRect, tileMode, shader, uniforms }, node) => {
    if (node.memoized === null) {
      const recorder = Skia.PictureRecorder();
      const canvas = recorder.beginRecording(boundingRect);
      node.visit({
        ...ctx,
        canvas,
      });
      const pic = recorder.finishRecordingAsPicture();
      const shaderPaint = Skia.Paint();
      const tile = tileMode ?? TileMode.Decal;
      const childShader = pic.makeShader(tile, tile, FilterMode.Nearest);
      shaderPaint.setShader(
        shader
          ? shader.makeShaderWithChildren(uniforms ?? [], [childShader])
          : childShader
      );
      node.memoized = shaderPaint;
    }
    ctx.canvas.drawPaint(node.memoized as SkPaint);
  }
);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      skDrawing: DrawingProps<any>;
    }
  }
}

export const ShaderFilter = (props: ShaderFilterProps) => {
  return <skDrawing onDraw={onDraw} skipProcessing {...props} />;
};
