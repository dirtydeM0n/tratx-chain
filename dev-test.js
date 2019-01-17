/* // for development purpose, explore the block class

const Block = require('./block.js');

/*const block = new Block('foo', 'bar', 'zoo', 'baz');
console.log(block.toString());
console.log(Block.genesis().toString());
const fooBlock = Block.mineBlock(Block.genesis(), 'myfirstblockaftergenesis');
console.log(fooBlock.toString());

*/
const Blockchain = require('./blockchain');
const bc = new Blockchain();

for(let i = 1; i<=10; i++){
    console.log(bc.addBlock(`foo block ${i}`).toString());
}