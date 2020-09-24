<template>
    <div>
        <div class="group">
          <label>Private key</label>
          <el-input
            type="textarea"
            :rows="6"
            placeholder="Private key"
            v-model="privateKey">
          </el-input>
        </div>

        <div class="group">
          <label>Passphrase</label>
          <el-input placeholder="Passphrase" v-model="passphrase" show-password></el-input>
        </div>

        <div class="group">
          <label>Message to decrypt</label>
          <el-input
            type="textarea"
            placeholder="Message to decrypt"
            :rows="6"
            v-model="publicKey">
          </el-input>
        </div>

        <div class="block-button">
          <el-button @click="decryptPgp()" type="primary">Decrypt</el-button>
        </div>

        <transition name="el-zoom-in-center">
          <div class="group" v-if="decrypted != ''">
            <label>Decrypted message</label>
            <el-input
              type="textarea"
              placeholder="Decrypted message"
              :rows="6"
              v-model="decrypted">
            </el-input>
          </div>
        </transition>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PGPDecrypt',
  data: function() {
      return {
        privateKey: '',
        passphrase: '',
        publicKey: '',
        decrypted: '',
        errors: []
      }
  },
  methods: {
    decryptPgp()
    {
      axios.post(`http://localhost:3000/decrypt`, {
        public: this.publicKey,
        passphrase: this.passphrase,
        private: this.privateKey
      })
      .then(response => {
        this.decrypted = response.data.decrypted
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>