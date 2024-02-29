export const routeUploadConfig: {
  [key: string]: {
    fieldName: string;
    storageName: string;
    allowedTypes: string[];
  };
} = {
  "/signup": {
    fieldName: "icon",
    storageName: "icon",
    allowedTypes: ["image/jpeg", "image/jpg", "image/png"],
  },
  "/editUserIcon/:id": {
    fieldName: "icon",
    storageName: "icon",
    allowedTypes: ["image/jpeg", "image/jpg", "image/png"],
  },

  "/messages": {
    fieldName: "image-messages",
    storageName: "content",
    allowedTypes: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "video/mp4",
      "audio/mp3",
    ],
  },
};
