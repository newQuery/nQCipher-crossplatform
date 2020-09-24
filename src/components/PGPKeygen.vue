<template>
    <div id="do">
        <div class="group">
          <label>Name</label>
          <el-input
            placeholder="Name"
            v-model="name">
          </el-input>
        </div>
        <div class="group">
          <label>Email</label>
          <el-input
            type="email"
            placeholder="Email"
            v-model="email">
          </el-input>
        </div>
        <div class="group">
          <label>Passphrase (password)</label>
          <el-input
            placeholder="Passphrase (password)"
            v-model="passphrase" show-password>
          </el-input>
        </div>
        <div class="group">
          <label>Key size</label>
          <el-select v-model="size" placeholder="Key size">
            <el-option
              v-for="item in keysizes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div class="group">
          <el-button type="success" class="generateButton" @click="generatePgp()">Generate keys</el-button>
        </div>


        <transition name="el-zoom-in-center">
          <div class="group" v-if="result.private != ''">
            <label>Private key</label>
            <el-input
              type="textarea"
              placeholder="Private key"
              :rows="6"
              v-model="result.private">
            </el-input>
          </div>
        </transition>

        <transition name="el-zoom-in-center">
          <div class="group" v-if="result.public != ''">
            <label>Public key</label>
            <el-input
              type="textarea"
              placeholder="Public key"
              :rows="6"
              v-model="result.public">
            </el-input>
          </div>
        </transition>
        
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PGPKeygen',
  data: function() {
      return {
        size: 2048,
        keysizes: [
          {
            label: '1024 (good for testing purposes)',
            value: 1024
          },
          {
            label: '2048 (secure)',
            value: 2048
          },
          {
            label: '4096 (more secure)',
            value: 4096
          },
        ],
        email: '',
        name: '',
        passphrase: '',
        result: {
          public: '',
          private: ''
        },
        errors: []
      }
  },
  methods: {
    generatePgp()
    {
      axios.post(`http://localhost:3000/generate`, {
        email: this.email,
        name: this.name,
        passphrase: this.passphrase,
        size: this.size
      })
      .then(response => {
        console.log(response)
        this.result.public = response.data.data.public
        this.result.private = response.data.data.private
      })
      .catch(e => {
        this.errors.push(e)
      })
    }
  }
}
</script>

<style>
#do iframe {
    min-height: 800px;
}
#do .generateButton {
  margin-top: 40px;;
}
</style>