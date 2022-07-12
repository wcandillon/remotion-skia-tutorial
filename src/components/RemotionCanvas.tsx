import type { SkData, SkImage, SkTypeface, Canvas, Skia } from "@shopify/react-native-skia";
import type { ReactNode } from "react";
import { useContext, createContext, useState, useEffect } from "react";
import { Internals } from "remotion";

import { CANVAS } from "./Theme";

type ImagesToLoad = Record<string, ReturnType<typeof require>>;
type TypefacesToLoad = Record<string, ReturnType<typeof require>>;
type Images = Record<string, SkImage>;
type TypeFaces = Record<string, SkTypeface>;

const { width, height } = CANVAS;

interface AssetManagerContext {
  images: Images;
  typefaces: TypeFaces;
}

const AssetManagerContext = createContext<AssetManagerContext | null>(null);

interface RemotionCanvasProps {
  images: ImagesToLoad;
  typefaces: TypefacesToLoad;
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

const resolveAsset = async <T,>(
  type: "image" | "typeface",
  name: string,
  asset: ReturnType<typeof require>,
  factory: (data: SkData) => T
) => {
  const data = await Skia.Data.fromURI(asset);
  return {
    type,
    name,
    data: factory(data),
  };
};

export const RemotionCanvas = ({
  children,
  images: imagesToLoad,
  typefaces: typefacesToLoad,
}: RemotionCanvasProps) => {
  const contexts = Internals.useRemotionContexts();
  const [assetMgr, setAssetMgr] = useState<AssetManagerContext | null>(null);
  useEffect(() => {
    (async () => {
      const assets = await Promise.all([
        ...Object.keys(imagesToLoad).map((name) =>
          resolveAsset("image", name, imagesToLoad[name], (data: SkData) =>
            Skia.Image.MakeImageFromEncoded(data)
          )
        ),
        ...Object.keys(typefacesToLoad).map((name) =>
          resolveAsset(
            "typeface",
            name,
            typefacesToLoad[name],
            (data: SkData) => Skia.Typeface.MakeFreeTypeFaceFromData(data)
          )
        ),
      ]);
      const images: Images = {};
      const typefaces: TypeFaces = {};
      assets.forEach((asset) => {
        if (asset.type === "image") {
          images[asset.name] = asset.data as SkImage;
        } else {
          typefaces[asset.name] = asset.data as SkTypeface;
        }
      });
      setAssetMgr({ images, typefaces });
    })();
  }, [imagesToLoad, typefacesToLoad]);
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

RemotionCanvas.defaultProps = {
  images: {},
  typefaces: {},
};
