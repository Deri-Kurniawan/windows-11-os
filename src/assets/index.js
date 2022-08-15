const imagesIconsApps = (fileName) => {
  return require(`./images/icons/apps/${fileName}`);
};

const imagesProfiles = (fileName) => {
  return require(`./images/profiles/${fileName}`);
};
const imagesWallpapers = (fileName) => {
  return require(`./images/wallpapers/${fileName}`);
};

const ASSETS = {
  images: {
    icons: {
      apps: {
        chrome: imagesIconsApps("chrome.ico"),
        github: imagesIconsApps("github.png"),
        linkedin: imagesIconsApps("linkedin.png"),
        vscode: imagesIconsApps("vscode.png"),
        whatsapp: imagesIconsApps("whatsapp.png"),
        winCMD: imagesIconsApps("win-cmd.png"),
        winDefender: imagesIconsApps("win-defender.png"),
        winFileExplorer: imagesIconsApps("win-file-explorer.ico"),
        winMail: imagesIconsApps("win-mail.png"),
        winSearch: imagesIconsApps("win-search.ico"),
        winSettings: imagesIconsApps("win-settings.ico"),
        winTrashEmpty: imagesIconsApps("win-trash-empty.ico"),
        winTrashFull: imagesIconsApps("win-trash-full.ico"),
      },
    },
    profiles: {
      deri: imagesProfiles("deri.jpg"),
    },
    wallpapers: [
      imagesWallpapers("1.png"),
      imagesWallpapers("2.png"),
      imagesWallpapers("3.png"),
    ],
  },
};

export const { icons, profiles, wallpapers } = ASSETS.images;

export default ASSETS;
