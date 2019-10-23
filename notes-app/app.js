let notes = require('./notes');
let fs = require('fs');
let chalk = require('chalk');
let yargs = require('yargs');


let noteUrl = './notes.txt';

yargs.command({
    command: 'add',
    describe: 'Add new notes',
    builder: {
        title :{
            describe: 'Title Of Note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body Of Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title, argv.body);
    }
})

yargs.command({
    command: 'remove',
    describe: 'Add new notes',
    builder: {
        title :{
            describe: 'Title Of Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
       let status =  notes.removeNotes(argv.title);
       if(status === false)
            console.log(chalk.red("No item found of title = %s"),argv.title);
        else
            console.log(chalk.green("Item removed of title = %s"),argv.title);
    }
})

yargs.command({
    command: 'read',
    describe: 'read a note with title',
    builder: {
        title :{
            describe: 'Title Of Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
       let res =  notes.readNote(argv.title);
       if(res.length > 0)
            console.log(chalk.yellow("Title : "+res[0].title)+"\nbody  : "+res[0].body);
        else
            console.log(chalk.red.bold("Item not found of title = %s"),argv.title);
    }
})

yargs.command({
    command: 'list',
    describe: 'Add new notes',
    handler(){
        console.log(notes.getNotes());
    }
})



yargs.parse();