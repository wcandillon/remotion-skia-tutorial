import { Config } from "remotion";
import { enableSkia } from "@remotion/skia/enable";

Config.Rendering.setImageFormat("png");
Config.Output.setOverwriteOutput(true);
Config.Bundling.overrideWebpackConfig((currentConfiguration) => {
  return enableSkia(currentConfiguration);
});
