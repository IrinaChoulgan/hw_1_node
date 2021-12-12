const chalk = require('chalk');
const { Command } = require('commander');

const { listContacts, addContact, getContactById, removeContact } = require('./contacts');

const program = new Command();
program
  .requiredOption('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await listContacts()
      console.table(contacts)
      break;

    case 'get':
      const contactById = await getContactById(id)
      if (contactById) {
        console.log(chalk.bgGreen('Сontact found'))
        console.log(contactById)
        return
      } 
        console.log(chalk.bgRedBright('Сontact not found'))
      break;

    case 'add':
        const contact = await addContact(name, email, phone)
        console.table(contact)
      break;

    case 'remove':
        const removedContact = await removeContact(id)
            console.log(chalk.bgGreen('Сontact removed'))
            console.table(removedContact)
        
      break;

    default:
      console.warn(chalk.redBright('31m Unknown action type!'));
  }
}

invokeAction(argv).then(()=>console.log('Success!!!'))
