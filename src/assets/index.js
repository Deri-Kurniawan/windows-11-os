const ASSETS = {
  images: {
    icons: {
      apps: {
        winFileExplorer: require("./images/icons/apps/file-explorer.png"),
      },
    },
    profiles: {
      deri: require("./images/profiles/deri.jpg"),
    },
    wallpapers: [
      require("./images/wallpapers/1.png"),
      require("./images/wallpapers/2.png"),
      require("./images/wallpapers/3.png"),
    ],
  },
};

export const { icons, profiles, wallpapers } = ASSETS.images;

export default ASSETS;
