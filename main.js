const express = require('express');
const app = express();
const Handlebars = require('express-handlebars');

const Port = process.env.PORT || 5000;

//Set Handlebars Middleway
app.engine('handlebars', Handlebars());
app.set('view engine','handlebars');

//Set Handlebars Routes
app.get('/', function(req, res){
     res.render('home');
});



app.listen(Port, () => console.log("Server listening" + Port));


