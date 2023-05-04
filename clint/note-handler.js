function updateNotesTable(noteId , noteTitle) {
    let table = document.getElementById('notes-table');
    let rowCount = table.rows.length;
    while (--rowCount) {
        table.deleteRow(rowCount);
    }
    getNotes(noteTitle).then(data =>{
        data.forEach(note => {
            let row = table.insertRow(1);
            let idAtribute = document.createAttribute('id');
            idAtribute.value = note["_id"];
            row.setAttributeNode(idAtribute);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            cell1.innerHTML = note['title'];
            cell2.innerHTML = note['content'];
            cell3.innerHTML = note['updatedDate'];
            cell4.innerHTML = `
                <a href="#"><img onclick='openEditModel("${note["_id"]}")' src="images/edit.png" width="22px"></a>
                <a onclick='confirmDeleteNotes("${note["_id"]}")' href="#"><img src="images/delete.png" width="22px"></a>
            `;              
        });
    }).then(()=>{
        if(noteId){
            let row =document.getElementById(noteId);
            row.setAttribute("style","animation: new-row 5s;");
        }
    });
}
function searchNotes() {
    let searchTitle = document.getElementById('searchInput').value;
    updateNotesTable(undefined , searchTitle);
}
function confirmDeleteNotes(noteId) {
    let action = confirm('You Want to delete Note ?');
    if(action == true){
        deleteNotes(noteId).then(()=>{
            updateNotesTable();
        });
    }
}
