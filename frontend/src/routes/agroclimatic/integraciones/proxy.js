var express = require('express');
var request = require('request');

var paths='/api';
var apiServerhost = 'https://rapidapi.com';

var app = express();
app.use(paths,function(req,res){
    var url = apiServerhost + req.url;
    console.log('piped: '+req.url);
    req.pipe(request(url)).pipe(res);
});

app.use(express.static('.'));
app.listen(process.env.PORT || 8080);