const uuidV1 = require('uuid/v1');
const EC = require('elliptic').ec; // using the ec module present as a curve preset
const SHA256 = require('crypto-js/sha256');
const ec = new EC('secp256k1'); // standards of efficient cryptography used by bitcoin
// p stands for prime number of 256 bits
// using computational power to get the elliptic curve is expensive
class ChainUtil {
    static genKeyPair() { // ec has this function in it for creation of public/private keys
        return ec.genKeyPair();
    }
    static id() {
        return uuidV1(); // universal unique identifier based on timestamps
    }
    static hash(data) {
        return SHA256(JSON.stringify(data)).toString(); // stringifies a data object and return a hash via a toString function
    }
}
module.exports = ChainUtil;