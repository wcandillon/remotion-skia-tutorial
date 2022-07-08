import { Config } from "remotion";
import CopyPlugin from "copy-webpack-plugin";
import { enableSkia } from "@remotion/skia";

Config.Rendering.setImageFormat("png");
Config.Output.setOverwriteOutput(true);

Config.Bundling.overrideWebpackConfig((currentConfiguration) => {
  return enableSkia(currentConfiguration);
});
