export const routeUploadConfig: {
  [key: string]: {
    fieldName: string;
    storageName: string;
    allowedTypes: string[];
    required: boolean;
  };
} = {
  "/signup": {
    fieldName: "icon",
    storageName: "icon",
    allowedTypes: ["image/jpeg", "image/jpg", "image/png"],
    required: false,
  },
  "/editUserIcon/:id": {
    fieldName: "icon",
    storageName: "icon",
    allowedTypes: ["image/jpeg", "image/jpg", "image/png"],
    required: true,
  },

  "/messages/image": {
    fieldName: "content",
    storageName: "image-messages",
    allowedTypes: ["image/jpeg", "image/jpg", "image/png"],
    required: true,
  },
  "/messages/voice": {
    fieldName: "content",
    storageName: "audio-messages  ",
    allowedTypes: ["audio/mp3", "audio/mpeg", "audio/wav", "audio/ogg"],
    required: true,
  },
  "/user/edit": {
    fieldName: "icon",
    storageName: "icon",
    allowedTypes: ["image/jpeg", "image/jpg", "image/png"],
    required: false,
  },
};
