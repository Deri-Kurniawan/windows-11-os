import Image from "next/image";
import React from "react";

type WallpaperPropsType = {
  data: {
    fitType: any;
    wallpaper: {
      name: string;
      image: {
        src: string;
        blurDataURL: string;
        width: number;
        height: number;
      };
    };
  };
};

const Wallpaper = ({ data }: WallpaperPropsType): JSX.Element => {
  return (
    <Image
      className={`absolute top-0 left-0 h-screen w-screen -z-50`}
      style={{ objectFit: data.fitType }}
      src={data.wallpaper.image.src}
      blurDataURL={data.wallpaper.image.blurDataURL}
      alt={`windows_11_${data.wallpaper.name}_wallpaper`
        .replace(" ", "_")
        .toLowerCase()}
      loader={({ src }) => src}
      width={data.wallpaper.image.width}
      height={data.wallpaper.image.height}
      priority
      unoptimized
    />
  );
};

export default Wallpaper;
