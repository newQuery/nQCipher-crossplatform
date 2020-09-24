<template>
  <div class="hello">
    <h1>Welcome to nQCipher Community !</h1>
    <p>
        This application aims to help you staying anonymous. Keeping your datas as private as possible.
    </p>
    <p>
      You can listen to Philip Zimmermann song called "PGP" as much as you want !
    </p>
    <div class="music-player">
      <audio
        ref="audio"
        src="https://philzimmermann.com/multimedia/PGP.mp3"
        preload
        controls
        loop
        id="audio"
        muted
      ></audio>
      <p>
        <small>Source: <a href="https://philzimmermann.com/multimedia/PGP.mp3">https://philzimmermann.com/</a></small>
      </p>
    </div>
    <h3>Links:</h3>
    <ul>
      <li>
        <a href="https://hackforums.net/member.php?action=profile&uid=2602549">Hackforums profile</a>
      </li>
      <li>
        <a href="https://github.com/newQuery/">GitHub</a>
      </li>
      <li>
        <a href="https://nqzdo.com/">newQuery Personal</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NqCipher',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
    color: black
}
h3 {
  border-bottom: black 1px solid;
  margin-top: 50px;
}
li {
  padding: 2px;
  list-style: none;
}
</style>
