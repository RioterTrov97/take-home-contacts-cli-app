/**
 * CLI Component that displays an array of contacts
 */
export default async function listContacts(contacts) {
  console.clear();
  console.log(`Contact List\n`);

  contacts.forEach((record) => {
    console.log(`Contact: ${record.name} (${record.number})`);
  });
}
