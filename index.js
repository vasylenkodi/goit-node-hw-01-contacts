const { Command } = require("commander");
const contacts = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listOfContacts = await contacts.listContacts();
      console.table(listOfContacts);
      return listOfContacts;
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      return contact;
      break;

    case "add":
      const addedContact = await contacts.addContact(name, email, phone);
      console.log(addedContact);
      return addedContact;
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.log(removedContact);
      return removedContact;
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
