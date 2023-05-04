const model = document.getElementById('addNoteModal');
const TitleStr = document.getElementById('addTitle');
const contentStr = document.getElementById('addContent');
const addError =  document.getElementById('addError');
const closeAdd = document.getElementById('closeAdd');
const cancelAdd = document.getElementById('cancelAddNoteBtn');
const modelEdit = document.getElementById('editNoteModal');
const closeEdit = document.getElementById('closeEdit');
const cancelEdit = document.getElementById('cancelEditNoteBtn');
const editTitle =document.getElementById('editTitle'); 
const editContent = document.getElementById('editContent');
const editError = document.getElementById('editError');

function openAddModal(){
    clearData();
    model.style.display = 'block';
    closeAdd.onclick = () => model.style.display = 'none';
    cancelAdd.onclick = ()=> model.style.display = 'none'
    
}
function saveNewNote() {

    let noteData = {title:TitleStr.value , content:contentStr.value};
    addNotes(noteData).then(response=>{
        if(response.ok){
            model.style.display = 'none';
            response.json().then(json=>{
                let newNoteId = json["_id"];
                updateNotesTable(newNoteId);
            });
        }else{
            response.text().then(error=>{
                addError.innerHTML = error;
            });
        }
    }).catch(error => {
        addError.innerHTML = error;
        console.log(error);
    });
    // clearData();
}

function clearData() {
    TitleStr.value = '';
    contentStr.value = '';
    addError.innerHTML =''
}
function openEditModel(noteId) {
    clearData();
    modelEdit.style.display = 'block';
    closeEdit.onclick = () => modelEdit.style.display = 'none';
    cancelEdit.onclick = ()=> modelEdit.style.display = 'none';
    loadNoteData(noteId);
}
function loadNoteData(noteId) {
    var noteIdAtrr = document.createAttribute('noteid');
    noteIdAtrr.value = noteId;
    modelEdit.setAttributeNode(noteIdAtrr);

    getNoteById(noteId).then(data=>{
        editTitle.value = data["title"];
        editContent.value = data["content"];
    });
}
function saveEditNote() {

    const noteId = modelEdit.getAttribute('noteid');
    let titleStr = editTitle.value;
    let contentStr = editContent.value;
    const noteData ={
        _id: noteId,
        title: titleStr,
        content: contentStr
    };
    updateNotes(noteData).then(response=>{
        if(response.ok){
            modelEdit.style.display = 'none';
            updateNotesTable(noteId);
        }else{
            response.text().then(error=>{
                editError.innerHTML = error;
            });
        }
    }).catch(error=>{
        editError.innerHTML = error;
    });
}

