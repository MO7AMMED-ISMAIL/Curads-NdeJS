const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema({

    title:{type:String , required:true},
    content:{type:String , required:true},
    createdDate:{type:String ,required:true},
    updatedDate:{type:String , required:true}
});

module.exports = mongoose.model('Note',NoteSchema);