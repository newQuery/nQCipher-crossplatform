<template>
    <div>
        <div class="group">
          <label>Text</label>
          <el-input
            type="textarea"
            :rows="6"
            placeholder="Insert text to encrypt/decrypt"
            v-model="input">
          </el-input>
        </div>

        <div class="group">
          <label>Password</label>
          <el-input placeholder="Password" v-model="password" show-password></el-input>
        </div>

        <div class="block-button">
          <el-button @click="encryptString()" type="primary">Encrypt</el-button>
          <el-button @click="decryptString()" type="warning">Decrypt</el-button>
        </div>

        <div class="group result" v-if="stringToShow != ''">
          <el-input
            type="textarea"
            :rows="6"
            v-model="stringToShow">
          </el-input>
        </div>
    </div>
</template>

<script>
import  {encrypt, decrypt} from '../lib/encrypt-decrypt'

export default {
  name: 'StringEncode',
  data: function() {
      return {
        input: '',
        password: '',
        stringToShow: '',
      }
  },
  methods: {
    encryptString()
    {
      this.stringToShow = encrypt(this.input, this.password)
    },
    decryptString()
    {
      this.stringToShow = decrypt(this.input, this.password)
    },
  }
}
</script>