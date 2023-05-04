
// import laibarary for API
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const Database = require('./Database');
const note = require('./schemas/note');
let DB = new Database();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// creat first API post request to create my note.
app.post('/notes',(req , res)=>{
    const body = req.body;
    console.log("Body : ",body);
    DB.addNote(body).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.status(500).send(err);
    });
});

// creat first API get request to get my note
app.get('/notes',(req,res)=>{

   const {title} = req.query;
   if(title){
        DB.getNoteByTitle(title).then(data=>{
        res.send(data);
        }).catch(err=>{
        res.status(500).send(err);
        });
   }else{
        DB.getNote().then(data=>{
        res.send(data);
       }).catch(err=>{
        res.status(500).send(err);
       });
   }
  
});

// creat first API get request to get one my note
app.get('/notes/:id',(req,res)=>{
    const {id} = req.params;
    DB.getNoteById(id).then(data=>{
        if(!data){
            res.status(500).send("Note Id is note found "+id);
        }else {
            res.send(data);
        }
    }).catch(err=>{
        res.status(500).send(err);
    });
});

// creat first API get request to update my note
app.put('/notes',(req,res)=>{
    DB.updateNote(req.body).then(data=>{
        if(!data){
            res.status(500).send("Note Id is note found "+id);
        }else {
            res.send(data);
        }
    }).catch(err=>{
        res.status(500).send(err);
    });
});

// creat first API get request to delete my note
app.delete('/notes/:id',(req,res)=>{
    const {id} = req.params;
    DB.deleteNote(id).then(data=>{
        if(!data){
            res.status(500).send("Note Id is note found "+id);
        }else {
            res.send(data);
        }
    }).catch(err=>{
        res.status(500).send(err);
    });
});

let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server has started in ${port}...`);
    DB.connect();
});




// API HTTP request 
/*app.get
app.post
app.put
app.delete
*/
