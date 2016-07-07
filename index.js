var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var bignum = require('bignum');
var smokeCloud = require('./smoke-cloud');

app.listen(9669, function () {
  console.log('Smoke server running');
});

app.use(bodyParser());
app.use('/', express.static('public/app'));

app.post('/crack', function(req, res){
    console.log(req.body);
    smokeCloud.crackModulus(req.body.modulus, function(n, m){
        res.status(200).json({n1 : n, n2 : m});
    });
});

app.get('/computers', function(req, res) {
    var computers = smokeCloud.getComputers();
    var resComp = [];
    for (computer in computers) {
        resComp.push({
            'name': computers[computer].name,
            'ip': computers[computer].remoteAddress});
    }
    res.status(200).json({ 'computers': resComp });
});

smokeCloud.start();



