const { INITIAL_BALANCE } = require('../config');
const ChainUtil = require('../chain-util');

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }
    toString() {
        return `Wallet -
            publickey : ${this.publicKey.toString()}
            balance   : ${this.balance}`;
    }
    sign(datahash) {
        return this.keyPair.sign(datahash); // built-in function in ellipctic datahash will be used to create a signature
    }
}
module.exports = Wallet;