import { SkiaCanvas } from "@remotion/skia";
import type { SkImage, SkTypeface } from "@shopify/react-native-skia";
import { Canvas, Skia } from "@shopify/react-native-skia";
import type { ReactNode } from "react";
import { useContext, createContext, useState, useEffect } from "react";
import { Internals } from "remotion";

import { CANVAS } from "./Theme";

type Images = Record<string, SkImage>;

const { width, height } = CANVAS;

interface AssetManagerContext {
  images: Images;
  typefaces: SkTypeface[];
}
const AssetManagerContext = createContext<AssetManagerContext | null>(null);

interface RemotionCanvasProps {
  images?: ReturnType<typeof require>[];
  typefaces?: string[];
  children: ReactNode | ReactNode[];
}

const useAssetManager = () => {
  const assetManager = useContext(AssetManagerContext);
  if (!assetManager) {
    throw new Error("Could not find the asset manager");
  }
  return assetManager;
};

export const useTypefaces = () => {
  const assetManager = useAssetManager();
  return assetManager.typefaces;
};

export const useImages = () => {
  const assetManager = useAssetManager();
  return assetManager.images;
};

const resolveAsset = async (
  type: "font" | "image" | "typeface",
  asset: ReturnType<typeof require>
) => {
  const data = await Skia.Data.fromURI(asset);
  return {
    type,
    asset,
    data,
  };
};

export const RemotionCanvas = ({
  children,
  images: assets,
  typefaces,
}: RemotionCanvasProps) => {
  const contexts = Internals.useRemotionContexts();
  const [assetMgr, setAssetMgr] = useState<AssetManagerContext | null>(null);
  useEffect(() => {
    (async () => {
      const data = await Promise.all([
        ...(assets ?? []).map((asset) => resolveAsset("image", asset)),
        ...(typefaces ?? []).map((asset) => resolveAsset("typeface", asset)),
      ]);
      const tf = data
        .filter(({ type }) => type === "typeface")
        .map((a) => {
          const result = Skia.Typeface.MakeFreeTypeFaceFromData(a.data);
          if (!result) {
            console.log({ a });
            throw new Error("Could not create typeface");
          }
          return result;
        });
      const images = data
        .filter(({ type }) => type === "image")
        .reduce((acc, image, index) => {
          const result = Skia.Image.MakeImageFromEncoded(image.data);
          if (!result) {
            throw new Error("Could not load image");
          }
          acc[(assets ?? [])[index]] = result;
          return acc;
        }, {} as Images);
      setAssetMgr({ images, typefaces: tf });
    })();
  }, [assets, typefaces]);
  if (assetMgr === null) {
    return null;
  }
  return (
    <SkiaCanvas width={width} height={height} mode="continuous">
      <AssetManagerContext.Provider value={assetMgr}>
        {children}
      </AssetManagerContext.Provider>
    </SkiaCanvas>
  );
};
