const mongoose = require('mongoose');
const Note = require("./schemas/note");

class Database{
    constructor(){
        //this.url = "mongodb://localhost:27017/notaty";
        this.url =process.env.MONGODB_URL || "mongodb+srv://Mohammed:admin123@cluster0.cviklhv.mongodb.net/?retryWrites=true&w=majority";
    }
    connect(){
       
       mongoose.connect(this.url ,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
        }).then(()=>{
        console.log("Connect is Successfly");
       }).catch((err)=>{
        console.log(err);
       });
    }

    addNote(note){
        return new Promise((resolve,reject)=>{
            note["createdDate"] = new Date();
            note["updatedDate"] = new Date();
    
            let newNote = new Note(note);
            newNote.save().then(doc=>{
                resolve(doc);
            }).catch(err=>{
                reject(err);
            });
        });
  
    }
    getNote(){
        return new Promise((resolve , reject)=>{
            Note.find().then(data=>{
                resolve(data);
            }).catch(err=>{
                reject(err);
            });
        });
    }
    getNoteById(id){
        return new Promise((resolve,reject)=>{
            Note.findById(id).then(data=>{
                resolve(data);
            }).catch(err=>{
                reject(err);
            });
        });
    }
    updateNote(note){
        note["updatedDate"]=new Date();
        return new Promise((resolve,reject)=>{
            Note.findByIdAndUpdate(note["_id"],note).then(data=>{
                console.log(data);
                resolve(data);
            }).catch(err=>{
                reject(err);
            });
        });
    }
    deleteNote(id){
        return new Promise((resolve,reject)=>{
            Note.findByIdAndDelete(id).then(data=>{
                console.log(data);
                resolve(data);
            }).catch(err=>{
                reject(err);
            });
        });
    }
    getNoteByTitle(notTitle){
        return new Promise((resolve,reject)=>{
            const query = {title:{$regex: new RegExp(notTitle,"i")}};
            Note.find(query).then(data=>{
                resolve(data);
            }).catch(err=>{
                reject(err);
            });
        });
    }
}

module.exports = Database;

