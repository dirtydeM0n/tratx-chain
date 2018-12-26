const Block = require('./block.js');

class Blockchain {
    constructor() {
        this.chain = [Block.genesis()]; // chains needs to have a genesis block
    }
    
    addBlock(data) { // data held by the current block
        const block = Block.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(block); // pushing the block in the chain array

        return block;
    }
    isValidChain(chain) {
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        for (let i = 1; i < chain.length; i++){
            const block = chain[i];
            const lastBlock = chain[i-1];
            if(block.lastHash !== lastBlock.hash ||
                block.hash !== Block.blockHash(block)) {
                    return false;
                }
        }
        return true;
    }
    replaceChain(newChain){ // replacing the current chain with longest chain
        if (newChain.length <= this.chain.length){ 
            console.log('Received chain is not longer than the current chain');
            return;
        } else if (!this.isValidChain(newChain)){
            console.log('The received chain is not valid');
            return; // to get out of the function body
        }
        console.log('Replacing blockchain with the new chain'); // the tests are now passed and new chain is received
        this.chain = newChain;
    }
}
module.exports = Blockchain;