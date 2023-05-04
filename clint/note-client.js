let baseUrl = "http://localhost:3000";

// fetch API post request to create my note or add.
async function addNotes(noteData){
    const response = await fetch(`${baseUrl}/notes`,{
        method:"post",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(noteData)
    });
    return response
}

async function updateNotes(noteData){
    const response = await fetch(`${baseUrl}/notes`,{
        method:"put",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(noteData)
    });
    return response
}

async function deleteNotes(noteId){
    const response = await fetch(`${baseUrl}/notes/${noteId}`,{
        method:"delete",
    });
    return response
}

async function getNoteById(noteId) {
    const response = await fetch(`${baseUrl}/notes/${noteId}`);
    return response.json();
}


async function getNotes(noteTitle) {
    
    let url = `${baseUrl}/notes`;
    if(noteTitle){
        url+=`/?title=${noteTitle}`;
    }
    const response = await fetch(url);
    return response.json();
}



