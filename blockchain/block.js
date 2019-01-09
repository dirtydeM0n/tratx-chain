const SHA256 = require('crypto-js/sha256');

const DIFFICULTY = 4;

class Block {
    constructor(timestamp, lastHash, hash, data, nonce) {
        this.timestamp = timestamp; // timestamp of the block
        this.lastHash = lastHash;   // hash of the previous block
        this.hash = hash;           // hash of the current block    
        this.data = data;           // data inside the current block
        this.nonce = nonce;         // nonce value to be binded with the constructor's nonce value
    }                               // nonce value is used in generation of valid blocks
    toString() {                    // will show what the specific instances of the class look like in strings
        return `Block -             
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash.substring(0, 32)}
        Hash     : ${this.hash.substring(0,32)}
        Nonce    : ${this.nonce}
        Data     : ${this.data}`; 
    }
    static genesis() {
        return new this('Genesis Time', '------', 'f1r507-h4562', [], 0); // default nonce is zero
    }
    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let nonce = 0;
        // adding the proof of work algo until leading zeroes with the level of difficulty are generated
        do {
            nonce++;
            timestamp = Date.now();
            const hash = Block.hash(timestamp, lastHash, data, nonce);
        } while(hash.substring(0, DIFFICULTY) !== '0'.repeat(DIFFICULTY));
        // repeat returns a string with leading zeroes that matches up with the difficulty
       
        return new this(timestamp, lastHash, hash, data, nonce);
    }

    static hash(timestamp, lastHash, data, nonce){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }
    // es6 interploation to show variable data `` back ticks

    static blockHash(block) {    
        const { timestamp, lastHash, data, nonce } = block; // giving the block as a regular input to generate the hash
        return Block.hash(timestamp, lastHash, data, nonce);
    }
}
module.exports = Block; // so it can be shared with other files as modules