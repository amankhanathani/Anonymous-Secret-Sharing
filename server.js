const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use('/assets',express.static('assets'));

const ejs = require('ejs');
const { kStringMaxLength } = require('buffer');
app.set('view engine','ejs');
mongoose.connect("mongodb+srv://UserName:test@cluster0.s7upg.mongodb.net/NotesDB", { useNewUrlParser: true, useUnifiedTopology: true });
// set this Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
//schema
const notesSchema={
    name: String,
    content: String,
    feedback:String
}
const displaySchema={
  name: String,
  content:String,
  feedback:String
}
const Note = mongoose.model("Note",notesSchema);
const Show = mongoose.model('notes',displaySchema);
app.get("/", function(req,res){
    res.sendFile(__dirname+"/ranthere.html") 
    
})
app.get('/read',(req,res)=>{
  Show.find({}, function(err,notes){
      // console.log(notes);
      res.render('index',{
          contentList:notes
      })

  })
})
app.get('*', function (req, res) { 
  res.redirect("/");
})
app.post("/", function(req,res){
    let newNote = new Note({
      name: req.body.name,
      content: req.body.content,
      feedback: req.body.feedback
    });
    newNote.save();
    res.redirect('/');
})
app.listen(process.env.PORT || 3000, function(){
  console.log("server is running 3000");  
})