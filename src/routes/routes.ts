import { contactsController } from "../modules/contacts/contactsController";
import { messagesController } from "../modules/messages/messagesController";
import { usersController } from "../modules/users/usersController";

export const routes = [
  {
    endpoint: "signin",
    method: "POST",
    handlers: usersController.signin,
  },

  {
    endpoint: "signup",
    method: "POST",
    handlers: usersController.signup,
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
];
