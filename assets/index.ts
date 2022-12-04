import regularDark from "./systems/wallpapers/regularDark.webp";
import regularLight from "./systems/wallpapers/regularLight.webp";
import sweepDark from "./systems/wallpapers/sweepDark.webp";
import sweepLight from "./systems/wallpapers/sweepLight.webp";
import sweepVeryPeri from "./systems/wallpapers/sweepVeryPeri.webp";

import spinner1 from "./systems/loading/spinner1.png";

export type WallpapersType = {
  name: string;
  image: {
    blurDataURL: string;
    blurHeight: number;
    blurWidth: number;
    height: number;
    width: number;
    src: string;
  };
  dark: boolean;
};

export default {
  wallpapers: <WallpapersType[]>[
    {
      name: "Regular Dark",
      image: regularDark,
      dark: true,
    },
    {
      name: "Regular Light",
      image: regularLight,
      dark: false,
    },
    {
      name: "Sweep Dark",
      image: sweepDark,
      dark: true,
    },
    {
      name: "Sweep Light",
      image: sweepLight,
      dark: false,
    },
    {
      name: "Sweep Very Pery",
      image: sweepVeryPeri,
      dark: false,
    },
  ],
  loading: {
    spinner1,
  },
};
