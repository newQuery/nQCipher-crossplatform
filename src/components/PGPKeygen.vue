<template>
    <div id="do">
        <iframe src="https://smartninja-pgp.appspot.com/" width="100%" />
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
        public: this.public,
        passphrase: this.passphrase,
        private: this.private
      })
      .then(response => {
        this.result.public = response.data.result.public
        this.result.private = response.data.result.private
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
</style>