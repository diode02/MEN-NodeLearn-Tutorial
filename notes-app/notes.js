let fs = require('fs');

const getNotes = ()=>{
    return loadNotes();
}

const addNotes = (title, body) =>{
    const notes = loadNotes();
    const dupl = notes.filter((note)=> note.title === title);
    if(dupl.length===0){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        return true;
    }else{
        return false
    } 
}

const removeNotes = (title) =>{
    const notes = loadNotes();
    const dupl = notes.filter((note)=>note.title !== title);
    saveNotes(dupl);
    if(dupl.length === notes.length){
        return false;
    }else{
        return true;
     }
}

const readNote = (title) =>{
    const notes = loadNotes();
    return notes.filter((note)=>note.title === title);
}

const saveNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = ()=>{
    try{
        const dataBufffer = fs.readFileSync('notes.json');
        const dataJSON = dataBufffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }  
}
module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    readNote: readNote
}