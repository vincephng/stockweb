const { json, response } = require('express');
const express = require('express');
const app = express();
const Handlebars = require('express-handlebars');
const request = require('request');
const Port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


//API public key pk_cade0848a67e438a80b4e5f72c0ed9df, URL: 'https://cloud.iexapis.com/stable/stock/fb/batch?types=quote&token=pk_cade0848a67e438a80b4e5f72c0ed9df'
function callAPI(finishedAPI,ticket){
  var url ='https://cloud.iexapis.com/stable/stock/' + ticket +'/batch?types=quote,news&token=pk_cade0848a67e438a80b4e5f72c0ed9df';
  console.log(url)
  request(url, {json:true}, (err,res,body) =>
  {
   // console.log("in call API")
    if(err)
     { 
        return console.log(err);
     }
    if(res.statusCode === 404){
       return console.log("Not valid symbol");

    }
    if (res.statusCode === 200)
     {
        finishedAPI(body);
     }
  });
}
//Set Handlebars Middleway
app.engine('handlebars', Handlebars());
app.set('view engine','handlebars');

//Set GET Handlebars Routes
app.get('/', function(req, res) {
   // console.log('In Get')
   callAPI(function(doneAPI){
      //console.log(doneAPI);
      res.render('home', {stock: doneAPI});
   },'aapl');
});

//Set POST Handlebars Routes
app.post('/',function(req,res){
   // console.log('In Post')
   callAPI(function(doneAPI){
      res.render('home', {stock: doneAPI});
   },req.body.stock_ticker);
});

app.listen(Port, () => console.log("Server listening: " + Port));


