const express = require('express')
const app = express()
const cors = require('cors')
const openpgp = require('openpgp');
const PGPEncodeDecodeHelper = require('../server/pgp-encode-decode-helper')
const port = 3000

const corsOptions = {
    origin: 'http://localhost:8080'
}

app.use(cors(corsOptions))
app.use(express.json()); 

app.post('/generate', async function (req, res) {
    const cryptoHelper = new PGPEncodeDecodeHelper

    const result = await cryptoHelper.generate(req.body.email, req.body.name, req.body.passphrase, req.body.size)

    res.json(result)
});


app.post('/encrypt', async function (req, res) {
    const cryptoHelper = new PGPEncodeDecodeHelper

    const result = await cryptoHelper.encrypt(req.body.public, req.body.message)
    
    res.json(result)
});

app.post('/decrypt', async function (req, res) {
    const cryptoHelper = new PGPEncodeDecodeHelper

    const result = await cryptoHelper.decrypt(req.body.private, req.body.passphrase, req.body.public)

    res.json(result)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
