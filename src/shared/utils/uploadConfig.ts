export const routeUploadConfig: {
  [key: string]: {
    fieldName: string;
    storageName: string;
  };
} = {
  "/signup": {
    fieldName: "icon",
    storageName: "icon",
  },
  "users/editUserName/:userId": {
    fieldName: "icon",
    storageName: "icon",
  },

  "/messages": {
    fieldName: "image-messages",
    storageName: "content",
  },
};
