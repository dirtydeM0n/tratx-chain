const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp; // timestamp of the block
        this.lastHash = lastHash;   // hash of the previous block
        this.hash = hash;           // hash of the current block    
        this.data = data;           // data inside the current block
    }
    toString() {                    // will show what the specific instances of the class look like in strings
        return `Block -             
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash.substring(0, 32)}
        Hash     : ${this.hash.substring(0,32)}
        Data     : ${this.data}`; 
    }
    static genesis() {
        return new this('Genesis Time', '------', 'f1r507-h4562', []);
    }
    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data);
    }
    static hash(timestamp, lastHash, data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
    // es6 interploation to show variable data `` back ticks

    static blockHash(block) {    
        const { timestamp, lastHash, data } = block; // giving the block as a regular input to generate the hash
        return Block.hash(timestamp, lastHash, data);
    }
}
module.exports = Block; // so it can be shared with other files as modules