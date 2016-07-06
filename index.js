var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var net = require('net');
var bignum = require('bignum');

var computers = [];

app.listen(9669, function () {
  console.log('Smoke server running');
});

app.use(bodyParser());
app.use('/', express.static('public/app'));

app.post('/crack', function(req, res){
    console.log(req.body);
    crackModulus(req.body.modulus, function(n, m){
        res.status(200).json({n1 : n, n2 : m});
    });
});

app.get('/computers', function(req, res) {
    var resComp = [];
    for (computer in computers) {
        resComp.push({
            'name': computers[computer].name,
            'ip': computers[computer].remoteAddress});
    }
    res.status(200).json({ 'computers': resComp });
});

function crackModulus(modulus, done) {
    for (i = 0; i < computers.length; ++i) {
      var buffer = Buffer.concat([Buffer.from([1, i + 1, computers.length]), Buffer.from(modulus.toString()), Buffer.from([0])]);
      console.log("Sending:");
      console.log(buffer);
      computers[i].write(buffer);
    }
    
    cracked = done;
}

var cracked = function(){};

var handlePacket0 = function(data) {
    console.log("Nothing");
};

var handlePacket1 = function(data) {
    if (data[1]) {
        result = data.toString('ascii', 2, data.length).split('\0');
        cracked(result[0], result[1]);
    }
};

var handlePacket2 = function(data) {
    console.log("Nothing");
};

var packetSwitch = [ handlePacket0, handlePacket1, handlePacket2 ];

var server = net.createServer(function(socket) {      
    
        socket.name = socket.remoteAddress + ":" + socket.remotePort;
        
        computers.push(socket);
        
        console.log('Connected ' + socket.name);
                
        socket.on('data', function(data) {
            console.log(data);
            packetSwitch[data[0]](data);
        });
        
        socket.on('close', function() {
            computers.splice(computers.indexOf(socket), 1);
            console.log('Closed');
        });
});

server.on('error', (err) => {
    throw err;
});

server.listen(9666);

