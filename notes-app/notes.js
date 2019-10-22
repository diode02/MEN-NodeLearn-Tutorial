let fs = require('fs');

const getNotes = ()=>{
    return "these are your notes";
}

const addNotes = (title, body) =>{
    const notes = loadNotes();

    const dupl = notes.filter(function(note){
        return note.title = title;
    })

    if(dupl.length===0){
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
    }else{
        console.log("duplicate found");
    } 
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
    addNotes: addNotes
}