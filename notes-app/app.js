let f = require('./notes');
let fs = require('fs');
let chalk = require('chalk');
let yarn = require('yargs');


yarn.command({
    command: 'add',
    describe: 'Add new notes',
    handler: function(){
        // fs.writeFile('notes.js',)
        console.log(yarn);
    }
})

yarn.command({
    command: 'list',
    describe: 'Add new notes',
    handler: function(){
        // fs.writeFile('notes.js',)
        console.log(yarn);
    }
})

yarn.command({
    command: 'remove',
    describe: 'Add new notes',
    handler: function(){
        // fs.writeFile('notes.js',)
        console.log(yarn);
    }
})

yarn.command({
    command: 'write',
    describe: 'Add new notes',
    handler: function(){
        // fs.writeFile('notes.js',)
        console.log(yarn);
    }
})

console.log(yarn.argv);
// console.log(chalk.blue('Hello', chalk.underline.bold('world') + '!'));

yarn.command({
    command: 'add',
    describe: 'Add new notes',
    handler: function(){
        // fs.writeFile('notes.js',)
        console.log(yarn);
    }
})


yarn.command({
    command: 'remove',
    describe: 'Add new notes',
    handler: function(){
        // fs.writeFile('notes.js',)
        console.log(yarn);
    }
})