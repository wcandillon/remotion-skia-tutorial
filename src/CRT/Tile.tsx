import type { DrawingProps, SkPaint, SkRect } from "@shopify/react-native-skia";
import {
  FilterMode,
  TileMode,
  Skia,
  createDrawing,
} from "@shopify/react-native-skia";
import type { ReactNode } from "react";

interface TileProps {
  rect: SkRect;
  children?: ReactNode | ReactNode[];
}

const onDraw = createDrawing<TileProps>((ctx, { rect: boundingRect }, node) => {
  if (node.memoized === null) {
    const recorder = Skia.PictureRecorder();
    const canvas = recorder.beginRecording(boundingRect);
    node.visit({
      ...ctx,
      canvas,
    });
    const pic = recorder.finishRecordingAsPicture();
    const shaderPaint = Skia.Paint();
    shaderPaint.setShader(
      pic.makeShader(TileMode.Repeat, TileMode.Repeat, FilterMode.Nearest)
    );
    node.memoized = shaderPaint;
  }
  ctx.canvas.drawPaint(node.memoized as SkPaint);
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      skDrawing: DrawingProps<any>;
    }
  }
}

export const Tile = (props: TileProps) => {
  return <skDrawing onDraw={onDraw} skipProcessing {...props} />;
};
