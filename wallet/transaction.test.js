const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Tracsaction', () => {
    let transaction, wallet, recipient, amount;
    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipient = 'yoloRe5412cPent';
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });
    it('Outputs the `amount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
    })

    it('Outputs the `amount` added to the recipient', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount)
        .toEqual(amount);
    });

    describe('transaction of amount that exceeds the balance', () => {
        beforeEach(() => {
            amount = 50000;
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        });
        it('does not do the transaction', () => {
            expect(transaction).toEqual(undefined);
        });
    });



});