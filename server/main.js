const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000
const openpgp = require('openpgp');
var corsOptions = {
    origin: 'http://localhost:8080'
}

app.use(cors(corsOptions))
app.use(express.json()); 

app.post('/generate', async function (req, res) {
    
    let { privateKeyArmored, publicKeyArmored } = await openpgp.generateKey({
        userIds: [{ name: req.body.name, email: req.body.email }],
        passphrase: req.body.email,
        numBits: req.body.size
    });

    const result = { private: privateKeyArmored, public: publicKeyArmored };

    res.json({
        'result': result
    })
});


app.post('/encrypt', async function (req, res) {
    
    let encrypted = await openpgp.encrypt({
        message: openpgp.message.fromText(req.body.message),
        publicKeys: (await openpgp.key.readArmored(req.body.public)).keys
    });

    res.json({
        'encrypted': encrypted.data
    })
});

app.post('/decrypt', async function (req, res) {
    const encryptDecryptFunction = async() => {

        const privKeyObj = (await openpgp.key.readArmored(req.body.private)).keys[0]
        await privKeyObj.decrypt(req.body.passphrase)
        
        const options = {
            message: await openpgp.message.readArmored(req.body.public),    // parse armored message
            privateKeys: [privKeyObj]                                 // for decryption
        }
                
        const result = openpgp.decrypt(options).then(plaintext => {
            return plaintext.data
        }).catch(err => {
            console.log(err);
        })


        return result
    }

    const decrypted = await encryptDecryptFunction()

    res.json({
        'decrypted': decrypted
    })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
