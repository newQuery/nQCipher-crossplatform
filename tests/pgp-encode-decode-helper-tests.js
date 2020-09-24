var assert = require('assert');
const fs = require('fs')
const PGPEncodeDecodeHelper = require('../server/pgp-encode-decode-helper')

describe('PGPEncodeDecodeHelper', async function () {

  describe('#generate()', async function () {
    it('it should set error to true if no email provided', async function () {
        const helper = new PGPEncodeDecodeHelper()
        const result = await helper.generate('everythingbutanemail', 'test', 'toto', 1024)
            .then(res => {
                return res
            })
        
        assert.strictEqual(result.error, true)
    });

    it('it should set error to false if success', async function () {
        const helper = new PGPEncodeDecodeHelper()
        const result = await helper.generate('test@test.fr', 'test', 'toto', 1024)
            .then(res => {
                return res
            })
        
        assert.strictEqual(result.error, false)
    });
  });

  describe('#encrypt()', async function () {
    it('it should set error to true, if publickey is not valid', async function () {
        const helper = new PGPEncodeDecodeHelper()
        const result = await helper.encrypt('invalidPublicKey', 'Valid message tho')
        
        assert.strictEqual(result.error, true);
    });

    it('it should set error to false, if publickey is valid', async function () {
        const helper = new PGPEncodeDecodeHelper()
        const armoredKey = fs.readFileSync('./tests/keys-test/public.txt','utf8')
        const result = await helper.encrypt(armoredKey, 'Valid message tho')
        
        assert.strictEqual(result.error, false);
    });
  });

  describe('#decrypt()', async function () {
    it('it should be able to encrypt and then decrypt', async function () {
        const helper = new PGPEncodeDecodeHelper()

        const publicTargetKey = fs.readFileSync('./tests/keys-test/public-1.txt','utf8')
        const privateSenderKey = fs.readFileSync('./tests/keys-test/private-1.txt','utf8')

        const resultMessage = 'This was encrypted before decrypted'
        const encryptedMessage = await helper.encrypt(publicTargetKey, resultMessage)

        const result = await helper.decrypt(privateSenderKey, '123456789', encryptedMessage.data)

        assert.strictEqual(result.data, resultMessage);
    });

    it('it should set error to true with a message if wrong private key', async function () {
        const helper = new PGPEncodeDecodeHelper()

        const publicTargetKey = fs.readFileSync('./tests/keys-test/public.txt','utf8')
        const privateWrongSenderKey = fs.readFileSync('./tests/keys-test/private-1.txt','utf8')

        const resultMessage = 'This was encrypted before decrypted'
        const encryptedMessage = await helper.encrypt(publicTargetKey, resultMessage)

        const result = await helper.decrypt(privateWrongSenderKey, '123456789', encryptedMessage.data)

        assert.strictEqual(result.error, true);
    });

    it('it should set error to true with a message if wrong passphrase', async function () {
        const helper = new PGPEncodeDecodeHelper()

        const publicTargetKey = fs.readFileSync('./tests/keys-test/public-1.txt','utf8')
        const privateSenderKey = fs.readFileSync('./tests/keys-test/private-1.txt','utf8')

        const resultMessage = 'This was encrypted before decrypted'
        const encryptedMessage = await helper.encrypt(publicTargetKey, resultMessage)

        const result = await helper.decrypt(privateSenderKey, '12345678', encryptedMessage.data)

        assert.strictEqual(result.error, true);
    });

    it('it should set error to false with a message if correct passphrase', async function () {
        const helper = new PGPEncodeDecodeHelper()

        const publicTargetKey = fs.readFileSync('./tests/keys-test/public-1.txt','utf8')
        const privateSenderKey = fs.readFileSync('./tests/keys-test/private-1.txt','utf8')

        const resultMessage = 'This was encrypted before decrypted'
        const encryptedMessage = await helper.encrypt(publicTargetKey, resultMessage)

        const result = await helper.decrypt(privateSenderKey, '123456789', encryptedMessage.data)

        assert.strictEqual(result.error, false);
    });

    it('it should set error to true if private key is not correct for this message', async function () {
        const helper = new PGPEncodeDecodeHelper()

        const publicTargetKey = fs.readFileSync('./tests/keys-test/public.txt','utf8')
        const privateSenderKey = fs.readFileSync('./tests/keys-test/private-1.txt','utf8')

        const resultMessage = 'I did not saved the private key, this message will never be decrypted'
        const encryptedMessage = await helper.encrypt(publicTargetKey, resultMessage)

        const result = await helper.decrypt(privateSenderKey, '123456789', encryptedMessage.data)

        assert.strictEqual(result.error, true);
    });
  });
});