const ChainUtil = require('../chain-util');

class Transaction {
    constructor() {
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = []; // array of output objects
    }

    static newTransaction(senderWallet, recipient, amount) {
        const transaction = new this();

        if(amount > senderWallet.balance) {
            console.log(`The ${amount} exceeds the balance.`);
            return;
        }
        // . . . spread operator
        transaction.outputs.push(...[
            { amount: senderWallet.balance - amount, address: senderWallet.publicKey},
            { amount, address: recipient} // es6 allows this if key and value are same for amount
        ])
        Transaction.signTransaction(transaction, senderWallet);
        return transaction;
    }
    static signTransaction(transaction, senderWallet) {
        transaction.input = { // defining the transaction inputs
            timestamp = Date.now(),
            amount = senderWallet.balance,
            address = senderWallet.publicKey,
            signature = senderWallet.sign(ChainUtil.hash(transaction.outputs))
            // output objects are stringified and their hashes are passed to generate a signature using the sign function
        }
    }
}
module.exports = Transaction;
