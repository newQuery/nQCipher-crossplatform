const openpgp = require('openpgp');

class PGPEncodeDecodeHelper {
    /**
     * Encrypt plaintext to PGP.
     * @param {string} armoredPublicKey 
     * @param {string} message 
     */
    async encrypt(armoredPublicKey, message) {
        return await openpgp.encrypt({
            message: openpgp.message.fromText(message),
            publicKeys: (await openpgp.key.readArmored(armoredPublicKey)).keys
        }).then(result => { 
            return { error: false, data: result.data} 
        }).catch(e => {
            return { error: true, message: e }
        })
    }

    /**
     * Generate a pair of PGP key
     * @param {string} email 
     * @param {string} name 
     * @param {string} passphrase 
     * @param {int} size 
     */
    async generate(email, name, passphrase, size) {
        return await openpgp.generateKey({
            userIds: [{ name: name, email: email }],
            numBits: size,
            passphrase: passphrase
        }).then(({ privateKeyArmored, publicKeyArmored }) => {
            return { 
                error: false, 
                data: {
                    private: privateKeyArmored, public: publicKeyArmored
                }
            };
        }).catch(error => {
            return { 
                error: true, 
                message: error
            };
        })
    }

    /**
     * Decrypt PGP message into plaintext
     * @param {string} privateKey 
     * @param {string} passphrase 
     * @param {string} cryptedMessage 
     */
    async decrypt(privateKey, passphrase, cryptedMessage) {
        const privKeyObj = (await openpgp.key.readArmored(privateKey)).keys[0]
        const decryptedObj = await privKeyObj.decrypt(passphrase)
        .then(result => {
            return result
        }).catch(e => {
            return e
        })

        if(!decryptedObj) {
            return decryptedObj
        }
        
        const options = {
            message: await openpgp.message.readArmored(cryptedMessage),
            privateKeys: [privKeyObj]
        }

                
        return openpgp.decrypt(options)
            .then(plaintext => {
                return {data: plaintext.data, error: false}
            }).catch(err => {
                return {error: true, message: err}
            })
    }
}

module.exports = PGPEncodeDecodeHelper;