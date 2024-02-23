import { authMiddleware } from "../shared/middlewares/authMiddleware";
import { contactsController } from "../modules/contacts/contactsController";
import { messagesController } from "../modules/messages/messagesController";
import { usersController } from "../modules/users/usersController";
import { bodyParserMiddleware } from "../shared/middlewares/bodyParserMiddleware";

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
    endpoint: "edit/:userId",
    method: "PUT",
    handlers: usersController.editUser,
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
