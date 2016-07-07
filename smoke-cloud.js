(function(){
    var net = require('net');
    
    var server = {};
    var computers = [];
    var cracked = function(){};
    
    module.exports.getComputers = function() {
        return computers;
    }
    
    module.exports.crackModulus = function(modulus, done) {
        for (i = 0; i < computers.length; ++i) {
          var buffer = Buffer.concat([Buffer.from([1, i + 1, computers.length]), Buffer.from(modulus.toString()), Buffer.from([0])]);
          console.log("Sending:");
          console.log(buffer);
          computers[i].write(buffer);
        }

        cracked = done;
    };
    
    module.exports.start = function(port) {
        
        server = net.createServer(function(socket) {      

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
    };

    var handlePacket0 = function(data) {
        console.log("Nothing");
    };

    var handlePacket1 = function(data) {
        if (data[1]) {
            result = data.toString('ascii', 2, data.length).split('\0');
            cracked(result[0], result[1]);
            cracked = function(){};
        }
    };

    var handlePacket2 = function(data) {
        console.log("Nothing");
    };

    var packetSwitch = [ handlePacket0, handlePacket1, handlePacket2 ];
    
}());