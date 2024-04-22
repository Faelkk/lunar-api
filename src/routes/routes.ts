import { contactsController } from "../modules/contacts/contactsController";
import { messagesController } from "../modules/messages/messagesController";
import { usersController } from "../modules/users/usersController";
import { invitesController } from "../modules/invites/invitesController";

export const routes = [
  {
    endpoint: "/signin",
    method: "POST",
    handlers: usersController.signin,
  },

  {
    endpoint: "/signup",
    method: "POST",
    handlers: usersController.signup,
  },
  {
    endpoint: "/me",
    method: "GET",
    handlers: usersController.getUser,
  },
  {
    endpoint: "/user/:userId",
    method: "GET",
    handlers: usersController.getUserById,
  },
  {
    endpoint: "/user/edit",
    method: "PATCH",
    handlers: usersController.editUser,
    middleware: ["uploadMiddleware"],
  },

  {
    endpoint: "/contacts",
    method: "GET",
    handlers: contactsController.getContacts,
  },
  {
    endpoint: "/contacts",
    method: "POST",
    handlers: contactsController.addContacts,
  },
  {
    endpoint: "/contacts/invites",
    method: "GET",
    handlers: invitesController.getInvites,
  },
  {
    endpoint: "/contacts/send",
    method: "GET",
    handlers: invitesController.getSendInvites,
  },
  {
    endpoint: "/contacts/accept",
    method: "POST",
    handlers: invitesController.acceptInvite,
  },
  {
    endpoint: "/contacts/reject",
    method: "DELETE",
    handlers: invitesController.rejectInvite,
  },
  {
    endpoint: "/contacts/cancel",
    method: "DELETE",
    handlers: invitesController.cancelInvite,
  },
  {
    endpoint: "/contacts/:id",
    method: "DELETE",
    handlers: contactsController.deleteContact,
  },
  {
    endpoint: "/contacts/:id",
    method: "GET",
    handlers: contactsController.getOneContact,
  },
  {
    endpoint: "/messages/:id",
    method: "GET",
    handlers: messagesController.getMessages,
  },
  {
    endpoint: "/messages",
    method: "POST",
    handlers: messagesController.sendMessage,
  },
  {
    endpoint: "/messages/image",
    method: "POST",
    handlers: messagesController.sendImage,
    middleware: ["uploadMiddleware"],
  },
  {
    endpoint: "/messages/audio",
    method: "POST",
    handlers: messagesController.sendVoice,
    middleware: ["audioMiddleware"],
  },
  {
    endpoint: "/messages/:id",
    method: "DELETE",
    handlers: messagesController.deleteMessage,
  },
  {
    endpoint: "/messages/all",
    method: "DELETE",
    handlers: messagesController.deleteAllMessagesContact,
  },
  {
    endpoint: "/message/:id",
    method: "GET",
    handlers: messagesController.getOneMessageById,
  },
  {
    endpoint: "/messages/:id",
    method: "PUT",
    handlers: messagesController.updateMessage,
  },
];
