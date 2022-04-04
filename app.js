const express = require("express");
const app = express();
const port = 80;
const path = require("path");

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine','pug'); 
app.set('views', path.join(__dirname,'views'));

app.get("/",(req,res)=>{
    res.render('index')
})

app.listen(port,()=>{
    console.log(`The application started successful on port ${port}`);
});