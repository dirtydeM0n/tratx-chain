const EC = require('elliptic').ec; // using the ec module present as a curve preset
const ec = new EC('secp256k1'); // standards of efficient cryptography used by bitcoin
// p stands for prime number of 256 bits

class ChainUtil {
    static genKeyPair() { // ec has this function in it for creation of public/private keys
        return ec.genKeyPair();
    }
}
module.exports = ChainUtil;