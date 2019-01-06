const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;

// The following comment is for terminal only
// PS: HTTP_PORT = 3001 P2P_PORT = 5001 PEERS = ws://localhost:5001, ws://localhost:5002 npm run dev

const peers = process.env.PEERS ? process.env.PEERS.split(',') : []; // split will return the peer addresses as an array separated by a comma

class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = []; // list of sockets which ended up connecting to this socket
    }
    // listen() is responsible for creating and starting the server
    listen() {
        const server = new Websocket.Server({ port: P2P_PORT }); // static class Server present in websocket modules
        server.on('connection', socket => this.connectSocket(socket)); // event listener which listens for incoming messages sent to the websocket server
        this.connecToPeers();
        console.log(`Listening for P2P connections on the port: ${ P2P_PORT}`);
    }
    connecToPeers() {
        peers.forEach( peer => {
            // a peer will look like ws://localhost:5001
            const socket = new Websocket(peer); // each socket will have the peer
            socket.on('open', () => this.connectSocket(socket)); // event listener for each socket connection of each peer
        });
    }
    // all sockets run through the connectsockets function below
    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('Socket Connected');
        this.messageHandler(socket);
        this.sendChain(socket);

    }
    messageHandler(socket){
        socket.on('message', message => {
            const data = JSON.parse(message); // converts the stringified message into a JSobject
            // console.log('data', data);
            this.blockchain.replaceChain(data);
    
        });
    }
    // helper function to avoid duplication
    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain)); // sending message to each socket
    }
    // synchain will send updated blockahin of this current instance to all of the socket peers
    syncChains() {
        this.sockets.forEach(socket => this.sendChain(socket));
    }
}
module.exports = P2pServer;