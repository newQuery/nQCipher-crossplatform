<template>
    <div>
        <div class="group">
          <label>Public key</label>
          <el-input
            type="textarea"
            :rows="6"
            placeholder="Public key"
            v-model="publicKey">
          </el-input>
        </div>

        <div class="group">
          <label>Message to encrypt</label>
          <el-input
            type="textarea"
            placeholder="Message to encrypt"
            :rows="6"
            v-model="messageToEncrypt">
          </el-input>
        </div>

        <div class="block-button">
          <el-button @click="encryptPgp()" type="primary">Encrypt</el-button>
        </div>

        <transition name="el-zoom-in-center">
          <div class="group" v-if="encryptedMessage != ''">
            <label>Encrypted message</label>
            <el-input
              type="textarea"
              placeholder="Encrypted message"
              :rows="6"
              v-model="encryptedMessage">
            </el-input>
          </div>
        </transition>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PGPEncrypt',
  data: function() {
      return {
        publicKey: '',
        messageToEncrypt: '',
        encryptedMessage: '',
        errors: []
      }
  },
  methods: {
    encryptPgp()
    {
      axios.post(`http://localhost:3000/encrypt`, {
        public: this.publicKey,
        message: this.messageToEncrypt
      })
      .then(response => {
        console.log(response)
        this.encryptedMessage = response.data.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>