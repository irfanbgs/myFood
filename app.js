const { Console } = require("console");
const express = require("express");
const mongoose = require('mongoose'); // importing mongoose 
mongoose.connect('mongodb://localhost/irfanFood',{useNewUrlParser:true}); // connectiong to mongoose database
const app = express();
const port = 80;
const path = require("path");
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'))

//Defining Schema 
const foodSchema = new mongoose.Schema({
    name : String,
    email : String,
    number : String,
    message : String
})

const CustContact = mongoose.model('foodcontact',foodSchema);
// const irfancontact = new CustContact({name:'contfood'});

// Saving the contact in the database
// irfancontact.save(function(err,foody){
//     if(err)return console.error(err);
// });

//EXPRESS RELATED CONFIGURATION
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG RELATED CONFIGURATION
app.set('view engine','pug'); 
app.set('views', path.join(__dirname,'views'));

//ENDPOINTS
app.get("/",(req,res)=>{
    res.render('index')
})
app.post("/",(req,res)=>{
    var myData = new CustContact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
})

// Searching data from the databse in console
CustContact.find({email:"anassameerbgs12@gmail.com"},function(err,foodies){
    if(err) return console.error(err);
    console.log(foodies);
})
app.listen(port,()=>{
    console.log(`The application started successful on port ${port}`);
});