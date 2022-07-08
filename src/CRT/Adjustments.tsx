import type { DrawingProps, SkPaint } from "@shopify/react-native-skia";
import {
  rect,
  SkRect,
  FilterMode,
  TileMode,
  Skia,
  createDrawing,
} from "@shopify/react-native-skia";
import type { ReactNode } from "react";

import { CANVAS } from "../components/Theme";

// https://www.shadertoy.com/view/XdcXzn
const displacementShader = Skia.RuntimeEffect.Make(`
uniform shader image;

mat4 brightnessMatrix( float brightness )
{
    return mat4( 1, 0, 0, 0,
                 0, 1, 0, 0,
                 0, 0, 1, 0,
                 brightness, brightness, brightness, 1 );
}

mat4 contrastMatrix( float contrast )
{
	float t = ( 1.0 - contrast ) / 2.0;
    
    return mat4( contrast, 0, 0, 0,
                 0, contrast, 0, 0,
                 0, 0, contrast, 0,
                 t, t, t, 1 );

}

mat4 saturationMatrix( float saturation )
{
    vec3 luminance = vec3( 0.3086, 0.6094, 0.0820 );
    
    float oneMinusSat = 1.0 - saturation;
    
    vec3 red = vec3( luminance.x * oneMinusSat );
    red+= vec3( saturation, 0, 0 );
    
    vec3 green = vec3( luminance.y * oneMinusSat );
    green += vec3( 0, saturation, 0 );
    
    vec3 blue = vec3( luminance.z * oneMinusSat );
    blue += vec3( 0, 0, saturation );
    
    return mat4( red,     0,
                 green,   0,
                 blue,    0,
                 0, 0, 0, 1 );
}

half4 main(float2 xy) {
  const float brightness = 0.2;
  const float contrast = 1.0;
  const float saturation = 1.0;
  half4 color = image.eval(xy).rgba;
  return brightnessMatrix( brightness ) *
        		contrastMatrix( contrast ) * 
        		saturationMatrix( saturation ) *
        		color;
}
`)!;

const { width, height } = CANVAS;
const boundingRect = rect(0, 0, width, height);

interface AdjustmentsProps {
  children?: ReactNode | ReactNode[];
}

const onDraw = createDrawing<AdjustmentsProps>((ctx, _, node) => {
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
      displacementShader.makeShaderWithChildren(
        [],
        [pic.makeShader(TileMode.Repeat, TileMode.Repeat, FilterMode.Nearest)]
      )
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

export const Adjustments = (props: AdjustmentsProps) => {
  return <skDrawing onDraw={onDraw} skipProcessing {...props} />;
};
