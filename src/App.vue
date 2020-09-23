<template>
  <div id="app">
    <el-tabs type="border-card">
      <el-tab-pane label="Home">
        <NqCipher />
      </el-tab-pane>
      <el-tab-pane label="Encoding">
        <StringEncode />
      </el-tab-pane>
      <el-tab-pane label="PGP encode">
        <PGPEncrypt />
      </el-tab-pane>
      <el-tab-pane label="PGP decode">
        <PGPDecrypt />
      </el-tab-pane>
      <el-tab-pane label="PGP keygen">
        <PGPKeygen />
      </el-tab-pane>
      <el-tab-pane label="Settings">
        <div class="switch-button">
          Stick app window
          <el-switch v-model="screenStick">
          </el-switch>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import StringEncode from './components/StringEncode'
import PGPEncrypt from './components/PGPEncrypt'
import PGPDecrypt from './components/PGPDecrypt'
import PGPKeygen from './components/PGPKeygen'
import NqCipher from './components/NqCipher'

export default {
  name: 'App',
  components: {
    StringEncode,
    PGPEncrypt,
    PGPDecrypt,
    PGPKeygen,
    NqCipher
  },
  data: function () {
    return {
      screenStick: false
    }
  },
  watch: {
    screenStick: function (val) {
      var event = new Event('change');
      document.getElementById('stick-mode').selectedIndex = (val) ? 1 : 0;
      document.getElementById('stick-mode').dispatchEvent(event);
    },
  },
  methods: {
    toogleStick()
    {
      this.screenStick = !this.screenStick;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}
.group {
  color: white;
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.block-button {
  margin-top: 15px;
  display: flex;
  justify-content: space-evenly;
}
.result {
  margin-top: 30px;
}
.switch-button {
  color: black;
}
.group {
  padding: 0 10px;
}
</style>
