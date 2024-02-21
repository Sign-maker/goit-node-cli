import { program } from "commander";
import * as contactsService from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const options = program.opts();

async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case "list":
      const contacts = await contactsService.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsService.getContactById(id);
      console.table(contact);
      break;

    case "add":
      const { name, email, phone } = data;
      const newContact = await contactsService.addContact(name, email, phone);
      console.log(newContact);

      break;

    case "remove":
      const removedContact = await contactsService.removeContact(id);
      console.log(removedContact);
      break;

    case "update":
      const updatedContact = await contactsService.updateContact(id, data);
      console.log(updatedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
