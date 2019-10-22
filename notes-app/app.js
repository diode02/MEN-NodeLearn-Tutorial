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
    handler: function(argv){
        notes.addNotes(argv.title, argv.body);
    }
})

yargs.command({
    command: 'list',
    describe: 'Add new notes',
    handler: function(){
        console.log("List All notes");
    }
})

yargs.command({
    command: 'remove',
    describe: 'Add new notes',
    handler: function(){
        // fs.writeFile('notes.js',)
        console.log("yargs");
    }
})

yargs.parse();