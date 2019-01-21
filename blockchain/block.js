const ChainUtil = require('../chain-util');
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp; // timestamp of the block
        this.lastHash = lastHash;   // hash of the previous block
        this.hash = hash;           // hash of the current block    
        this.data = data;           // data inside the current block
        this.nonce = nonce;         // nonce value to be binded with the constructor's nonce value. It is used in generation of valid blocks
        this.difficulty = difficulty || DIFFICULTY;
    }                              
    toString() {                    // will show what the specific instances of the class look like in strings
        return `Block -             
        Timestamp  : ${this.timestamp}
        Last Hash  : ${this.lastHash.substring(0, 20)}
        Hash       : ${this.hash.substring(0,20)}
        Nonce      : ${this.nonce}
        Difficulty : ${this.difficulty}
        Data       : ${this.data}`; 
    }
    static genesis() {
        return new this('Genesis Time', '------', 'f1r507-h4562', [], 0, DIFFICULTY); // default nonce is zero
    }
    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;
        // adding the proof of work algo until leading zeroes with the level of difficulty are generated
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp); // adjusting difficulty at each interval
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        } while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));
        // repeat returns a string with leading zeroes that matches up with the difficulty
       
        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static hash(timestamp, lastHash, data, nonce, difficulty){
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }
    // es6 interploation to show variable data `` back ticks

    static blockHash(block) {    
        const { timestamp, lastHash, data, nonce, difficulty } = block; // giving the block as a regular input to generate the hash
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty -1;
        return difficulty;
    }
}
module.exports = Block; // so it can be shared with other files as modules