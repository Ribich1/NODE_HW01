const fs = require("fs").promises;
const path = require("path");
const { dirNamePath } = require("./db/index");
const { nanoid } = require("nanoid");

const contactsPath = path.join(`${dirNamePath}`, "contacts.json");

// TODO: задокументировать каждую функцию

/**
 * Function return list of the Contacts
 */
async function listContacts() {
  const buffer = await fs.readFile(contactsPath);
  const arrContacts = JSON.parse(buffer);
  return arrContacts;
}
/**
 * Function return contact by id or null
 *  */
async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === contactId);
  return result || null;
}
/**
 * Function delete contact by id and return deleting contact or null if contact bz id dont found
 */
async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
}
/**
 * Function added new contat into list of contacts and return array of the new contact
 */
async function addContact(data) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

module.exports={
    listContacts,
    getContactById,
    removeContact,
    addContact,
}