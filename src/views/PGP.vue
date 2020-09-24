<template>
    <div class="hello">
        <el-tabs type="border-card">
            <el-tab-pane label="What is PGP ?">
                <WhatPGP />
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
        </el-tabs>
    </div>
</template>

<script>
import PGPEncrypt from '../components/PGPEncrypt'
import PGPDecrypt from '../components/PGPDecrypt'
import PGPKeygen from '../components/PGPKeygen'
import WhatPGP from '../components/WhatPGP'

export default {
  name: 'PGP',
  components: {
    PGPEncrypt,
    PGPDecrypt,
    PGPKeygen,
    WhatPGP
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
