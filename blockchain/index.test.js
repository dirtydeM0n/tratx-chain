const Blockchain = require('./index.js');
const Block = require('./block.js');

describe('Blockchain', () => {
    let bc, bc2;
    
    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });
    
    it('starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });
    it('adds a new block', () => {
        const data = 'foo';
        bc.addBlock(data);
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    });
    it('Validates a valid chain', () => {
        bc2.addBlock('foo'); // new bc2 instance containing the same data as bc

        expect(bc.isValidChain(bc2.chain)).toBe(true); // toBe is jest method
    });

    it(' Invalidates a chain with corrupt genesis block', () => {
        bc2.chain[0].data = 'bad data';
        expect(bc.isValidChain(bc2.chain)).toBe(false); // false means that data is corrupt
    });
    it('Invalidates a corrupt chain', () => {
        bc2.addBlock('foo');
        bc2.chain[1] = 'not foo';

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });
    it('replaces the current chain with the new chain', () => {
        bc2.addBlock('newBlockchaininstance');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);
    });
    it('It does not replaces the chain with one of less than or equals to the length of the current chain', () => {
        bc.addBlock('firstblockchaininstance');
        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
    })
});