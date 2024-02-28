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
    endpoint: "users/editUserIcon/:userId",
    method: "PUT",
    handlers: usersController.editUserIcon,
  },
  {
    endpoint: "users/editUserName/:userId",
    method: "PUT",
    handlers: usersController.editUserName,
  },

  {
    endpoint: "contacts",
    method: "GET",
    handlers: contactsController.getContacts,
  },
  {
    endpoint: "contacts/:id",
    method: "GET",
    handlers: contactsController.deleteContact,
  },
  {
    endpoint: "contacts",
    method: "POST",
    handlers: contactsController.addContacts,
  },
  {
    endpoint: "contacts/:id",
    method: "DELETE",
    handlers: contactsController.getOneContact,
  },
  {
    endpoint: "/contacts/invites",
    method: "GET",
    handlers: invitesController.getInvites,
  },
  {
    endpoint: "/contacts/accept",
    method: "POST",
    handlers: invitesController.acceptInvite,
  },
  {
    endpoint: "messages",
    method: "GET",
    handlers: messagesController.getMessages,
  },
  {
    endpoint: "messages",
    method: "POST",
    handlers: messagesController.sendMessage,
  },
  {
    endpoint: "messages/:id",
    method: "DELETE",
    handlers: messagesController.deleteMessage,
  },
  {
    endpoint: "messages/:id",
    method: "PUT",
    handlers: messagesController.updateMessage,
  },
];
