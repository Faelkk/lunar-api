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

  "/messages/image": {
    fieldName: "content",
    storageName: "image-messages",
    allowedTypes: ["image/jpeg", "image/jpg", "image/png"],
  },
  "/messages/voice": {
    fieldName: "content",
    storageName: "audio-messages  ",
    allowedTypes: ["audio/mp3", "audio/mpeg", "audio/wav", "audio/ogg"],
  },
};
