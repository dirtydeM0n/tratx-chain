// for development purpose, explore the block class

const Block = require('./block.js');

/*const block = new Block('foo', 'bar', 'zoo', 'baz');
console.log(block.toString());
console.log(Block.genesis().toString());*/
const fooBlock = Block.mineBlock(Block.genesis(), 'myfirstblockaftergenesis');
console.log(fooBlock.toString());